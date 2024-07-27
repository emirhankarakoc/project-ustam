import React, { useEffect, useState } from "react";
import { APIURL, http, httpError } from "../http";
import { useSearchParams } from "react-router-dom";
import UserCard from "./UserCard";
import { Spinner } from "react-bootstrap";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const jwttoken = localStorage.getItem("ustamjwttoken");

    const handleGetUsers = async () => {
      try {
        const response = await http.get(`${APIURL}/admin/only-users`);
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
      <div>User List</div>

      {users.length === 0 ? (
        <div className="text-center">0 users found.</div>
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
