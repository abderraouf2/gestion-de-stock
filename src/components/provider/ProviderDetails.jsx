import React, { useState } from 'react'
import { BsPlusSquare } from 'react-icons/bs'
import { Button, Modal, ListGroup } from 'react-bootstrap';


export default function ProviderDetails({provider}) {
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
                Provider's details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ListGroup>
                <ListGroup.Item style={{ height:'8vh' }}>Nom: <br/> { provider.name }</ListGroup.Item>
                <ListGroup.Item style={{ height:'8vh' }}>Email: <br/> { provider.email } </ListGroup.Item>
                <ListGroup.Item style={{ height:'8vh' }}>Numero:<br/> { provider.phone } </ListGroup.Item>
                <ListGroup.Item style={{ height:'8vh' }}>Address:<br/> { provider.address } </ListGroup.Item>
                <ListGroup.Item style={{ height:'8vh' }}>NIF:<br/> { provider.nif } </ListGroup.Item>
                <ListGroup.Item style={{ height:'8vh' }}>NIS:<br/> { provider.nis } </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setModalShow(false)}  >Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}
