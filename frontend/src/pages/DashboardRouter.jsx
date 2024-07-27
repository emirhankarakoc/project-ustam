import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AdminDashboard from "../components/AdminDashboard";

export default function DashboardRouter() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const handleRoleCheck = () => {
      let userrole = localStorage.getItem("ustamrole");

      if (!userrole) {
        window.location.href = "/";
      } else if (userrole === "ROLE_ADMIN") {
        setRole(userrole);
      } else if (userrole === "ROLE_MECHANIC") {
        setRole(userrole);
      } else {
      }
    };
    console.log(role);

    handleRoleCheck();
  }, []);

  return (
    <>
      {role === "ROLE_ADMIN" && <AdminDashboard />}
      {role === "ROLE_MECHANIC" && (
        <Container>
          <Row>Mechanic Dashboard</Row>
          <Row>
            <Col>mechanic dashboard.</Col>
          </Row>
        </Container>
      )}
    </>
  );
}
