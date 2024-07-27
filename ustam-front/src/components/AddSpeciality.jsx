import React, { useState } from "react";
import { APIURL, http, httpError } from "../http";

export default function AddSpeciality() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true); // Show spinner
    setResponseMessage(""); // Clear previous response message

    try {
      const token = localStorage.getItem("ustamjwttoken");
      const response = await http.post(
        `${APIURL}/admin/skill`,
        new URLSearchParams({ name: inputValue }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseMessage(`Skill added successfully: ${response.data.name}`);
    } catch (error) {
      setResponseMessage(`Error: ${httpError(error)}`);
    } finally {
      setLoading(false); // Hide spinner
    }

    console.log("Input Value:", inputValue);
  };

  return (
    <div className="container mt-3">
      <h2>Yeni Beceri Ekle</h2>
      <div className="mb-3">
        <label htmlFor="specialityInput" className="form-label">
          Beceri Adı
        </label>
        <input
          type="text"
          className="form-control"
          id="specialityInput"
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          "Ekle"
        )}
      </button>
      {responseMessage && (
        <div className="mt-3">
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
}
