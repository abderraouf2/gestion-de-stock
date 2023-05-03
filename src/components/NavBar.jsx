import React, { useState } from 'react'
import { NavDropdown } from 'react-bootstrap';
import { Logout } from '../dbConnection/usersManagement'; 
export default function NavBar(props) {
    const [outline, setOutline] = useState(true)
  return (
    <div style={{ width:'1920px', height:'8vh', backgroundColor:"#191D32", display:'flex', justifyContent:"space-between", padding:'1% 2%'  }} >
        <img src="" alt="SOFTIFY" />
        <div>
        <NavDropdown style={{ color:'white', outline: outline && 'none' }} onClick={() => setOutline(true) } title="username" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={()=> {Logout(); props.onChange()}}>
                sign out
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
        </div>
    </div>
  )
}
