import React, { useState } from 'react'
import { Button, Modal, Form,FloatingLabel } from 'react-bootstrap';
import products from '../../data/products';
import { BsPlusCircleFill } from 'react-icons/bs'

export default function AddProvider(props) {
    const [modalShow, setModalShow] = useState(false)
    const [name, setName] = useState('');
    const [description, setdescription] = useState('');
    const [quantity, setquantity] = useState('');
    const [reference, setReference] = useState('')
    const [price, setprice] = useState(0);
    const addProduct = () => {
        props.onChange();
        if (name && reference && price && quantity ) {
            const isAvailable = products.filter(product => product.reference == reference);
            console.log(isAvailable);
            if (isAvailable.length==0){
                products.push({
                    name,
                    reference,
                    description,
                    price,
                    quantity,
                })
            } else {
                alert('Product already available')
            }
        }
        
    setModalShow(false)
}
  return (
    <div>
        <Button onClick={() => setModalShow(true)} style={{cursor:'pointer', width:'11vw', display:'flex', justifyContent:'space-between', alignItems:'center' }}  variant="success">
            Add new product
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
                Product's Informations
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
                    label="Reference"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="reference" onChange={(e)=> setReference(e.target.value) } />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="description"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="description" onChange={(e)=> setdescription(e.target.value) } />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="price"
                    className="mb-3"
                >
                    <Form.Control type="number" placeholder="price" onChange={(e)=> setprice(e.target.value) } />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="quantity"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="quantity" onChange={(e)=> setquantity(e.target.value) } />
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => addProduct()} variant="success" >Add product</Button>
                <Button onClick={() => setModalShow(false)} variant="danger" >Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}
