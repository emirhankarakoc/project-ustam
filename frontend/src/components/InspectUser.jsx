import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";

export default function InspectUser({ user }) {
    // Ensure `user` and its properties are defined
    if (!user) {
        return <Container><p>User data is not available</p></Container>;
    }

    return (
        <Container>
            <Row className="mb-2">
                <Col>ID: {user.id || "N/A"}</Col>
            </Row>
            <Row className="mb-2">
                <Col>Email: {user.email || "N/A"}</Col>
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
                        : user.extraInfo_M || "N/A"}
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>{user.point_M === 0 ? "Puanı 0" : `Puan: ${user.point_M}`}</Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    {user.skills_M && user.skills_M.length === 0
                        ? "Skill sayısı 0."
                        : user.skills_M && (
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
