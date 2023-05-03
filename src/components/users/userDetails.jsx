import React, { useState } from 'react'
import { BsPlusSquare } from 'react-icons/bs'
import { Button, Modal, ListGroup } from 'react-bootstrap';


export default function UserDetails({user}) {
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
                User's details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ListGroup>
                <ListGroup.Item style={{ height:'8vh' }}>username: <br/> { user.username }</ListGroup.Item>
                <ListGroup.Item style={{ height:'8vh' }}>password: <br/> { user.password } </ListGroup.Item>
                <ListGroup.Item style={{ height:'8vh' }}>Numero:<br/> { user.phone } </ListGroup.Item>
                <ListGroup.Item style={{ height:'8vh' }}>role:<br/> { user.role } </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setModalShow(false)}  >Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}
