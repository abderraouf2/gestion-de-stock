import React, { useState, useEffect } from 'react'
import './styles.css'
import { Col,Nav, Row, Tab } from 'react-bootstrap'
import ClientsComponent from '../components/clients/ClientsComponent'
import ProvidersComponent from '../components/provider/ProvidersComponent';
import ProductsComponent from '../components/products/ProductsComponent';
import Selling from '../components/sell/Selling';
import { Link } from 'react-router-dom';

export default function Clients() {
  const [load, setLoad] = useState(false)

  useEffect(() =>{
    console.log('change made in products');
  })

  
  return (
    <div className='ClientsWrapper' style={{padding:'1%', paddingLeft:'5px'}}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Link to='/'>
                  <Nav.Link href='/' eventKey="first">Clients</Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Providers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to='/products' >
                   <Nav.Link href='/products' eventKey="third">Products</Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">Sell</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fifth">Buy</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <ClientsComponent />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <ProvidersComponent />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <ProductsComponent onChange={()=> setLoad(true)} />
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <Selling />
                </Tab.Pane>
                <Tab.Pane eventKey="fifth">
                  <ProductsComponent />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
    </div>
  )
}
