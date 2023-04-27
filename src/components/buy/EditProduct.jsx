import React, { useState, useEffect } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";

export default function EditProduct(props) {
  const { product, productsToBuy } = props;
  const [Edit, setEdit] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setdescription] = useState(product.description);
  const [price, setprice] = useState(product.price);
  const [quantity, setquantity] = useState(product.quantity);
  const [sellPrice, setSellPrice] = useState(product.sellPrice);
  const [TVA, setTVA] = useState(product.tax);
  const [reference, setReference] = useState(product.reference);
  const setInformations = (ref) => {
    if (name && price && reference && quantity && sellPrice ) {
      var index = productsToBuy.findIndex(
        (product) => product.reference === ref
      );
      productsToBuy[index].reference = reference;
      productsToBuy[index].name = name;
      productsToBuy[index].description = description;
      productsToBuy[index].unitPrice = price;
      productsToBuy[index].sellPrice = sellPrice;
      productsToBuy[index].quantity = quantity;
      productsToBuy[index].totalPrice = quantity * price;
      productsToBuy[index].tax = TVA;
      productsToBuy[index].fullPrice =
        quantity * price + (quantity * price * TVA) / 100;
      props.onChange();
    } else {
      alert("enter valid informations");
    }
    setEdit(false);
  };

  return (
    <div>
      <BiEdit
        color="black"
        onClick={() => {
          setEdit(true);
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
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Reference"
            className="mb-3"
          >
            <Form.Control
              type="text"
              defaultValue={product.reference}
              placeholder="reference"
              onChange={(e) => setReference(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Nom" className="mb-3">
            <Form.Control
              type="text"
              defaultValue={product.name}
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="description price"
            className="mb-3"
          >
            <Form.Control
              type="description"
              defaultValue={product.description}
              placeholder="name@example.com"
              onChange={(e) => setdescription(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="price"
            className="mb-3"
          >
            <Form.Control
              type="number"
              defaultValue={product.unitPrice}
              placeholder="purchase price"
              onChange={(e) => setprice(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="sale price"
            className="mb-3"
          >
            <Form.Control
              type="number"
              defaultValue={product.sellPrice}
              placeholder="sale price"
              onChange={(e) => setSellPrice(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="quantity"
            className="mb-3"
          >
            <Form.Control
              type="number"
              defaultValue={product.quantity}
              placeholder="quantity"
              onChange={(e) => setquantity(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="TAX" className="mb-3">
            <Form.Control
              type="number"
              defaultValue={TVA}
              placeholder="TAX"
              onChange={(e) => setTVA(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setInformations(product.reference)}
            variant="success"
          >
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
