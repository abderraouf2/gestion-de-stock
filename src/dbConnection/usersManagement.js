import { ipcRenderer } from "electron-renderer";

export async function getUsers(setUsers) {
  ipcRenderer.send("fetchUsers");

  // Listen for a response from the main process
  ipcRenderer.on("Users", (event, result) => {
    setUsers(result);
  });
}

export async function DeleteUser(message) {
  ipcRenderer.send("deleteUser", message);
  // Listen for a response from the main process
  ipcRenderer.on("deletedUser", (event, result) => {});
}

export async function AddNewUser(message) {
  ipcRenderer.send("AddUser", message);

  // Listen for a response from the main process
  ipcRenderer.on("AddedUser", (event, result) => {
    event.preventDefault();
  });
}

export async function Edituser(message) {
  ipcRenderer.send("editUser", message);

  // Listen for a response from the main process
  ipcRenderer.on("editedUser", (event, result) => {
    event.preventDefault();
  });
}

export async function setLogin() {
  ipcRenderer.send("setLogin");
}

export async function Logout() {
  ipcRenderer.send("logout");
}

export async function checkLogin(setLogin) {
  ipcRenderer.send("checkLogin");

  // Listen for a response from the main process
  ipcRenderer.on("login", (event, result) => {
    // event.preventDefault();
    setLogin(result);
  });
}
