import React, { useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import { addNewCategory } from "../../dbConnection/productsManagement";
export default function AddNewProduct(props) {
  const [modalShow, setModalShow] = useState(false);
  const [category, setCategory] = useState("");
  const addCategory = () => {
    addNewCategory(category)
  };
  return (
    <div>
      <Button
        onClick={() => setModalShow(true)}
        style={{
          cursor: "pointer",
          width: "10vw",
          height: "6vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        variant="success"
      >
        new category
        <BsPlusCircleFill size={30} />
      </Button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="category"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </FloatingLabel>
         
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addCategory} variant="success">
            Add category
          </Button>
          <Button onClick={() => setModalShow(false)} variant="danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
