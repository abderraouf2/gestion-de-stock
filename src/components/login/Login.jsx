import React, { useState } from "react";
import BgImage from "./loginBg.png";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import './login.css';
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        height: "100vh",
        width: "1920px",
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        border: "2px solid black",
      }}
    >
      <div style={{ width: "30vw", height: "50vh", margin: "15vh 10vw" }}>
        <h1 style={{ marginBottom:'10vh', textAlign: "center" }}>
          Login
        </h1>
        <FloatingLabel
          controlId="floatingInput"
          label="username"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FloatingLabel>
        <Button className="button">Login</Button>
        <button className="button">fdfg</button>
      </div>
    </div>
  );
}
