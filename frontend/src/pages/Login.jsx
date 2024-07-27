import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { APIURL, http } from "../http";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post(`${APIURL}/accounts/login`, {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("ustamjwttoken", response.data.accessToken);
      localStorage.setItem("ustamrole", response.data.userRole);
      console.log(localStorage.getItem("ustamrole"));

      setApiResponse(`Giriş uğurla başa çatdı.`);
      setTimeout(() => {
        window.location.href = "/dashboard"; // Giriş uğurla başa çatdıqda yönləndiriləcək səhifə
      }, 2000);
    } catch (error) {
      console.error(error);
      setApiResponse(`Giriş uğursuz oldu: ${error.message}`);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Giriş Et</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email daxil edin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Şifrə</Form.Label>
          <Form.Control
            type="password"
            placeholder="Şifrə"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
          Giriş Et
        </Button>
      </Form>

      {apiResponse && (
        <div className="mt-3">
          <p>{apiResponse}</p>
        </div>
      )}
    </Container>
  );
}
