import React, { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";

export default function InspectUser({ user }) {
  useEffect(() => {}, []);

  return (
    <Container>
      <Row className="mb-2">
        <Col>ID: {user.id}</Col>
      </Row>
      <Row className="mb-2">
        <Col>Email: {user.email}</Col>
      </Row>
      <Row className="mb-2">
        <Col>
          {user.status === "NOTHING"
            ? "Adamımız id card resmini henüz yüklememiş."
            : ""}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          {user.extraInfo_M === "Fill here."
            ? "Adamımız henüz kendisine bir description yazmamış."
            : user.extraInfo_M}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>{user.point_M === 0 ? "Puanı 0" : `Puan: ${user.point_M}`}</Col>
      </Row>
      <Row className="mb-2">
        <Col>
          {user.skills_M.length === 0 ? (
            "Skill sayısı 0."
          ) : (
            <div>
              <strong>Skills:</strong>
              <ul>
                {user.skills_M.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="primary">Inspect last appointments</Button>
        </Col>
        <Col>
          <Button variant="danger">BAN BAN BAN !</Button>
        </Col>
      </Row>
    </Container>
  );
}
