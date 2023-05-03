import React, { useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import { AddNewUser } from "../../dbConnection/usersManagement";

export default function AddUser(props) {
  const [modalShow, setModalShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState(0);

  const addUser = () => {
    if (username && password && phone && role ) {
      props.onChange();
      AddNewUser(`INSERT INTO users (username, password, phone, role)
                         VALUES ("${username}", "${password}", ${phone}, "${role}"  );`);
      setModalShow(false);
    } else {
      alert("enter valid informations");
    }
  };

  return (
    <div>
      <Button
        onClick={() => setModalShow(true)}
        style={{
          cursor: "pointer",
          width: "11vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        variant="success"
      >
        Add new User
        <BsPlusCircleFill onClick={() => setModalShow(true)} size={30} />
      </Button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            User's Informations
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
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="password"
            classusername="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="username@example.com"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="numero"
            classusername="mb-3"
          >
            <Form.Control
              type="number"
              placeholder="phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </FloatingLabel>
          <Form.Select
            size="lg"
            defaultValue=""
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
              empoyee
            </option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addUser()} variant="success">
            Add User
          </Button>
          <Button onClick={() => setModalShow(false)} variant="danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
