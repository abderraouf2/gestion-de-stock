import React, { useState, useEffect } from "react";
import { Table, Modal, Button, ToastContainer, Toast } from "react-bootstrap";
import {
  addBillInformations,
  addProductsTopurchase,
} from "../../dbConnection/purchasemanagement";
import {
  updateQuantity,
  addNewProduct,
} from "../../dbConnection/productsManagement";
export default function Bill(props) {
  const { productsToBuy, TotalPrice, provider, onChange, status, billNbr } =
    props;
  const [modalShow, setModalShow] = useState(false);
  const [currency, setCurrency] = useState("dzd");
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [productExists, setProductExists] = useState("");
  const billPreview = () => {
    if (productsToBuy.length > 0 && provider && billNbr) {
      const d = new Date();
      var date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
      var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      setDate(date);
      setTime(time);
      setModalShow(true);
    } else if (!provider) {
      setMessage("Please select a provider");
      setAlert(true);
    } else if (!billNbr) {
      setMessage("Please enter the bill number");
      setAlert(true);
    } else {
      setMessage("Please select at least one product");
      setAlert(true);
    }
  };

  const addBill = async () => {
    let Bstatus = status ? 1 : 0;
    addBillInformations(`INSERT INTO bills (billNbr, provider, date, time, totalPrice, currency, status)
      VALUES (${billNbr},"${provider}" ,"${date}", "${time}", ${TotalPrice}, "${currency}" , ${Bstatus});`);

    productsToBuy.map(async (product) => {
      await addProductsTopurchase(
        `INSERT INTO productsPurchased (billNbr, name, reference, unitPrice, quantity, totalPrice, tax, fullPrice) VALUES ( "${billNbr}" ,"${product.name}", "${product.reference}" , ${product.unitPrice}, ${product.quantity}, ${product.totalPrice}, ${product.tax} , ${product.fullPrice});`
      );

      if (product.exists) {
        await updateQuantity(product.quantity, product.reference);
      } else {
        await addNewProduct(product);
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 7000);
  }, [alert]);

  return (
    <div>
      {alert && (
        <ToastContainer position="top-center">
          <Toast
            onClose={() => {
              setAlert(false);
            }}
            show={alert}
            animation={true}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">notification</strong>
            </Toast.Header>
            <Toast.Body> {message} </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <Button
        onClick={() => {
          billPreview();
        }}
        style={{ width: "8vw", height: "5vh", backgroundColor: "#191D32" }}
      >
        Preview
      </Button>
      <Modal
        show={modalShow}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h6>Provider : {provider} </h6>
            <h6>
              Date : {date} / at : {time}{" "}
            </h6>
            {/* <h6>Time :  {time} </h6> */}
          </div>

          <Table striped="columns">
            <thead>
              <tr>
                <th style={{ width: "40vw" }}>Product</th>
                <th style={{ width: "15vw" }}>Unit price</th>
                <th style={{ width: "15vw" }}>Quantity</th>
                <th style={{ width: "15vw" }}>Price</th>
                <th style={{ width: "15vw" }}>TAX</th>
                <th style={{ width: "15vw" }}>Total price</th>
              </tr>
            </thead>
            <tbody>
              {productsToBuy.map((product) => (
                <tr key={product.reference}>
                  <td>
                    {product.name} | {product.reference}{" "}
                  </td>
                  <td>{product.unitPrice}</td>
                  <td>{product.quantity}</td>
                  <td>{product.totalPrice}</td>
                  <td>{product.tax} %</td>
                  <td>{product.fullPrice}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={5}>Price</th>
                <th>{TotalPrice} DZD</th>
              </tr>
            </tfoot>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              addBill();
              setModalShow(false);
              onChange();
            }}
          >
            Buy
          </Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
