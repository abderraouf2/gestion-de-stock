import React,{ useState, useRef } from 'react';
import { Button, Table } from 'react-bootstrap';
import EditProduct from './EditProduct';
import products from '../../data/products'
import {ImBin} from 'react-icons/im';
import Addproduct from './AddProduct';
import ProductDetails from './ProductDetails';
import { FloatingLabel, Form } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import { AiOutlinePrinter } from 'react-icons/ai'
import '../styleComponent.css'


export default function ProductsComponent(props) {
    const [count, setCount] = useState(products.length)
    const [search, setSearch] = useState('')
   const deleteproduct = (id) => {
    var index = products.findIndex(product => product.id === id); 
    products.splice(index,1);
    setCount(count-1);
    props.onChange()
   }
   const componentRef = useRef();
  return (
    <div style={{ width:'80vw' }}>
        <div style={{ width:'80vw', textAlign:'right', height:'15vh', padding:'0%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <FloatingLabel
            controlId="floatingInput"
            label="search product"
            className='focusInput'
        >
            <Form.Control type="text" placeholder="search" onChange={(e)=> setSearch(e.target.value)} className='focusInput' />
        </FloatingLabel>
            <div style={{ width:'16vw', textAlign:'right', height:'15vh', padding:'0%', display:'flex',flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                <Addproduct onChange={()=> setCount(count+1)} />
                <ReactToPrint
                trigger={() => <Button variant="danger" >
                    <AiOutlinePrinter size={30} />
                    Print</Button> }
                content={() => componentRef.current}
                />
            </div>
        </div>
        <Table striped bordered hover width='80vw' ref={componentRef} >
            <thead>
                <tr>
                <th style={{width:'20vw'}}>Nom</th>
                <th style={{width:'25vw'}}>Price</th>
                <th style={{width:'25vw'}}>Quantity</th>
                <th style={{width:'5vw'}}>actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.filter(product => {return (product.reference.toLowerCase().includes(search.toLowerCase()))}).map(product =>{
                        return(
                        <tr key={product.id}>
                            <td >{
                                product.name
                                }</td>
                            <td>{
                                product.price  
                                }</td>
                            <td > {
                                    product.quantity
                                } </td>
                            <td style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}} > 
                            <EditProduct product={product} onChange={()=>setCount(count+1)} />
                            <div  key={product.id}>
                                <ImBin onClick={()=>deleteproduct(product.id)} color='red' style={{cursor:'pointer' }} />
                            </div>
                            <ProductDetails product={product} />
                            </td>
                      </tr>
                    )})
                }
            </tbody>
        </Table>
    </div>
  )
}
