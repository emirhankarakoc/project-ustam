import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const navbarStyle = {
  backgroundColor: "purple",
  borderBottom: "1px solid white", // 1px kalınlığında siyah border
};

export default function NavigationBar() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("ustamjwttoken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ustamjwttoken");

    setTimeout(() => {
      window.location.href = "/";
      setToken("");
    }, 500);
  };

  return (
    <Navbar expand="lg" style={navbarStyle}>
      <Container>
        <Navbar.Brand href="/">Usta Tap</Navbar.Brand>
        <Nav className="ml-auto">
          {token ? (
            <>
              <Button variant="outline-light" href="/profile" className="mr-2">
                Profil
              </Button>
              <Button variant="outline-light" onClick={handleLogout}>
                Çıxış et
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-light" href="/login" className="mr-2">
                Giriş et
              </Button>
              <Button variant="outline-light" href="/register">
                Qeydiyyat
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
