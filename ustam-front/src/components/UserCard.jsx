import React from "react";
import { MECHANIC_ICON, USER_ICON } from "../http";

export default function UserCard({ user }) {
  const handleInspectMechanic = () => {
    window.location.href = "/inspect/" + user.id;
  };
  const handleInspectUser = () => {
    window.location.href = "/inspect/" + user.id;
  };
  return (
    <div className="container p-2 my-1 border border-2 rounded ">
      <div className="row">
        <div className="col-1">
          {user.role === "ROLE_USER" && (
            <img src={USER_ICON} style={{ width: "50px", height: "50px" }} />
          )}
          {user.role === "ROLE_MECHANIC" && (
            <img
              src={MECHANIC_ICON}
              style={{ width: "50px", height: "50px" }}
            />
          )}
          {user.role === "ROLE_ADMIN" && (
            <img src={USER_ICON} style={{ width: "50px", height: "50px" }} />
          )}
        </div>
        <div className="col-4 d-flex flex-column">
          <a className="decoration-none" href={`/profile/${user.id}`}>
            {" "}
            {user.email}
          </a>
          {user.phoneNumber}
        </div>
        {user.status === "NOTHING" && (
          <div className="col-3 text-light d-flex justify-content-center align-items-center">
            <div className="mx-1 p-1 bg-danger rounded d-flex justify-content-center align-items-center">
              NOTHING
            </div>
            <button
              onClick={handleInspectUser}
              className="mx-1 p-1 bg-success border-2 text-light rounded d-flex justify-content-center align-items-center"
            >
              Inspect
            </button>
          </div>
        )}
        {user.status === "WAITING" && (
          <div className="col-3 text-light d-flex justify-content-center align-items-center">
            <div className="mx-1 p-1 bg-warning rounded d-flex justify-content-center align-items-center">
              WAITING
            </div>
            <button
              onClick={handleInspectMechanic}
              className="mx-1 p-1 bg-success border-2 text-light rounded d-flex justify-content-center align-items-center"
            >
              Inspect
            </button>
          </div>
        )}
        {user.status === "VERIFICATED" && (
          <div className="col-3 text-light d-flex justify-content-center align-items-center">
            <div className="mx-1 p-1 bg-primary rounded d-flex justify-content-center align-items-center">
              VERIFICATED
            </div>
            <button
              onClick={handleInspectMechanic}
              className="mx-1 p-1 bg-success border-2 text-light rounded d-flex justify-content-center align-items-center"
            >
              Inspect
            </button>
          </div>
        )}
        {user.status === "REJECTED" && (
          <div className="col-3 text-light d-flex justify-content-center align-items-center">
            <div className="mx-1 p-1 bg-danger rounded d-flex justify-content-center align-items-center">
              REJECTED
            </div>
            <button
              onClick={handleInspectMechanic}
              className="mx-1 p-1 bg-success border-2 text-light rounded d-flex justify-content-center align-items-center"
            >
              Inspect
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
