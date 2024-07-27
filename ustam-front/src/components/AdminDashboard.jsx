import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import HelperMenu from "./HelperMenu";
import Users from "./Users";
import Mechanics from "./Mechanics";
import Specialities from "./Specialities";
import AddSpeciality from "./AddSpeciality";
import Provinces from "./Provinces";
import AddProvince from "./AddProvince";

export default function AdminDashboard() {
  const [showing, setShowing] = useState();

  return (
    <Container>
      <Row>Admin Dashboard</Row>
      <Row>
        <Col xl={4}>
          <HelperMenu componentgosterici={setShowing} />
        </Col>
        {!showing && <Col>Click any button for start.</Col>}
        <Col>
          {showing === "1" && <Users />}
          {showing === "2" && <Mechanics />}
          {showing === "3" && <Specialities />}
          {showing === "4" && <AddSpeciality />}
          {showing === "5" && <Provinces />}
          {showing === "6" && <AddProvince />}
        </Col>
      </Row>
    </Container>
  );
}
