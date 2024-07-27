import React, { useEffect, useState } from "react";
import { APIURL, http, httpError } from "../http";
import { Spinner } from "react-bootstrap";
import UserCard from "./UserCard";

export default function Mechanics() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const jwttoken = localStorage.getItem("ustamjwttoken");

    const handleGetUsers = async () => {
      try {
        const response = await http.get(`${APIURL}/admin/only-mechanics`);
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.log(httpError(error));
      }
    };
    handleGetUsers();
  }, []);
  {
    !users && (
      <div className="d-flex justify-content-center align-content-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div>Mechanic List</div>
      {users.length === 0 ? (
        <div className="text-center">0 mechanics found.</div>
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <UserCard user={user} />
          </div>
        ))
      )}
    </div>
  );
}
