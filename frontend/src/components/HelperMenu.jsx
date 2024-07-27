import React from "react";
import { Button, Container, Row } from "react-bootstrap";

export default function HelperMenu({ componentgosterici }) {
  const handleShowUsers = () => {
    componentgosterici("1");
  };
  const handleShowMechanics = () => {
    componentgosterici("2");
  };
  const handleShowSpecialityMenu = () => {
    componentgosterici("3");
  };
  const handleShowAddSpeciality = () => {
    componentgosterici("4");
  };
  const handleShowProvinces = () => {
    componentgosterici("5");
  };
  const handleShowAddProvince = () => {
    componentgosterici("6");
  };

  return (
    <div>
      <Container>
        <Row className="my-1">
          <Button
            className="mr-2"
            style={{ backgroundColor: "purple", borderColor: "purple" }}
            onClick={handleShowUsers}
          >
            Users
          </Button>
        </Row>
        <Row className="my-1">
          <Button
            className="mr-2"
            style={{ backgroundColor: "purple", borderColor: "purple" }}
            onClick={handleShowMechanics}
          >
            Mechanics
          </Button>
        </Row>
        <Row className="my-1">
          <Button
            className="mr-2"
            style={{ backgroundColor: "purple", borderColor: "purple" }}
            onClick={handleShowSpecialityMenu}
          >
            Specialities
          </Button>
        </Row>
        <Row className="my-1">
          <Button
            className="mr-2"
            style={{ backgroundColor: "purple", borderColor: "purple" }}
            onClick={handleShowAddSpeciality}
          >
            Add Speciality
          </Button>
        </Row>
        <Row className="my-1">
          <Button
            className="mr-2"
            style={{ backgroundColor: "purple", borderColor: "purple" }}
            onClick={handleShowProvinces}
          >
            Provinces
          </Button>
        </Row>
        <Row className="my-1">
          <Button
            className="mr-2"
            style={{ backgroundColor: "purple", borderColor: "purple" }}
            onClick={handleShowAddProvince}
          >
            Add Province
          </Button>
        </Row>
      </Container>
    </div>
  );
}
