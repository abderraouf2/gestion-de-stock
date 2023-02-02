import React, { useState, useEffect } from 'react';
import { Form, Table, FloatingLabel, Button } from 'react-bootstrap';
import providers from '../../data/providers';
import products from '../../data/products';

export default function Buying() {

    const [product, setProduct] = useState({});
    const [productsToBuy, setProductsToBuy] = useState([])
    const [quantity, setQuantity] = useState('');
    const [tax, setTax] = useState(false);
    const [taxValue, setTaxValue] = useState(0);
    const [taxPrice, setTaxPrice] = useState(0)
    const [total, setTotal] = useState(0);
    const [counter, setCounter] = useState(productsToBuy.length);
    const [TotalPrice, setTotalPrice] = useState(0)
    const AddProduct = () => {
        const exists = productsToBuy.filter(productToSell=> productToSell.id === product.id)
        if (product !== '' && quantity && exists.length==0 ) {
            setProductsToBuy([...productsToBuy, {
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
    useEffect( () => {
         productsToBuy.map((product)=> { setTotalPrice(TotalPrice + product.totalPrice) })
        
    }, [productsToBuy])
    useEffect(() => {
        setTaxPrice(taxValue*TotalPrice/100);
        setTotal(TotalPrice+taxPrice);
    })

  return (
    <div style={{ display:'flex', justifyContent:'center', marginTop:'10vh' }}>
        <div style={{ width:'70vw' }}>
            <Form.Select size="lg" onChange={(e) => console.log(e.target.value) } style={{ marginBottom:'2vh' }} >
                {
                    providers.map(provider => (
                        <option key={provider.id} value={provider.name}>{provider.name}</option>
                    ))
                }
            </Form.Select>
            <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:'0vh' }} >
                <Form.Select size="lg" style={{ width:'60%' }}  onChange={(e) => { getProduct(e.target.value) } }>
                    {
                        products.map((product, index) => {
                            return(
                                <option value={product.name} key={index} >
                                    {product.name} | Ref:  {product.reference}
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
                    value={quantity}
                    >
                        <Form.Control type="number" placeholder="quantity" onChange={(e)=> setQuantity(e.target.value) } value={quantity}  />
                </FloatingLabel>
                <Button variant="success" onClick={AddProduct} style={{ width:'6vw' }}>Add</Button>
            </div>
            <div style={{ height:'8vh',display:'flex', flexDirection:'row', justifyContent:'flex-start',alignItems:'center' }} >
                <Form.Check 
                    style={{  marginRight:'5vw'}}
                    type="switch"
                    id="custom-switch"
                    label="include tax"
                    defaultValue={false}
                    onChange={()=> {setTax(!tax); setTaxValue(0) }}
                />
              { tax &&  <FloatingLabel
                    style={{ width:'30%', Height: '100%'}}
                    controlId="floatingInput"
                    label="Tax amount"
                    size="lg" 
                    onChange={(e)=> {setTaxValue(e.target.value)} }
                    >
                        <Form.Control type="number" placeholder="tax"  />
                </FloatingLabel>}
            </div>
                {
                    productsToBuy.length > 0 && ( 
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
                                productsToBuy.map(product => (
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
                                <th>Before Tax</th>
                                <td>{' '}</td>
                                <th>{ TotalPrice } DZD</th>
                            </tr>
                            { tax && <><tr>
                                  <th>Tax</th>
                                  <td>{' '}</td>
                                  <th>{taxPrice} DZD</th>
                              </tr><tr>
                                      <th>Total</th>
                                      <td>{' '}</td>
                                      <th>{total} DZD</th>
                                  </tr></>}
                        </tfoot>
                    </Table>)
                }
        </div>
    </div>
  )
}
