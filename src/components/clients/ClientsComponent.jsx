import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import EditClient from "./EditClient";
import { ImBin } from "react-icons/im";
import AddClient from "./AddClient";
import ClientDetails from "./ClientDetails";
import { FloatingLabel, Form } from "react-bootstrap";
import { DeleteClient, getClients } from "../../dbConnection/clientsManagement";
export default function ClientsComponent() {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState("");
  const [count, setCount] = useState(clients.length);

  const deleteClient = (id) => {
    DeleteClient(`DELETE FROM clients WHERE id = ${id}`);
  };

  useEffect(() => {
    getClients(setClients);
  }, []);

  return (
    <div style={{ width: "90vw" }}>
      <div
        style={{
          width: "90vw",
          textAlign: "right",
          height: "15vh",
          padding: "0%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FloatingLabel controlId="floatingInput" label="search client">
          <Form.Control
            type="text"
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </FloatingLabel>
        <AddClient onChange={() => setCount(count + 1)} />
      </div>
      {clients.length > 0 ? (
        <div style={{ height:'650px', border:'2px solid black ' }}>
        <Table striped bordered hover width="80vw" >
          <thead>
            <tr>
              <th style={{ width: "20vw" }}>Nom</th>
              <th style={{ width: "25vw" }}>Email</th>
              <th style={{ width: "20vw" }}>numero</th>
              <th style={{ width: "5vw" }}>edit</th>
              <th style={{ width: "5vw" }}>delete</th>
              <th style={{ width: "10vw" }}>more info.</th>
            </tr>
          </thead>
          <tbody>
            {clients
              .filter((client) => {
                return client.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((client) => {
                return (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td> {client.phone} </td>
                    <td>
                      <EditClient
                        client={client}
                        onChange={() => setCount(count + 1)}
                      />
                    </td>
                    <td>
                      <ImBin
                        onClick={() => deleteClient(client.id)}
                        color="red"
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                    <td>
                      <ClientDetails client={client} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        </div>
      ) : (
        <h3>No clients yet</h3>
      )}
    </div>
  );
}
