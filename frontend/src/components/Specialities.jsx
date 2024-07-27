import React, { useEffect, useState } from "react";
import { APIURL, http, httpError } from "../http";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
  Modal,
} from "react-bootstrap";

export default function Specialities() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  useEffect(() => {
    const handleGetAllSkills = async () => {
      try {
        const response = await http.get(`${APIURL}/users/skills`);
        setSkills(response.data);
        setLoading(false);
      } catch (error) {
        setError(httpError(error));
        setLoading(false);
      }
    };

    handleGetAllSkills();
  }, []);

  const handleDelete = (skillId) => {
    setSelectedSkillId(skillId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedSkillId) {
      try {
        const token = localStorage.getItem("ustamjwttoken");

        await http.delete(`${APIURL}/admin/skills/${selectedSkillId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSkills(skills.filter((skill) => skill.id !== selectedSkillId));
      } catch (error) {
        setError(httpError(error));
      }
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSkillId(null);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">Bir hata oluştu: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Beceriler</h1>
      <Row>
        {skills.map((skill) => (
          <Col md={4} lg={3} key={skill.id} className="mb-3">
            <Card.Header className="position-relative">
              <Card.Body>
                <Card.Header>{skill.name}</Card.Header>
                <Card.Footer>Usta Sayisi: {skill.mechanicCounter}</Card.Footer>
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => handleDelete(skill.id)}
                >
                  Sil
                </Button>
              </Card.Body>
            </Card.Header>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Silme Onayı</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bu beceriyi silmek istediğinize emin misiniz?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmDelete}>
            Sil
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            İptal
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
