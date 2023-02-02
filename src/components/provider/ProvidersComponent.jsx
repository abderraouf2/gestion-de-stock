import React,{ useState } from 'react';
import { Table } from 'react-bootstrap';
import Editprovider from './EditProvider';
import providers from '../../data/providers'
import {ImBin} from 'react-icons/im';
import AddProvider from './AddProvider';
import ProviderDetails from './ProviderDetails';
import { FloatingLabel, Form } from 'react-bootstrap';


export default function ProvidersComponent() {
    const [count, setCount] = useState(providers.length)
    const [search, setSearch] = useState('')
   const deleteprovider = (id) => {
    var index = providers.findIndex(provider => provider.id === id); 
    providers.splice(index,1);
    setCount(count-1);
   }

  return (
    <div style={{ width:'80vw' }}>
        <div style={{ width:'80vw', textAlign:'right', height:'15vh', padding:'0%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <FloatingLabel
            controlId="floatingInput"
            label="search provider"
        >
            <Form.Control type="text" placeholder="search" onChange={(e)=> setSearch(e.target.value)} />
        </FloatingLabel>
            <AddProvider onChange={()=> setCount(count+1)} />
        </div>
        <Table striped bordered hover width='80vw'>
            <thead>
                <tr>
                <th style={{width:'20vw'}}>Nom</th>
                <th style={{width:'25vw'}}>Email</th>
                <th style={{width:'25vw'}}>numero</th>
                <th style={{width:'5vw'}}>actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    providers.filter(provider => {return (provider.name.toLowerCase().includes(search.toLowerCase()))}).map(provider =>{
                        return(
                        <tr key={provider.id}>
                        <td>{
                            provider.name
                            }</td>
                        <td>{
                              provider.email  
                            }</td>
                        <td > {
                                provider.phone
                            } </td>
                        <td style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}} > 
                        <Editprovider provider={provider} onChange={()=>setCount(count+1)} />
                        <div>
                            <ImBin onClick={()=>deleteprovider(provider.id)} color='red' style={{cursor:'pointer' }} />
                        </div>
                        <ProviderDetails provider={provider} />
                        </td>
                      </tr>
                    )})
                }
            </tbody>
        </Table>
        
    </div>
  )
}
