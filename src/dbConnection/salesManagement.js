import { ipcRenderer } from "electron-renderer";

export async function addSalesBillInformations(message) {
  ipcRenderer.send("addSalesBillInformations", message);
  // Listen for a response from the main process
  ipcRenderer.on("addedSalesBillInformations", (event, result) => {
    event.preventDefault();
  });
}

export async function addProductsSold(message) {
  ipcRenderer.send("addProductsSold", message);
  // Listen for a response from the main process
  ipcRenderer.on("addedProductsSold", (event, result) => {
    event.preventDefault();
  });
}

export async function reduceQuantity(quantity, reference) {
    ipcRenderer.send(
      "reduceQuantity",
      `UPDATE products SET quantity = quantity - ${quantity} WHERE reference = "${reference}"`
    );
  
    // Listen for a response from the main process
    ipcRenderer.on("reducedQuantity", (event, result) => {
      console.log({ result });
      event.preventDefault();
    });
  }

  export async function getProductsSold(message, setBillProducts) {
    ipcRenderer.send("fetchProductsSold", message);
    // Listen for a response from the main process
    ipcRenderer.on("fetchedProductsSold", (event, result) => {
      setBillProducts(result);
      console.log({ result });
    });
  }

  export async function getSalesBills(setBills) {
    ipcRenderer.send("fetchSalesBills");
  
    // Listen for a response from the main process
    ipcRenderer.on("fetchedSalesBills", (event, result) => {
      setBills(result);
    });
  }