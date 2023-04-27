import { ipcRenderer } from "electron-renderer";

export async function getClients(setClients) {
  ipcRenderer.send("fetchClients");

  // Listen for a response from the main process
  ipcRenderer.on("clients", (event, result) => {
    setClients(result);
  });
}

export async function DeleteClient(message) {
  ipcRenderer.send("deleteClient", message);
  // Listen for a response from the main process
  ipcRenderer.on("deletedClient", (event, result) => {
    console.log("deletedClient: ", result);
  });
}

export async function Editclient(message) {
  ipcRenderer.send("editClient", message);

  // Listen for a response from the main process
  ipcRenderer.on("editedClient", (event, result) => {
    event.preventDefault();
    console.log("editedClient: ", result);
  });
}

export async function Addclient(message) {
    ipcRenderer.send("AddClient", message);

    // Listen for a response from the main process
    ipcRenderer.on("AddedClient", (event, result) => {
      event.preventDefault();
      console.log("AddedClient: ", result);
    });
  }
