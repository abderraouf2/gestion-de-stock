import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Editprovider from "../components/provider/EditProvider";
import { ImBin } from "react-icons/im";
import AddProvider from "../components/provider/AddProvider";
import ProviderDetails from "../components/provider/ProviderDetails";
import { FloatingLabel, Form } from "react-bootstrap";
import {
  getProviders,
  DeleteProvider,
} from "../dbConnection/providersManagement";
export default function ProvidersComponent() {
  const [providers, setProviders] = useState("");
  const [search, setSearch] = useState("");

  const deleteprovider = (id) => {
    DeleteProvider(`DELETE FROM providers WHERE id = ${id}`);
  };

  useEffect(() => {
    getProviders(setProviders);
  }, []);

  const [count, setCount] = useState(providers.length);

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
        <FloatingLabel controlId="floatingInput" label="search provider">
          <Form.Control
            type="text"
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </FloatingLabel>
        <AddProvider onChange={() => setCount(count + 1)} />
      </div>
      {providers.length > 0 ? (
        <div style={{ height: "650px", border: "2px solid black " }}>
          <Table striped bordered hover width="80vw">
            <thead>
              <tr>
                <th style={{ width: "20vw" }}>Nom</th>
                <th style={{ width: "20vw" }}>NIF</th>
                <th style={{ width: "20vw" }}>NIS</th>
                <th style={{ width: "20vw" }}>numero</th>
                <th style={{ width: "5vw" }}>edit</th>
                <th style={{ width: "5vw" }}>delete</th>
                <th style={{ width: "10vw" }}>more info.</th>
              </tr>
            </thead>
            <tbody>
              {providers
                .filter((provider) => {
                  return provider.name
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .map((provider) => {
                  return (
                    <tr key={provider.id}>
                      <td>{provider.name}</td>
                      <td>{provider.nif}</td>
                      <td>{provider.nis}</td>
                      <td> {provider.phone} </td>
                      <td>
                        <Editprovider
                          provider={provider}
                          onChange={() => setCount(count + 1)}
                        />
                      </td>
                      <td>
                        <ImBin
                          onClick={() => deleteprovider(provider.id)}
                          color="red"
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                      <td>
                        <ProviderDetails provider={provider} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      ) : (
        <h3>No providers yet</h3>
      )}
    </div>
  );
}
