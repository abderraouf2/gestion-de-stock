import React, { useState } from 'react'
import { Button, Modal, Form,FloatingLabel } from 'react-bootstrap';
import { BsPlusCircleFill } from 'react-icons/bs'
import { AddNewProvider } from '../../dbConnection/providersManagement';



export default function AddProvider(props) {
    const [modalShow, setModalShow] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [nif, setNif] = useState(0);
    const [nis, setNis] = useState(0)
    const [phone, setPhone] = useState(0);
    const addProvider = () => {
        if (name && email && phone && nif && nis ) {
            props.onChange();
            AddNewProvider(`INSERT INTO providers (name, nif, nis, email, phone, address)
                         VALUES ("${name}",${nif}, ${nis}, "${email}", ${phone}, "${address}"  );`)
        setModalShow(false)
        } else {
            alert('enter valid informations')
        }
    }

    
  return (
    <div>
        <Button onClick={() => setModalShow(true)} style={{cursor:'pointer', width:'11vw', display:'flex', justifyContent:'space-between', alignItems:'center' }}  variant="success">
        Add new supplier
        <BsPlusCircleFill onClick={() => setModalShow(true)} size={30}  />
        </Button>
        <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                Provider's Informations
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
                    label="NIF"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="NIF" onChange={(e)=> setNif(e.target.value) } />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="NIS"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="NIS" onChange={(e)=> setNis(e.target.value) } />
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
                <Button onClick={() => addProvider()} variant="success" >Add supplier</Button>
                <Button onClick={() => setModalShow(false)} variant="danger" >Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}
