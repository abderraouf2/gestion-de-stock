import React, { useState, useEffect } from 'react'
import clients from '../data/clients';
import providers from '../data/providers';
import products from '../data/products';
// import { remote } from 'electron'
// import sendAsync from '../dbConnection/renderer'


export default function Dashboard() {

    
//     const fs = remote.require('fs');
//     const { process } = remote.process;
// //database related
//   const [message, setMessage] = useState('hello world');
//   const [responses, setResponses] = useState([]);
//   function send(data) {
//     sendAsync(data).then((result) => setResponses([...responses, result]));
// }

// const [fileData, setFileData] = useState('');

// useEffect(() => {
//   fs.readFile('example.txt', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     setFileData(data);
//   });
// }, []);


    let [clientsCounter, setClientsCounter] = useState(0);
    let [providersCounter, setProvidersCounter] = useState(0);
    let [productsCounter, setProductsCounter] = useState(0)
    let timer1;
    let timer2;
    let timer3;
    useEffect(() => {
        clearInterval(timer1)
        timer1 = setInterval(() => {
            if (clientsCounter === clients.length) {
                clearInterval(timer1)
                return
            }
            setClientsCounter(prev => prev+1)
            clientsCounter++
            
        },100)
  
        return () => clearInterval(timer1)
    }, [clientsCounter])

    useEffect(() => {
        clearInterval(timer2)
        timer2 = setInterval(() => {
            if (providersCounter === providers.length) {
                clearInterval(timer2)
                return
            }
            setProvidersCounter(prev => prev+1)
            providersCounter++
            
        },100)
  
        return () => clearInterval(timer2)
    }, [providersCounter])
    useEffect(() => {
        clearInterval(timer3)
        timer3 = setInterval(() => {
            if (productsCounter === products.length) {
                clearInterval(timer3)
                return
            }
            setProductsCounter(prev => prev+1)
            productsCounter++
            
        },100)
  
        return () => clearInterval(timer3)
    }, [productsCounter])

  return (
    <div style={{ height:'100vh', padding:'8%', display:'flex' }}>
        <div style={{ width:'70vw', height:'30vh', display:'flex', flexDirection:'row', justifyContent:'space-around' }} > 
            <div> 
                <h3>Clients: </h3>
                <h1> {clientsCounter} </h1>
            </div>
            <div> 
                <h3>Providers: </h3>
                <h1> {providersCounter} </h1>
            </div>
            <div> 
                <h3>Products: </h3>
                <h1> {productsCounter} </h1>
            </div>
        </div>
        {/* <button type="button" onClick={() => send(message)}>
                    Send
                </button> */}
    </div>
  )
}
