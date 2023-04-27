import { ipcRenderer } from "electron-renderer";

export async function addBillInformations(message) {
  ipcRenderer.send("addBillInformations", message);
  // Listen for a response from the main process
  ipcRenderer.on("addedBillInformations", (event, result) => {
    event.preventDefault();
    console.log("addedBillInformations: ", result);
  });
}

export async function getBills(setBills) {
  ipcRenderer.send("fetchBills");

  // Listen for a response from the main process
  ipcRenderer.on("Bills", (event, result) => {
    setBills(result);
  });
}

export async function addProductsTopurchase(message) {
  ipcRenderer.send("addProductsTopurchase", message);
  // Listen for a response from the main process
  ipcRenderer.on("productAdded", (event, result) => {
    event.preventDefault();
    console.log("productAdded: ", result);
  });
}

export async function getProductsPurchased(message, setBillProducts) {
  ipcRenderer.send("getProductsPurchased", message);
  // Listen for a response from the main process
  ipcRenderer.on("productsPurchased", (event, result) => {
    setBillProducts(result);
    console.log({ result });
  });
}


