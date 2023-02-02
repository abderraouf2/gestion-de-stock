

import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Col,Nav, Row, Tab } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Link, useHistory, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ClientsComponent from './components/clients/ClientsComponent'
import ProvidersComponent from './components/provider/ProvidersComponent';
import ProductsComponent from './components/products/ProductsComponent';
import Buying from './components/buy/Buying';
import Selling from './components/sell/Selling';
import './App.css';
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineCreditCard } from 'react-icons/ai'
import { MdOutlineSell }from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { ImUserTie } from 'react-icons/im'
import { SAVE_TEXT, FETCH_TEXT, HANDLE_FETCH, HANDLE_SAVE } from './utils/constants'
// import sqlite3 from 'sqlite3';

// const db = new sqlite3.Database(':memory:');

import { ipcRenderer } from 'electron-renderer';
function App() {
  // const db = new sqlite3.Database(':memory:');

  // const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [response, setResponse] = useState('')
 
  const loadSave = () => {
    ipcRenderer.send(FETCH_TEXT, 'ping')
  }
  const handleFetchText = (event, data) => {
    const { text } = data;
    setResponse(text)
    console.log(text);
  }
  const handleSaveText = (event, data) => {
    console.log('done');
  }

  useEffect(()=>{
    ipcRenderer.on(HANDLE_SAVE, handleSaveText)
    ipcRenderer.on(HANDLE_FETCH, handleFetchText)   

  },[])

  const LinkStyle = {
    textDecoration:'none',
  }
  const links = {
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    height:'5vh',
    width:'100%',
    color:'white',
  }
  const currentRoute = useHistory().location.pathname.toLowerCase();
  return (
    <div className="App" style={{ overflowX:'hidden'}}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
              <Col style={ { top:"0", left:'0' } } >
                <Nav variant="pills" className="flex-column sidebar" style={{  backgroundColor:'#191D32' }} onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)} >
                <Nav.Item>
                  <Link to='/' style={LinkStyle}>
                    <Nav.Link href='/' eventKey="first" style={links}>
                      <RxDashboard size={25} style={{ marginRight:'8px' }} />
                      { show &&  <h6> Dashboard</h6>}
                      </Nav.Link>
                    </Link>
                  </Nav.Item>
                  <Nav.Item style={LinkStyle}>
                    <NavLink to='/clients' style={LinkStyle}>
                    <Nav.Link href='/clients' eventKey="second" style={links}>
                      <AiOutlineUser size={25} style={{ marginRight:'8px' }} />
                      { show &&  <h6> Clients</h6>}
                      </Nav.Link>
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <Link  to='/providers' style={LinkStyle}>
                    <Nav.Link href='/providers' eventKey="third"  style={links}>
                      <ImUserTie size={25} style={{ marginRight:'8px' }} />
                      { show &&  <h6> Providers</h6>}
                    </Nav.Link>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to='/products' style={LinkStyle} >
                    <Nav.Link href='/products' eventKey="fourth" style={links}>
                      <AiOutlineShoppingCart size={25} style={{ marginRight:'8px' }} />
                      { show &&  <h6> Products</h6>}
                      </Nav.Link>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to='/selling' style={LinkStyle} >
                      <Nav.Link href='/selling' eventKey="fifth" style={links}>
                        <MdOutlineSell size={25} style={{ marginRight:'8px' }} />
                        { show &&  <h6> Sell</h6>}
                        </Nav.Link>
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to='/buying' style={LinkStyle} >
                      <Nav.Link href='/buying' eventKey="sixth" style={links}>
                        <AiOutlineCreditCard size={25} style={{ marginRight:'8px' }} />
                        { show &&  <h6> Buy</h6>}
                        </Nav.Link>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Col>
             <Col sm={10}>
              <Switch>
                <Tab.Content>
                  <Route exact path='/'>
                    <Tab.Pane eventKey="first">
                      <Dashboard />
                    </Tab.Pane>
                  </Route>
                  <Route exact path='/clients'>
                    <Tab.Pane eventKey="second">
                      <ClientsComponent />
                    </Tab.Pane>
                  </Route>
                  <Route path='/providers'>
                    <Tab.Pane eventKey="third">
                      <ProvidersComponent />
                    </Tab.Pane>
                  </Route>
                  <Route path='/products'>
                  <Tab.Pane eventKey="fourth">
                    <ProductsComponent   />
                  </Tab.Pane>
                  </Route>
                  <Route path='/selling'>
                  <Tab.Pane eventKey="fifth">
                    <Selling />
                  </Tab.Pane>
                  </Route>
                  <Route path='/buying'>
                  <Tab.Pane eventKey="sixth">
                    <Buying />
                  </Tab.Pane>
                  </Route>
                </Tab.Content>
              </Switch>
            </Col>
          </Row>
        </Tab.Container>
        <Button onClick={loadSave} >click me</Button>
    </div>
  );
}

export default App;
