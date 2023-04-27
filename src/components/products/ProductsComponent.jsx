import React, { useState, useRef, useEffect } from "react";
import { Button, Table, Tabs, Tab, FloatingLabel, Form } from "react-bootstrap";
import EditProduct from "./EditProduct";
import { ImBin } from "react-icons/im";
import Addproduct from "./AddProduct";
import ProductDetails from "./ProductDetails";
import ReactToPrint from "react-to-print";
import { getProducts } from "../../dbConnection/productsManagement";
import { AiOutlinePrinter } from "react-icons/ai";
import "../styleComponent.css";
import Stock from "./Stock";
export default function ProductsComponent(props) {
  const [key, setKey] = useState("home");
  const [products, setProducts] = useState("");
  const [search, setSearch] = useState("");
  const deleteproduct = (id) => {
    var index = products.findIndex((product) => product.id === id);
    products.splice(index, 1);
    setCount(count - 1);
    props.onChange();
  };
  const componentRef = useRef();

  useEffect(() => {
    getProducts(setProducts);
  }, []);

  const [count, setCount] = useState(products.length);

  return (
    <div style={{ width: "90vw", marginTop: "2vh" }}>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        fill
      >
        <Tab eventKey="home" title="Products">
          {products.length > 0 ? (
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
                  label="search product by reference"
                  className="focusInput"
                >
                  <Form.Control
                    type="text"
                    placeholder="search"
                    onChange={(e) => setSearch(e.target.value)}
                    className="focusInput"
                  />
                </FloatingLabel>
                <div
                  style={{
                    width: "16vw",
                    textAlign: "right",
                    height: "15vh",
                    padding: "0%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Addproduct onChange={() => setCount(count + 1)} />
                  <ReactToPrint
                    trigger={() => (
                      <Button variant="danger">
                        <AiOutlinePrinter size={30} />
                        Print
                      </Button>
                    )}
                    content={() => componentRef.current}
                  />
                </div>
              </div>
              <div style={{ height: "650px", border: "2px solid #0e6ba8 " }}>
                <Table striped bordered hover width="80vw" ref={componentRef}>
                  <thead>
                    <tr>
                      <th style={{ width: "20vw" }}>Nom</th>
                      <th style={{ width: "20vw" }}>Reference</th>
                      <th style={{ width: "25vw" }}>purchase price</th>
                      <th style={{ width: "25vw" }}>sale price</th>
                      <th style={{ width: "25vw" }}>Quantity</th>
                      <th style={{ width: "10vw" }}>more details</th>
                      {/* <th style={{ width: "5vw" }}>actions</th>
  <th style={{ width: "5vw" }}>actions</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter((product) => {
                        return product.reference
                          .toLowerCase()
                          .includes(search.toLowerCase());
                      })
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
                            {/* <td
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <EditProduct
                  product={product}
                  onChange={() => setCount(count + 1)}
                />
              </td> */}
                            {/* <td>
                <div key={product.id}>
                  <ImBin
                    onClick={() => deleteproduct(product.id)}
                    color="red"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </td> */}
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
            <h1>Make a new purchase</h1>
          )}
        </Tab>
        <Tab eventKey="stock" title="out of stock">
          <Stock />
        </Tab>
      </Tabs>
    </div>
  );
}
