import { ipcRenderer } from "electron-renderer";

export async function getProviders(setProviders) {
  ipcRenderer.send("fetchProviders");

  // Listen for a response from the main process
  ipcRenderer.on("providers", (event, result) => {
    setProviders(result);
  });
}

export async function DeleteProvider(message) {
  ipcRenderer.send("deleteProvider", message);
  // Listen for a response from the main process
  ipcRenderer.on("deletedProvider", (event, result) => {
    console.log("deletedProvider: ", result);
  });
}

export async function AddNewProvider(message) {
  ipcRenderer.send("AddProvider", message);

  // Listen for a response from the main process
  ipcRenderer.on("AddedProvider", (event, result) => {
    event.preventDefault();
    console.log("AddedProvider: ", result);
  });
}

export async function EditProvider(message) {
  ipcRenderer.send("editProvider", message);

  // Listen for a response from the main process
  ipcRenderer.on("editedProvider", (event, result) => {
    event.preventDefault();
  });
}
