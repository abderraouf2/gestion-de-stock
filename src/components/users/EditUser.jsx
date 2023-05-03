import React, { useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { Edituser } from "../../dbConnection/usersManagement";

export default function EditUser(props) {
  const user = props.user;
  const [Edit, setEdit] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [role, setRole] = useState(user.role);
  const [phone, setPhone] = useState(user.phone);

  const edituser = (id) => {
    if (username && password && phone && role ) {
      Edituser(`UPDATE users
        SET username = "${username}", password = "${password}", phone = ${phone}, role = "${role}"
        WHERE id = ${id}`);
      setUsername("");
      setPassword("");
      setPhone(0);
      setRole("");
    } else {
      alert("enter valid informations");
    }
    setEdit(false);
  };

  return (
    <div>
      <BiEdit
        color="blue"
        onClick={() => {
          setEdit(true);
          console.log(user.username);
        }}
        style={{ cursor: "pointer" }}
      />
      <Modal
        show={Edit}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit user
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Nom"
            classusername="mb-3"
          >
            <Form.Control
              type="text"
              defaultValue={user.username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="password role"
            classusername="mb-3"
          >
            <Form.Control
              type="password"
              defaultValue={user.password}
              placeholder="username@example.com"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="numerso"
            classusername="mb-3"
          >
            <Form.Control
              type="number"
              defaultValue={user.phone}
              placeholder="numero"
              onChange={(e) => setPhone(e.target.value)}
            />
          </FloatingLabel>
          <Form.Select
            size="lg"
            defaultValue={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ marginBottom: "2vh", width: "58%" }}
            className="inputs"
          >
            <option value="" disabled hidden>
              -- select mode --
            </option>
            <option value="owner">
              owner
            </option>
            <option value="admin">
              admin
            </option>
            <option value="user">
              user
            </option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => edituser(user.id)} variant="success">
            save
          </Button>
          <Button onClick={() => setEdit(false)} variant="danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
