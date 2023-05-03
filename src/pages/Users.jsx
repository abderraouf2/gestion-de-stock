import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import EditUser from "../components/users/EditUser";
import { ImBin } from "react-icons/im";
import AddUser from "../components/users/AddUser";
import UserDetails from "../components/users/userDetails";
import { FloatingLabel, Form } from "react-bootstrap";
import {
  getUsers,
  DeleteUser,
} from "../dbConnection/usersManagement";
export default function Users() {
  const [users, setUsers] = useState("");
  const [search, setSearch] = useState("");

  const deleteuser = (id) => {
    DeleteUser(`DELETE FROM users WHERE id = ${id}`);
  };

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  const [count, setCount] = useState(users.length);

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
        <FloatingLabel controlId="floatingInput" label="search user">
          <Form.Control
            type="text"
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </FloatingLabel>
        <AddUser onChange={() => setCount(count + 1)} />
      </div>
      {users.length > 0 ? (
        <div style={{ height: "650px", border: "2px solid black " }}>
          <Table striped bordered hover width="80vw">
            <thead>
              <tr>
                <th style={{ width: "20vw" }}>username</th>
                <th style={{ width: "20vw" }}>password</th>
                <th style={{ width: "20vw" }}>role</th>
                <th style={{ width: "5vw" }}>edit</th>
                <th style={{ width: "5vw" }}>delete</th>
                <th style={{ width: "10vw" }}>more info.</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => {
                  return user.username
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.password}</td>
                      <td>{user.role}</td>
                      <td>
                        <EditUser
                          user={user}
                          onChange={() => setCount(count + 1)}
                        />
                      </td>
                      <td>
                        <ImBin
                          onClick={() => deleteuser(user.id)}
                          color="red"
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                      <td>
                        <UserDetails user={user} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      ) : (
        <h3>No users yet</h3>
      )}
    </div>
  );
}
