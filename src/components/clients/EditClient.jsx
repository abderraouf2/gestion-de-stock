import React, { useState } from "react";
import { Button, Table, Modal, Form, FloatingLabel } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { Editclient } from "../../dbConnection/clientsManagement";

export default function EditClient(props) {
  const client = props.client;
  const [Edit, setEdit] = useState(false);
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [address, setAddress] = useState(client.address);
  const [phone, setPhone] = useState(client.phone);


  const editClient = (id) => {
    if (name && email && phone) {
      Editclient(`UPDATE clients SET name = "${name}", email = "${email}", phone = ${phone}, address = "${address}"
                    WHERE id = ${id}`);
      setName("");
      setEmail("");
      setPhone(0);
      setAddress("");
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
          console.log(client.name);
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
            Edit Client
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="Nom" className="mb-3">
            <Form.Control
              type="text"
              defaultValue={client.name}
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              defaultValue={client.email}
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="numero"
            className="mb-3"
          >
            <Form.Control
              type="number"
              defaultValue={client.phone}
              placeholder="numero"
              onChange={(e) => setPhone(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="address"
            className="mb-3"
          >
            <Form.Control
              type="text"
              defaultValue={client.address}
              placeholder="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => editClient(client.id)} variant="success">
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
