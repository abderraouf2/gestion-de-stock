import React, { useEffect, useState } from "react";
import BgImage from "./loginBg.png";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import "./login.style.css";

import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { setLogin, getUsers } from "../../dbConnection/usersManagement";
export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([])
  const history = useHistory()
  const login = () => {
    const exists = users.filter((user)=> user.username === username && user.password === password)

    if (exists.length > 0) {
      setLogin();
      props.onChange();
      history.push('/')
  }
  };

  useEffect(()=> {
    getUsers(setUsers)
  }, [])
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
        <h1
          style={{
            marginBottom: "10vh",
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          Login
        </h1>
        <FloatingLabel
          controlId="floatingInput"
          label="username"
          className="mb-3 input"
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
        <Button className="loginBtn" onClick={login}>
          Login
        </Button>
      </div>
    </div>
  );
}
