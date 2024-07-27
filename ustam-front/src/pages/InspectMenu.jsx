import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import InspectCard from "../components/InspectCard";
import { APIURL, http, httpError } from "../http";
import InspectUser from "../components/InspectUser";

export default function InspectMenu() {
  const [card, setCard] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const handleIsAdmin = () => {
      const userRole = localStorage.getItem("ustamrole");
      if (!userRole || userRole !== "ROLE_ADMIN") {
        window.location.href = "/";
      }
    };

    const handleInspectUser = async () => {
      try {
        const response = await http.get(`${APIURL}/admin/inspect/${id}`);
        const data = response.data;
        console.log(data);

        if (Array.isArray(data)) {
          if (data.length > 1) {
            setUser(data[0]);
            setCard(data[1]);
          } else if (data.length === 1) {
            setUser(data[0]);
            setCard(null);
          } else {
            setUser(null);
            setCard(null);
          }
        } else {
          console.error("Beklenen veri formatı alındı: ", data);
          setUser(null);
          setCard(null);
        }
      } catch (error) {
        console.log(httpError(error));
        setUser(null);
        setCard(null);
      }
    };

    handleIsAdmin();
    handleInspectUser();
  }, [id]);

  return (
      <div className="container">
        {user && (
            <div>
              <p>Inspect User</p>
              <Row className="border border-2 border-primary p-2 my-2 rounded">
                <InspectUser user={user} />
              </Row>
            </div>
        )}
        {card && (
            <div>
              <p>Inspect Card</p>
              <Row className="border border-2 border-primary p-2 my-2 rounded">
                <InspectCard card={card} user={user} />
              </Row>
            </div>
        )}
      </div>
  );
}
