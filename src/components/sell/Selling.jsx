import React, { useState, useEffect } from "react";
import { Form, Table, FloatingLabel, Button, Tab, Tabs } from "react-bootstrap";
import Bills from "./bills";
import { ImBin } from "react-icons/im";
import { getClients } from "../../dbConnection/clientsManagement";
import { getProducts } from "../../dbConnection/productsManagement";
import SellingBill from "./SellingBill";
export default function Selling() {
  const [clients, setclients] = useState("");
  const [client, setClient] = useState("");
  const [products, setProducts] = useState("");
  const [product, setProduct] = useState("");
  const [productsToSell, setProductsToSell] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [counter, setCounter] = useState(productsToSell.length);
  const [errorQuantity, setErrorQuantity] = useState(false);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [bills, setBills] = useState([]);
  const [status, setStatus] = useState(true);
  const [key, setKey] = useState("home");
  const AddProduct = () => {
    const exists = productsToSell.filter(
      (productToSell) => productToSell.reference === product.reference
    );

    if (product !== "" && quantity && exists.length == 0) {
      if (product.quantity < quantity) {
        setErrorQuantity(true);
      } else {
        productsToSell.push({
          reference: product.reference,
          name: product.name,
          price: product.sellPrice,
          quantity: quantity,
          totalPrice: quantity * product.sellPrice,
        });
        let newProductsList = products.filter(
          (p) => p.reference !== product.reference
        );
        setProducts(newProductsList);
        setProduct("");
        setCounter(counter + 1);
        setQuantity("");
      }
    }
  };
  const getProduct = (reference) => {
    const Product = products.find((product) => product.reference === reference);
    setProduct(Product);
  };
  useEffect(() => {
    setTotalPrice(
      productsToSell.reduce(
        (accumulator, current) => accumulator + current.totalPrice,
        0
      )
    );
  }, [counter]);

  useEffect(() => {
    setErrorQuantity(false);
    setQuantity("");
  }, [product]);

  useEffect(() => {
    getClients(setclients);
    getProducts(setProducts);
  }, []);

  const deleteproduct = (reference) => {
    var index = productsToSell.findIndex(
      (product) => product.reference === reference
    );
    setTotalPrice(TotalPrice - productsToSell[index].totalPrice);
    productsToSell.splice(index, 1);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2vh",
        flexDirection: "column",
      }}
    >
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        fill
      >
        <Tab eventKey="home" title="New bill">
          <div style={{ width: "90vw" }}>
            <Form.Select
              size="lg"
              onChange={(e) => setClient(e.target.value)}
              style={{ marginBottom: "2vh" }}
              defaultValue={client}
            >
              <option value="" disabled hidden>
                -- select client --
              </option>
              {clients.length > 0 &&
                clients.map((client) => (
                  <option key={client.id} value={client.name}>
                    {client.name}
                  </option>
                ))}
            </Form.Select>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "6vh",
                justifyContent: "space-between",
                marginBottom: "5vh",
              }}
            >
              <Form.Select
                size="lg"
                style={{ width: "60%" }}
                defaultValue={product}
                onChange={(e) => {
                  getProduct(e.target.value);
                }}
              >
                <option value="" disabled hidden>
                  -- select product --
                </option>
                {products.length > 0 &&
                  products.map((product, index) => {
                    return (
                      <option value={product.reference} key={index}>
                        {product.name} | {product.reference}
                      </option>
                    );
                  })}
              </Form.Select>
              <div
                style={{
                  width: "30%",
                  Height: "6vh",
                }}
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Quantity"
                  size="lg"
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  <Form.Control
                    style={{
                      width: "100%",
                      height: "6vh",
                      border: errorQuantity && "2px solid red",
                    }}
                    type="number"
                    placeholder="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                  />
                </FloatingLabel>
                {errorQuantity && (
                  <label
                    htmlFor="quantity"
                    style={{
                      width: "100%",
                      height: errorQuantity ? "10%" : "0",
                      transition: "2s",
                      position: "relative",
                      left: "0",
                      color: "red",
                      textAlign: "left",
                    }}
                  >
                    max quantity avaliable is {product.quantity}
                  </label>
                )}
              </div>
              <Button
                variant="success"
                onClick={AddProduct}
                style={{ width: "6vw" }}
              >
                Add
              </Button>
            </div>

            <div
              style={{
                height: "500px",
                width: "90vw",
                overflowY: "scroll",
                border: "2px solid black",
                margin: "0",
              }}
            >
              <Table
                responsive="md"
                style={{ width: "100%", textAlign: "left" }}
              >
                <thead>
                  <tr>
                    <th style={{ width: "30vw" }}>Product</th>
                    <th style={{ width: "15vw" }}>Unit price</th>
                    <th style={{ width: "15vw" }}>Quantity</th>
                    <th style={{ width: "15vw" }}>Price</th>
                    <th style={{ width: "5vw" }}>delete </th>
                  </tr>
                </thead>
                {productsToSell.length > 0 && (
                  <>
                    <tbody>
                      {productsToSell.map((product) => (
                        <tr key={product.reference}>
                          <td>
                            {product.name} | {product.reference}
                          </td>
                          <td>{product.price}</td>
                          <td>{product.quantity}</td>
                          <td>{product.totalPrice} DZD</td>
                          <td style={{ textAlign: "left" }}>
                            <ImBin
                              onClick={() => deleteproduct(product.reference)}
                              color="red"
                              style={{ cursor: "pointer" }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan={3}>Total</th>
                        <th>{TotalPrice} DZD</th>
                      </tr>
                    </tfoot>
                  </>
                )}
              </Table>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "row",
                justifyContent: "flex-end",
              }}
            >
              <Form.Select
                size="lg"
                defaultValue={status}
                onChange={(e) => {
                  e.target.value === "payed"
                    ? setStatus(true)
                    : setStatus(false);
                }}
                style={{ margin: "2vh", height: "100%", width: "20vh" }}
                className="inputs"
              >
                <option value={"payed"}>payed</option>
                <option value={"unpayed"}>unpayed</option>
              </Form.Select>
              <SellingBill
                TotalPrice={TotalPrice}
                productsToSell={productsToSell}
                client={client}
                bills={bills}
                status={status}
              />
            </div>
          </div>
        </Tab>
        <Tab eventKey="profile" title="bills">
          <Bills />
        </Tab>
      </Tabs>
    </div>
  );
}
