import React, { useState } from 'react'
import { Button,Table, Modal, Form,FloatingLabel } from 'react-bootstrap';
import {BiEdit} from 'react-icons/bi'
import products from '../../data/products';


export default function EditProduct(props) {
    const product = props.product;
    const [Edit, setEdit] = useState(false)
    const [name, setName] = useState(product.name);
    const [description, setdescription] = useState(product.description);
    const [price, setprice] = useState(product.price);
    const [quantity, setquantity] = useState(product.quantity);
    const [reference, setReference] = useState(product.reference);
    const addproduct = (id) => {
        if (name && price && reference && quantity ) {
            var index = products.findIndex(product => product.id === id); 
            props.onChange();
            products[index].name = name;
            products[index].description = description;
            products[index].price = price;
            products[index].quantity = quantity;
            products[index].reference = reference;
            setName('');
            setdescription('');
            setquantity(0);
            setprice('');
            setReference(0);
        }else {
            alert('enter valid informations')
        }
      setEdit(false)
      console.log(products[index]);
  }

  return (
    <div>
                            <BiEdit color='black' onClick={() => {setEdit(true); console.log(product.name); }} style={{cursor:'pointer'}} />      
                            <Modal
                                    show={Edit}
                                    size="lg"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                    >
                                    <Modal.Header >
                                        <Modal.Title id="contained-modal-title-vcenter">
                                        Edit Product
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <FloatingLabel
                                            controlId="floatingInput"
                                            label="Nom"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" defaultValue={product.name} placeholder="name" onChange={(e)=> setName(e.target.value) } />
                                        </FloatingLabel>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Reference"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" defaultValue={product.reference} placeholder="reference" onChange={(e)=> setReference(e.target.value) } />
                                        </FloatingLabel>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="description price"
                                            className="mb-3"
                                        >
                                            <Form.Control type="description" defaultValue={product.description} placeholder="name@example.com" onChange={(e)=> setdescription(e.target.value) } />
                                        </FloatingLabel>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="price"
                                            className="mb-3"
                                        >
                                            <Form.Control type="number" defaultValue={product.quantity} placeholder="price" onChange={(e)=> setquantity(e.target.value) } />
                                        </FloatingLabel>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="quantity"
                                            className="mb-3"
                                        >
                                            <Form.Control type="number" defaultValue={product.price} placeholder="quantity" onChange={(e)=> setprice(e.target.value) } />
                                        </FloatingLabel>
                                        
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={() => addproduct(product.id)} variant="success" >save</Button>
                                        <Button onClick={() => setEdit(false)} variant="danger" >Close</Button>
                                    </Modal.Footer>
                                </Modal>
    </div>
  )
}
