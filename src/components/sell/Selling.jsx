import React, { useState, useEffect } from 'react';
import { Form, Table, FloatingLabel, Button } from 'react-bootstrap';
import clients from '../../data/clients';
import products from '../../data/products';


export default function Selling() {

    const [product, setProduct] = useState({});
    const [productsToSell, setProductsToSell] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [counter, setCounter] = useState(productsToSell.length);
    const [TotalPrice, setTotalPrice] = useState(0)
    const AddProduct = () => {
        const exists = productsToSell.filter(productToSell=> productToSell.id === product.id)
        if (product !== '' && quantity && exists.length==0 ) {
            setProductsToSell([...productsToSell, {
                id:product.id,
                name: product.name,
                quantity: quantity,
                totalPrice: quantity * product.price,
            }])
            setProduct('');
            setCounter(counter+1);
            setQuantity('')
        } 
    }
    const getProduct = (name) => {
        const product = products.find(product => product.name === name);
        setProduct(product);
    }
    useEffect(() => {
        productsToSell.map((product)=> setTotalPrice(TotalPrice + product.totalPrice))

    }, [productsToSell])
    

  return (
    <div style={{ display:'flex', justifyContent:'center', marginTop:'10vh' }}>
        <div style={{ width:'70vw' }}>
            <Form.Select size="lg" onChange={(e) => console.log(e.target.value) } style={{ marginBottom:'2vh' }} >
                {
                    clients.map(client => (
                        <option key={client.id} value={client.name}>{client.name}</option>
                    ))
                }
            </Form.Select>
                        <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:'5vh' }} >
                                <Form.Select size="lg" style={{ width:'60%' }}  onChange={(e) => { getProduct(e.target.value) } }>
                                        {
                                            products.map((product, index) => {
                                                return(
                                                        <option value={product.name} key={index} >
                                                            {product.name}
                                                        </option>
                                                    
                                            )})
                                        }
                                    </Form.Select>
                                    <FloatingLabel
                                        style={{ width:'30%', Height: '100%'}}
                                        controlId="floatingInput"
                                        label="Quantity"
                                        size="lg" 
                                        onChange={(e)=> setQuantity(e.target.value) }
                                    >
                                        <Form.Control type="number" placeholder="quantity" onChange={(e)=> setQuantity(e.target.value) } value={quantity} />
                                    </FloatingLabel>
                                    <Button variant="success" onClick={AddProduct} style={{ width:'6vw' }}>Add</Button>
                            </div>
               
                {
                    productsToSell.length > 0 && ( 
                    <Table responsive="md" style={{ width:'70vw', textAlign:'left' }}>
                        <thead>
                            <tr>
                                <th style={{ width:'40vw' }}>Product</th>
                                <th style={{ width:'15vw' }}>Quantity</th>
                                <th style={{ width:'15vw' }}>Price</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productsToSell.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.totalPrice} DZD</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                        <tr>
                                        <th>Total</th>
                                        <td>{' '}</td>
                                        <th>{ TotalPrice } DZD</th>
                                    </tr>
                        </tfoot>
                    </Table>)
                }
        </div>
    </div>
  )
}
