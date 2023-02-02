import React,{ useState } from 'react';
import { Table } from 'react-bootstrap';
import EditClient from './EditClient';
import clients from '../../data/clients'
import {ImBin} from 'react-icons/im';
import AddClient from './AddClient';
import ClientDetails from './ClientDetails';
import { FloatingLabel, Form } from 'react-bootstrap';


export default function ClientsComponent() {
    const [count, setCount] = useState(clients.length);
    const [search, setSearch] = useState('')
   const deleteClient = (id) => {
    var index = clients.findIndex(Client => Client.id === id); 
    clients.splice(index,1);
    setCount(count-1);
   }

  return (
    <div style={{ width:'80vw' }}>
        <div style={{ width:'80vw', textAlign:'right', height:'15vh', padding:'0%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <FloatingLabel
            controlId="floatingInput"
            label="search client"
        >
            <Form.Control type="text" placeholder="search" onChange={(e)=> setSearch(e.target.value)} />
        </FloatingLabel>
            <AddClient onChange={()=> setCount(count+1)} />
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
                    clients.filter(client => {return (client.name.toLowerCase().includes(search.toLowerCase()))}).map(client =>{
                        return(
                        <tr key={client.id}>
                        <td>{
                            client.name
                            }</td>
                        <td>{
                              client.email  
                            }</td>
                        <td > {
                                client.phone
                            } </td>
                        <td style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}} > 
                        <EditClient client={client} onChange={()=>setCount(count+1)} />
                        <div>
                            <ImBin onClick={()=>deleteClient(client.id)} color='red' style={{cursor:'pointer' }} />
                        </div>
                        <ClientDetails client={client} />
                        </td>
                      </tr>
                    )})
                }
            </tbody>
        </Table>
        
    </div>
  )
}
