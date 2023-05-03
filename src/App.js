import React, { useEffect, useState } from "react";
import "./App.css";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ClientsComponent from "./pages/ClientsComponent";
import ProvidersComponent from "./pages/ProvidersComponent";
import ProductsComponent from "./pages/ProductsComponent";
import Buying from "./pages/Buying";
import Selling from "./pages/Selling";
import Login from "./pages/login/Login";
import NavBar from "./components/NavBar";
import Users from "./pages/Users"
import Statistics from "./pages/statistics";
import "./App.css";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineCreditCard,
} from "react-icons/ai";
import { MdQueryStats } from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { ImUserTie } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { checkLogin } from './dbConnection/usersManagement';

function App() {
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState('');
  const [refresh, setRefresh] = useState(false);
  const links = {
    textDecoration: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "7vh",
    width: "100%",
    color: "white",
  };

  const location = useLocation();
  const [eventKey, setEventKey] = useState(location.pathname);

  useEffect(()=> {
    checkLogin(setLoggedIn)
  },[])
  // useEffect(()=> {
  //   window.location.reload();
  // }, [refresh])

  return loggedIn ? (
    <div className="App" style={{ overflowX: "hidden" }}>
      <NavBar onChange={()=> window.location.reload() } />
      <Tab.Container id="left-tabs-example" activeKey={eventKey} >
        <Row style={{ height:'90vh' }}>
          <Col style={{ top: "0", left: "0", zIndex: "3" }}>
            <Nav
              variant="pills"
              className="flex-column sidebar"
              style={{ backgroundColor: "#191D32",height:'92vh'  }}
              onMouseOver={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              <Nav.Item className="links">
                <Nav.Link href="/">
                  <Link to="/" style={links} onClick={() => setEventKey("/")}>
                    <RxDashboard size={25} style={{ marginRight: "8px" }} />
                    {show && <h6> Dashboard</h6>}
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="links">
                <Nav.Link href="/clients">
                  <Link
                    to="/clients"
                    onClick={() => setEventKey("/clients")}
                    style={links}
                  >
                    <AiOutlineUser size={25} style={{ marginRight: "8px" }} />
                    {show && <h6> Clients</h6>}
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="links">
                <Nav.Link href="/providers">
                  <Link
                    to="/providers"
                    onClick={() => setEventKey("/providers")}
                    style={links}
                  >
                    <ImUserTie size={25} style={{ marginRight: "8px" }} />
                    {show && <h6> Providers</h6>}
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="links">
                <Nav.Link href="/products">
                  <Link
                    to="/products"
                    onClick={() => setEventKey("/products")}
                    style={links}
                  >
                    <AiOutlineShoppingCart
                      size={25}
                      style={{ marginRight: "8px" }}
                    />
                    {show && <h6> Products</h6>}
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="links">
                <Nav.Link href="/selling">
                  <Link
                    to="/selling"
                    onClick={() => setEventKey("/selling")}
                    style={links}
                  >
                    <MdOutlineSell size={25} style={{ marginRight: "8px" }} />
                    {show && <h6> Sell</h6>}
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="links">
                <Nav.Link href="/buying">
                  <Link
                    to="/buying"
                    onClick={() => setEventKey("/buying")}
                    style={links}
                  >
                    <AiOutlineCreditCard
                      size={25}
                      style={{ marginRight: "8px" }}
                    />
                    {show && <h6> Buy</h6>}
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="links">
                <Nav.Link href="/users">
                  <Link
                    to="/users"
                    onClick={() => setEventKey("/users")}
                    style={links}
                  >
                    <FiUsers
                      size={25}
                      style={{ marginRight: "8px" }}
                    />
                    {show && <h6> users </h6>}
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="links">
                <Nav.Link href="/statistics">
                  <Link
                    to="/statistics"
                    onClick={() => setEventKey("/statistics")}
                    style={links}
                  >
                    <MdQueryStats size={25} style={{ marginRight: "8px" }} />
                    {show && <h6> statistics</h6>}
                  </Link>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={11}>
            <Switch>
              <Tab.Content>
                <Route exact path="/">
                  <Tab.Pane eventKey="/">
                    <Dashboard setEventKey={setEventKey} />
                  </Tab.Pane>
                </Route>
                <Route exact path="/clients">
                  <Tab.Pane eventKey="/clients">
                    <ClientsComponent />
                  </Tab.Pane>
                </Route>
                <Route path="/providers">
                  <Tab.Pane eventKey="/providers">
                    <ProvidersComponent />
                  </Tab.Pane>
                </Route>
                <Route path="/products">
                  <Tab.Pane eventKey="/products">
                    <ProductsComponent />
                  </Tab.Pane>
                </Route>
                <Route path="/selling">
                  <Tab.Pane eventKey="/selling">
                    <Selling />
                  </Tab.Pane>
                </Route>
                <Route path="/buying">
                  <Tab.Pane eventKey="/buying">
                    <Buying />
                  </Tab.Pane>
                </Route>
                <Route path="/users">
                  <Tab.Pane eventKey="/users">
                    <Users />
                  </Tab.Pane>
                </Route>
                <Route path="/statistics">
                  <Tab.Pane eventKey="/statistics">
                    <Statistics />
                  </Tab.Pane>
                </Route>
                
              </Tab.Content>
            </Switch>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  ) : (
    <Login onChange={()=> window.location.reload()} />
  );
}

export default App;
