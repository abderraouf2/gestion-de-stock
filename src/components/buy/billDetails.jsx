import React, { useEffect, useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import { Button, Modal, ListGroup, Table } from "react-bootstrap";
import { getProductsPurchased } from "../../dbConnection/purchasemanagement";
export default function BillDetails(props) {
  const { billNbr, date, time, status, provider, totalPrice, currency } = props;
  const [modalShow, setModalShow] = useState(false);
  const [billProducts, setBillProducts] = useState("");
  const getProducts = () => {
    getProductsPurchased(
      `SELECT * FROM productsPurchased WHERE billNbr='${billNbr}'`,
      setBillProducts
    );
    setModalShow(true);
    console.log(billProducts);
  };

  return (
    <div>
      <BsPlusSquare
        onClick={() => getProducts()}
        style={{ cursor: "pointer" }}
      />

      <Modal
        show={modalShow}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            bill's details
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
              <h6>Provider : {provider} </h6>
              <h6>bill number : {billNbr} </h6>
            </div>
            <div>
              <h6>
                Date : {date}
                <br />
                at : {time}{" "}
              </h6>
              <h6>status : {status === 1 ? "payed" : "unpayed"} </h6>
            </div>
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
              {billProducts ? (
                billProducts.map((product) => ( 
                  <tr key={product.reference}>
                    <td>
                      {product.name} | {product.reference}{" "}
                    </td>
                    <td>{product.unitPrice}</td>
                    <td>{product.quantity}</td>
                    <td>{product.totalPrice}</td>
                    <td>{product.tax}</td>
                    <td>{product.fullPrice}</td>
                  </tr>
                ))
              ) : (
                <tr></tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={5}>Price</th>
                <th>{totalPrice} DZD</th>
              </tr>
            </tfoot>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
