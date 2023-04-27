import React, { useState, useEffect } from "react";
import { getProducts } from "../../dbConnection/productsManagement";
import { Table, FloatingLabel, Form } from "react-bootstrap";
import ProductDetails from "./ProductDetails";
export default function Stock() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts(setProducts);
  }, []);

  return (
    <div>
      {products.filter(
        (product) => product.quantity <= 5
      ).length > 0 ? (
        <>
          <div
            style={{
              width: "90vw",
              textAlign: "right",
              height: "15vh",
              padding: "0%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FloatingLabel
              controlId="floatingInput"
              label="search product"
              className="focusInput"
            >
              <Form.Control
                type="text"
                placeholder="search"
                onChange={(e) => setSearch(e.target.value)}
                className="focusInput"
              />
            </FloatingLabel>
          </div>
          <div style={{ height: "650px", border: "2px solid #0e6ba8 " }}>
            <Table striped bordered hover width="80vw">
              <thead>
                <tr>
                  <th style={{ width: "20vw" }}>Nom</th>
                  <th style={{ width: "20vw" }}>Reference</th>
                  <th style={{ width: "25vw" }}>purchase price</th>
                  <th style={{ width: "25vw" }}>sale price</th>
                  <th style={{ width: "25vw" }}>Quantity</th>
                  <th style={{ width: "10vw" }}>more details</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter((product) => {
                    return product.reference
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  }).filter(
                    (product) => product.quantity <= 5
                  )
                  .map((product) => {
                    return (
                      <tr key={product.reference}>
                        <td>{product.name}</td>
                        <td>{product.reference}</td>
                        <td>{product.price}</td>
                        <td>{product.sellPrice}</td>
                        <td
                          style={{
                            backgroundColor: product.quantity <= 5 && "red",
                          }}
                        >
                          {" "}
                          {product.quantity}{" "}
                        </td>
                        <td>
                          <ProductDetails product={product} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        <h1>No products out of stock</h1>
      )}
    </div>
  );
}
