import { ipcRenderer } from "electron-renderer";

export async function getProducts(setProducts) {
  ipcRenderer.send("fetchProducts");

  // Listen for a response from the main process
  ipcRenderer.on("products", (event, result) => {
    setProducts(result);
  });
}

export async function getCategories(setCategories) {
  ipcRenderer.send("fetchCategories");

  // Listen for a response from the main process
  ipcRenderer.on("categories", (event, result) => {
    setCategories(result);
  });
}

export async function addNewCategory(category) {
  ipcRenderer.send(
    "addNewCategory",
    `INSERT INTO categories (name) VALUES ('${category}' );`
  );

  // Listen for a response from the main process
  ipcRenderer.on("categoryAdded", (event, result) => {
    // event.preventDefault();
    console.log(result);
    return result;
  });
}

export async function addNewProduct(product) {
  ipcRenderer.send(
    "addNewProduct",
    `INSERT INTO products (reference, category, name, description, price, sellprice, quantity, tax)
    VALUES ('${product.reference}', '${product.name}', '${product.category}', '${product.description}', ${product.unitPrice}, ${product.sellPrice}, ${product.quantity}, ${product.tax} );`
  );

  // Listen for a response from the main process
  ipcRenderer.on("productAdded", (event, result) => {
    // event.preventDefault();
    console.log(result);
    return result;
  });
}

export async function updateQuantity(quantity, reference) {
  ipcRenderer.send(
    "updateProductQuantity",  
    `UPDATE products SET quantity = quantity + ${quantity} WHERE reference = "${reference}"`
  );

  // Listen for a response from the main process
  ipcRenderer.on("quantityUpdated", (event, result) => {
    console.log({ result });
    event.preventDefault();
  });
}
