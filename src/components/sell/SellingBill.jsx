import React, { useState, useEffect } from "react";
import { Table, Modal, Button, ToastContainer, Toast } from "react-bootstrap";
import {
  addSalesBillInformations,
  reduceQuantity,
  addProductsSold,
} from "../../dbConnection/salesManagement";
import { getSalesBills } from "../../dbConnection/salesManagement";

export default function SellingBill(props) {
  const { productsToSell, client, TotalPrice, status } = props;
  const [modalShow, setModalShow] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [currency, setCurrency] = useState("dzd");
  const [bills, setBills] = useState("");
  const [BillNbr, setBillNbr] = useState("");
  const preview = () => {
    if (productsToSell.length > 0 && client) {
      const d = new Date();
      var date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
      var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      setDate(date);
      setTime(time);
      setModalShow(true);
    } else if (!client) {
      setMessage("Please select a client");
      setAlert(true);
    } else {
      setMessage("Please select at least one product");
      setAlert(true);
    }
  };

  const sellProducts = () => {
    addSalesBillInformations(`INSERT INTO salesBills (billNbr, client, date, time, totalPrice, currency, status)
      VALUES (${BillNbr},"${client}" ,"${date}", "${time}", ${TotalPrice}, "${currency}" , ${status});`);

    productsToSell.map(async (product) => {
      await addProductsSold(
        `INSERT INTO productsSold (billNbr, name, reference, price, quantity, totalPrice) VALUES ( "${BillNbr}" ,"${product.name}","${product.reference}" ,${product.price}, ${product.quantity}, ${product.totalPrice});`
      );

      await reduceQuantity(product.quantity, product.reference);
    });
  };

  useEffect(() => {
    setBillNbr(bills.length + 1);
  }, [bills]);

  useEffect(() => {
    getSalesBills(setBills);
  }, []);

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
        onClick={() => preview()}
        style={{ width: "8vw", height: "5vh", backgroundColor: "#191D32", margin:'2vh', marginRight:'0' }}
      >
        preview
      </Button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Products to sell
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h6>client : {client} </h6>
              <h6>bill number : {BillNbr} </h6>
            </div>
            <div>
              <h6>
                Date : {date} / at : {time}{" "}
              </h6>
              {/* <h6>Time :  {time} </h6> */}
            </div>
          </div>
          <Table striped="columns">
            <thead>
              <tr>
                <th style={{ width: "40vw" }}>Product</th>
                <th style={{ width: "40vw" }}>Category</th>
                <th style={{ width: "15vw" }}>Unit price</th>
                <th style={{ width: "15vw" }}>Quantity</th>
                <th style={{ width: "15vw" }}>Total price</th>
              </tr>
            </thead>
            <tbody>
              {productsToSell &&
                productsToSell.map((product) => (
                  <tr key={product.reference}>
                    <td>
                      {product.name} | {product.reference}{" "}
                    </td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.totalPrice}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={3}>Price</th>
                <th>{TotalPrice} DZD</th>
              </tr>
            </tfoot>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={sellProducts} variant="success">
            sell
          </Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
