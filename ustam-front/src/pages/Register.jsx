import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { APIURL, http } from "../http";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [apiResponse, setApiResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post(`${APIURL}/accounts/register`, {
        email,
        password,
        role,
      });
      console.log(response.data);
      setApiResponse(`Qeydiyyat uğurla başa çatdı.`);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Qeydiyyat</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Check
            type="radio"
            label="Müştəri"
            name="role"
            value="USER"
            checked={role === "USER"}
            onChange={(e) => setRole("USER")}
          />
          <Form.Check
            type="radio"
            label="Usta"
            name="role"
            value="MECHANIC"
            checked={role === "MECHANIC"}
            onChange={(e) => setRole("MECHANIC")}
          />
        </Form.Group>

        <Button
          className="my-3"
          style={{
            backgroundColor: "#8a2be2", // Mor renk
            color: "white", // Beyaz metin
            border: "none", // Kenarlık yok
          }}
          onClick={handleSubmit}
          type="submit"
        >
          Qeydiyyatdan keç
        </Button>
      </Form>

      {apiResponse && (
        <div>
          <p>{apiResponse}</p>
        </div>
      )}
    </Container>
  );
}
