import React, { useState } from 'react'
import { Button, Modal, Form,FloatingLabel } from 'react-bootstrap';
import clients from '../../data/clients';
import { BsPlusCircleFill } from 'react-icons/bs'

export default function AddClient(props) {
    const [modalShow, setModalShow] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState(0);
    const addClient = (event) => {
        props.onChange();
        clients.push({
            name,
            email,
            phone,
            address,
        })
    setModalShow(false)
}
  return (
    <div>
        <Button onClick={() => setModalShow(true)} style={{cursor:'pointer', width:'10vw', display:'flex', justifyContent:'space-between', alignItems:'center' }}  variant="success" >
            Add new Client 
            <BsPlusCircleFill size={30} />
        </Button>
        <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                Client's Informations
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <FloatingLabel
                    controlId="floatingInput"
                    label="Nom"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="name" onChange={(e)=> setName(e.target.value) } />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com" onChange={(e)=> setEmail(e.target.value) } />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="numero"
                    className="mb-3"
                >
                    <Form.Control type="number" placeholder="numero" onChange={(e)=> setPhone(e.target.value) } />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="address"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="address" onChange={(e)=> setAddress(e.target.value) } />
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => addClient(false)} variant="success" >Add Client</Button>
                <Button onClick={() => setModalShow(false)} variant="danger" >Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}
