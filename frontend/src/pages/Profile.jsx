// Profile.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MECHANIC_ICON, USER_ICON, http } from "../http";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        let endpoint = "";
        if (id) {
          // Eğer id varsa /profile/:id endpointine istek yap
          endpoint = `/users/profile/${id}`;
        } else {
          // Eğer id yoksa /profile endpointine istek yap
          endpoint = `/accounts/getMe`;
        }
        const response = await http.get(endpoint);
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Kullanıcı bilgileri getirilirken hata oluştu:", error);
      }
    }

    fetchUserData();
  }, [id]);

  // Fonksiyon: Kullanıcı rolüne göre ikon gösterimi
  const renderRoleIcon = () => {
    if (!userData || !userData.role) return null;

    if (userData.role === "ROLE_MECHANIC") {
      return (
        <img
          src={MECHANIC_ICON}
          alt="Mechanic Icon"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      );
    } else if (userData.role === "ROLE_USER") {
      return (
        <img
          src={USER_ICON}
          alt="User Icon"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      );
    }

    return null;
  };

  return (
    <Container>
      <Row>
        <Col>
          <div
            style={{
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h2>Profil Səhifəsi</h2>
              {userData ? (
                <div>
                  {renderRoleIcon()}
                  <p>İstifadəçi ID: {userData.id}</p>
                  <p>Email: {userData.email}</p>
                  {/* Diğer istifadəçi məlumatlarını buraya əlavə edə bilərsiniz */}
                </div>
              ) : (
                <p>Yüklənir...</p>
              )}
            </div>
            <Button href="/dashboard">Dashboard</Button>
          </div>
        </Col>
        <Col>
          <div>yorumlar</div>
        </Col>
      </Row>
    </Container>
  );
}
