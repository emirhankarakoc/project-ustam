import React from "react";

const imageStyle = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: "400px", // Resmin genişliği
  height: "400px", // Resmin yüksekliği
};

const h1Style = {
  textAlign: "center",
  marginBottom: "0px",
  color: "white",
  fontSize: "72px", // H1 başlığı font boyutu
};

export default function Notfound() {
  return (
    <div style={{ backgroundColor: "purple" }}>
      <h1 style={h1Style}>404</h1>
      <p style={{ textAlign: "center", color: "white" }}>
        Çox üzr istəyirik, burada heç nə yoxdur.
      </p>
      <img
        src="http://res.cloudinary.com/dhoj5fmxr/image/upload/v1720874524/ymwq36vp86k7f5leyurg.webp"
        alt="Not Found"
        style={imageStyle}
      />
    </div>
  );
}
