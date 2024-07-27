import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { APIURL, http, httpError } from "../http";

export default function InspectCard({ card, user }) {
  const [message, setMessage] = useState("");
  const handleApproveCard = async () => {
    try {
      const response = await http.post(`${APIURL}/admin/accept/${card.id}`);
      setMessage("Successfully approved.");
    } catch (error) {
      console.log(httpError(error));
    }
  };
  const handleRejectCard = async () => {
    try {
      const response = await http.post(`${APIURL}/admin/reject/${card.id}`);
      setMessage("Successfully rejected.");
    } catch (error) {
      console.log(httpError(error));
    }
  };

  return (
    <div className="card-container">
      <Container className="d-flex flex-column gap-2">
        <Row>Inspecting ID Card</Row>
        <Row>
          <img style={{ height: "200px" }} src={card.imagePath} />
        </Row>
        <Row>
          <div className="button-container">
            <button className="approve-button" onClick={handleApproveCard}>
              Approve
            </button>
            <button className="reject-button" onClick={handleRejectCard}>
              Reject
            </button>
          </div>
        </Row>
        {message && <Row>{message}</Row>}
      </Container>
    </div>
  );
}
