import React, { useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import { Button, Modal, ListGroup } from "react-bootstrap";

export default function ProductDetails({ product }) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <BsPlusSquare
        onClick={() => setModalShow(true)}
        style={{ cursor: "pointer" }}
      />

      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            product's details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item style={{ height: "8vh" }}>
              Nom: <br /> {product.name}
            </ListGroup.Item>
            <ListGroup.Item style={{ height: "8vh" }}>
              reference: <br /> {product.reference}
            </ListGroup.Item>
            <ListGroup.Item style={{ height: "8vh" }}>
              Description: <br /> {product.description}{" "}
            </ListGroup.Item>
            <ListGroup.Item style={{ height: "8vh" }}>
              purchase price:
              <br /> {product.price}{" "} DZD
            </ListGroup.Item>
            <ListGroup.Item style={{ height: "8vh" }}>
              sale price:
              <br /> {product.sellPrice}{" "}DZD
            </ListGroup.Item>
            <ListGroup.Item style={{ height: "8vh" }}>
              Quantity:
              <br /> {product.quantity}{" "}
            </ListGroup.Item>
            <ListGroup.Item style={{ height: "8vh" }}>
              TAX:
              <br /> {product.tax}{" "}%
            </ListGroup.Item>
            
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
