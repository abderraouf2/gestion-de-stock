import React, { useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { EditProvider } from "../../dbConnection/providersManagement";

export default function Editprovider(props) {
  const provider = props.provider;
  const [Edit, setEdit] = useState(false);
  const [name, setName] = useState(provider.name);
  const [email, setEmail] = useState(provider.email);
  const [address, setAddress] = useState(provider.address);
  const [phone, setPhone] = useState(provider.phone);
  const [nif, setNif] = useState(provider.nif);
  const [nis, setNis] = useState(provider.nis);

  const editProvider = (id) => {
    if (name && email && nif && phone && nis) {
      EditProvider(`UPDATE providers
        SET name = "${name}", nif = "${nif}", nis = "${nis}", email = "${email}", phone = ${phone}, address = "${address}"
        WHERE id = ${id}`);
      setName("");
      setEmail("");
      setPhone(0);
      setAddress("");
      setNif(0);
      setNis(0);
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
          console.log(provider.name);
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
            Edit supplier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="Nom" className="mb-3">
            <Form.Control
              type="text"
              defaultValue={provider.name}
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="NIF" className="mb-3">
            <Form.Control
              type="text"
              defaultValue={provider.nif}
              placeholder="NIF"
              onChange={(e) => setNif(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="NIS" className="mb-3">
            <Form.Control
              type="text"
              defaultValue={provider.nis}
              placeholder="NIS"
              onChange={(e) => setNis(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              defaultValue={provider.email}
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
              defaultValue={provider.phone}
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
              defaultValue={provider.address}
              placeholder="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => editProvider(provider.id)} variant="success">
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
