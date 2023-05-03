import React, { useEffect, useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import AddCategory from "../products/AddCategory";
import { getCategories, addNewCategory } from "../../dbConnection/productsManagement";
export default function AddNewProduct(props) {
  const { productsToBuy } = props;
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState("");
  const [reference, setReference] = useState("");
  const [price, setprice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [taxValue, setTaxValue] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const addProduct = () => {
    if (name && reference && price && quantity) {
      const isAvailable = productsToBuy.filter(
        (product) => product.reference == reference
      );
      console.log(isAvailable);
      if (isAvailable.length == 0) {
        productsToBuy.push({
          exists: false,
          reference,
          name,
          description,
          quantity,
          category,
          unitPrice: price,
          sellPrice: salePrice,
          totalPrice: quantity * price,
          tax: taxValue,
          fullPrice: quantity * price + (quantity * price * taxValue) / 100,
        });
        addNewCategory(category)
        setTaxValue(0);
        props.onChange();
      } else {
        alert("Product already available");
      }
      setModalShow(false);
    } else {
      alert("enter valid informations");
    }
  };
  useEffect(() => {
    getCategories(setCategories);
  }, []);
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
        new product
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
            Product's Informations
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
              placeholder="reference"
              onChange={(e) => setReference(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Nom" className="mb-3">
            <Form.Control
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="description"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="description"
              onChange={(e) => setdescription(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="purchase price"
            className="mb-3"
          >
            <Form.Control
              type="number"
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
              placeholder="sale price"
              onChange={(e) => setSalePrice(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="quantity"
            className="mb-3"
          >
            <Form.Control
              type="number"
              placeholder="quantity"
              onChange={(e) => setquantity(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="TVA"
            size="lg"
            onChange={(e) => {
              setTaxValue(e.target.value);
            }}
          >
            <Form.Control type="number" placeholder="TVA" />
          </FloatingLabel>
          <Form.Select
            size="lg"
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginBottom: "2vh", width: "58%" }}
            className="inputs"
          >
            <option value="" disabled hidden>
              -- select category --
            </option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addProduct} variant="success">
            Add product
          </Button>
          <Button onClick={() => setModalShow(false)} variant="danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
