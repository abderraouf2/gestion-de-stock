import React, { useState } from 'react'
import { BsPlusSquare } from 'react-icons/bs'
import { Button, Modal, ListGroup } from 'react-bootstrap';


export default function ClientDetails({client}) {
    const [modalShow, setModalShow] = useState(false)
  return (
    <div>
       
            <BsPlusSquare onClick={() => setModalShow(true)} style={{cursor:'pointer'}} />
        
        <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                Client's details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ListGroup>
                <ListGroup.Item style={{ height:'8vh' }}>Nom: <br/> { client.name }</ListGroup.Item>
                <ListGroup.Item style={{ height:'8vh' }}>Email: <br/> { client.email } </ListGroup.Item>
                <ListGroup.Item style={{ height:'8vh' }}>Numero:<br/> { client.phone } </ListGroup.Item>
                <ListGroup.Item style={{ height:'8vh' }}>Address:<br/> { client.address } </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setModalShow(false)}  >Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}
