import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const footerStyle = {
  backgroundColor: "purple",
  borderTop: "1px solid white", // 1px kalınlığında beyaz border
};

export default function Footer() {
  return (
    <div style={footerStyle} className="text-white">
      <div className="container py-3">
        <div className="row">
          <div className="col">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </div>
          <div className="col">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </div>
          <div className="col">
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
            <p>Lorem ipsum</p>
          </div>
        </div>
      </div>
    </div>
  );
}
