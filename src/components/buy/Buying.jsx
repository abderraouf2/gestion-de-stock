import React, { useState, useEffect } from "react";
import {
  Form,
  Table,
  FloatingLabel,
  Button,
  Tabs,
  Tab,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import AddNewProduct from "./AddNewProduct";
import ProductDetails from "../products/ProductDetails";
import { getProducts } from "../../dbConnection/productsManagement";
import { getProviders } from "../../dbConnection/providersManagement";
import EditProduct from "./EditProduct";
import { ImBin } from "react-icons/im";
import Bill from "./bill";
import Bills from "./bills";
import "./buying.style.css";

export default function Buying() {
  const [providers, setProviders] = useState("");
  const [products, setProducts] = useState("");
  const [product, setProduct] = useState("");
  const [provider, setProvider] = useState("");
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [key, setKey] = useState("home");
  const [counter, setCounter] = useState(productsToBuy.length);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [payed, setPayed] = useState(true);
  const [billNbr, setBillNbr] = useState("");
  const AddProduct = () => {
    const exists = productsToBuy.filter(
      (productToBuy) => productToBuy.reference === product.reference
    );
    if (productsToBuy.length === 0 && !product) {
      setMessage("No product selected.");
      setAlert(true);
    } else if (product !== "" && quantity && exists.length == 0) {
      productsToBuy.push({
        exists: true,
        reference: product.reference,
        name: product.name,
        description: product.description,
        unitPrice: product.price,
        sellPrice: product.sellPrice,
        quantity: quantity,
        totalPrice: quantity * product.price,
        tax: product.tax,
        fullPrice:
          quantity * product.price +
          (quantity * product.price * product.tax) / 100,
      });
      setCounter(counter + 1);
      setProduct("");
      setQuantity("");
    } else if (!quantity) {
      setMessage("Enter valid quantity.");
      setAlert(true);
    } else {
      setMessage("Product already added.");
      setAlert(true);
    }
  };
  const getProduct = (reference) => {
    const product = products.find((product) => product.reference === reference);
    setProduct(product);
  };

  const updatePrice = () => {
    setTotalPrice(
      productsToBuy.reduce(
        (accumulator, current) => accumulator + current.fullPrice,
        0
      )
    );
  };

  useEffect(() => {
    updatePrice();
  }, [counter]);


  useEffect(() => {
    getProviders(setProviders);
    getProducts(setProducts);
  }, []);

  const deleteproduct = (reference) => {
    var index = productsToBuy.findIndex(
      (product) => product.reference === reference
    );
    setTotalPrice(TotalPrice - productsToBuy[index].totalPrice);
    productsToBuy.splice(index, 1);
  };

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 7000);
  }, [alert]);

  return (
    <div
      style={{
        width: "90vw",
        display: "flex",
        justifyContent: "center",
        marginTop: "2vh",
        flexDirection: "column",
        
      }}
    >
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
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        fill
      >
        <Tab eventKey="home" title="New purshase" variant="pills">
          <div style={{ width: "90vw" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "0vh",
              }}
            >
              <Form.Select
                size="lg"
                defaultValue={product}
                onChange={(e) => setProvider(e.target.value)}
                style={{ marginBottom: "2vh", width: "58%" }}
                className="inputs"
              >
                <option value="" disabled hidden>
                  -- select provider --
                </option>
                {providers.length > 0 &&
                  providers.map((provider) => (
                    <option key={provider.id} value={provider.name}>
                      {provider.name}
                    </option>
                  ))}
              </Form.Select>
              <FloatingLabel
                controlId="floatingInput"
                label="Bill Number"
                size="lg"
                style={{ marginBottom: "2vh", width: "40%" }}
              >
                <Form.Control
                  type="number"
                  placeholder="billNbr"
                  value={billNbr}
                  onChange={(e) => {
                    setBillNbr(e.target.value);
                  }}
                />
              </FloatingLabel>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "0vh",
              }}
            >
              <Form.Select
                size="lg"
                style={{ width: "58%" }}
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
                        {product.name} | Ref: {product.reference}
                      </option>
                    );
                  })}
              </Form.Select>
              <FloatingLabel
                style={{ width: "31%", Height: "100%" }}
                controlId="floatingInput"
                label="Quantity"
                size="lg"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              >
                <Form.Control
                  type="number"
                  placeholder="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                />
              </FloatingLabel>

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
                height: "10vh",
                width: "45%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0",
              }}
            >
              <AddNewProduct
                productsToBuy={productsToBuy}
                onChange={() => setCounter(counter + 1)}
              />
              <Form.Select
                size="lg"
                defaultValue={payed}
                onChange={(e) => {
                  e.target.value === 'payed' ? setPayed(true) : setPayed(false)
                }}
                style={{ margin: "2vh 0 2vh 2vh", height: "80%" }}
                className="inputs"
              >
                <option value={'payed'}>payed</option>
                <option value={'unpayed'}>unpayed</option>
              </Form.Select>
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
                striped
                bordered
                hover
              >
                <thead>
                  <tr>
                    <th style={{ width: "40vw" }}>Product</th>
                    <th style={{ width: "15vw" }}>Unit price</th>
                    <th style={{ width: "15vw" }}>Quantity</th>
                    <th style={{ width: "15vw" }}>Price</th>
                    <th style={{ width: "15vw" }}>TAX ( % )</th>
                    <th style={{ width: "15vw" }}>Total price</th>
                    <th style={{ width: "5vw" }}>edit</th>
                    <th style={{ width: "5vw" }}>delete </th>
                  </tr>
                </thead>
                {productsToBuy.length > 0 && (
                  <>
                    <tbody>
                      {productsToBuy.map((product) => (
                        <tr key={product.reference}>
                          <td>{product.name}</td>
                          <td>{product.unitPrice } DZD</td>
                          <td>{product.quantity}</td>
                          <td>{product.totalPrice} DZD</td>
                          <td>{product.tax} %</td>
                          <td>{product.fullPrice} DZD</td>
                          <td style={{ textAlign: "left" }}>
                            <EditProduct
                              productsToBuy={productsToBuy}
                              product={product}
                              onChange={() => {
                                setCounter(counter + 1);
                              }}
                            />
                          </td>
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
                        <th colSpan={5}>TOTAL</th>

                        <th>{TotalPrice} DZD</th>
                      </tr>
                    </tfoot>
                  </>
                )}
              </Table>
            </div>
            <div
              style={{
                width: "90vw",
                height: "10vh",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <Bill
                billNbr={billNbr}
                status={payed}
                onChange={() => setProductsToBuy([])}
                productsToBuy={productsToBuy}
                TotalPrice={TotalPrice}
                provider={provider}
              />
            </div>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Bills">
          <Bills />
        </Tab>
      </Tabs>
    </div>
  );
}
