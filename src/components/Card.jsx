import React from "react";
import { Link } from "react-router-dom";
import "./styleComponent.css"
export default function Card(props) {
  const { image, link, title, setEventKey } = props;

  return (
    <Link
      className="card"
      to={link}
      onClick={() => setEventKey(link)}
      style={{
        height: "30vh",
        width: "20vw",
        color: "#191D32",
        textDecoration: "none",
        margin: "20px",
      }}
    >
      <img src={image} alt="" width="100%" height="80%" />
      <h1> {title} </h1>
    </Link>
  );
}
