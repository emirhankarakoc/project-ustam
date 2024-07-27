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

export default function Provinces() {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await http.get(`${APIURL}/users/provinces`);
        setProvinces(response.data);
        setLoading(false);
      } catch (error) {
        setError(httpError(error));
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const handleDelete = (provinceId) => {
    setSelectedProvinceId(provinceId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (selectedProvinceId) {
      try {
        const token = localStorage.getItem("ustamjwttoken");

        // Make DELETE request
        await http.delete(`${APIURL}/admin/provinces/${selectedProvinceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Refresh the list
        const response = await http.get(`${APIURL}/users/provinces`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProvinces(response.data);
        setShowModal(false);
      } catch (error) {
        setError(httpError(error));
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProvinceId(null);
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
      <h1 className="mb-4">Provinces</h1>
      <Row>
        {provinces.map((province) => (
          <Col md={4} lg={3} key={province.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{province.name}</Card.Title>
                <Card.Text>Usta Sayisi: {province.mechanicCounter}</Card.Text>
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => handleDelete(province.id)}
                >
                  Sil
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Silme Onayı</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bu provinsi silmek istediğinize emin misiniz?</Modal.Body>
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
