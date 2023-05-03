const { ipcMain } = require("electron");
const sqlite3 = require("sqlite3");
const { session } = require("electron");
// const electronCookies = require("electron-cookies");

const Store = require('electron-store');

const store = new Store();


store.set('login', false);

const database = new sqlite3.Database("./public/stockage.db", (err) => {
  if (err) console.error("Database opening error: ", err);
});

// electronCookies.enable({
//   sessionObject: session.defaultSession
// })

ipcMain.on("setLogin", (event, arg) => {
  store.set('login', true);

});


ipcMain.on("logout", (event, arg) => {
  store.set('login', false);

});

ipcMain.on("checkLogin", (event, arg) => {
  
  login = store.get('login');

  event.sender.send("login",login);
});

ipcMain.on("fetchProviders", (event) => {
  // Fetch data from the database
  database.all("SELECT * FROM providers", (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("providers", rows);
  });
});

ipcMain.on("deleteProvider", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("deletedProvider", rows);
  });
});

ipcMain.on("AddProvider", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("AddedProvider", rows);
  });
});

ipcMain.on("editProvider", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("editedProvider", rows);
  });
});

ipcMain.on("fetchClients", (event) => {
  // Fetch data from the database
  database.all("SELECT * FROM clients", (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("clients", rows);
  });
});

ipcMain.on("deleteClient", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("deletedClient", rows);
  });
});

ipcMain.on("AddClient", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("AddedClient", rows);
  });
});

ipcMain.on("editClient", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("editedClient", rows);
  });
});

ipcMain.on("fetchProducts", (event) => {
  // Fetch data from the database
  database.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("products", rows);
  });
});

ipcMain.on("fetchCategories", (event) => {
  // Fetch data from the database
  database.all("SELECT * FROM categories", (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("categories", rows);
  });
});

ipcMain.on("addNewProduct", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("productAdded", rows);
  });
});


ipcMain.on("addNewCategory", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("categoryAdded", rows);
  });
});

ipcMain.on("updateProductQuantity", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("quantityUpdated", rows);
  });
});

ipcMain.on("addBillInformations", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error({ err });

      return;
    }
    // Send the data to the renderer process
    event.sender.send("addedBillInformations", rows);
  });
});

ipcMain.on("fetchBills", (event) => {
  // Fetch data from the database
  database.all("SELECT * FROM bills", (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("Bills", rows);
  });
});

ipcMain.on("addProductsTopurchase", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error({ err });

      return;
    }
    // Send the data to the renderer process
    event.sender.send("productAdded", rows);
  });
});

ipcMain.on("getProductsPurchased", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error({ err });

      return;
    }
    // Send the data to the renderer process
    event.sender.send("productsPurchased", rows);
  });
});

ipcMain.on("addSalesBillInformations", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error({ err });

      return;
    }
    // Send the data to the renderer process
    event.sender.send("addedSalesBillInformations", rows);
  });
});

ipcMain.on("addProductsSold", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error({ err });

      return;
    }
    // Send the data to the renderer process
    event.sender.send("addedProductsSold", rows);
  });
});

ipcMain.on("reduceQuantity", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error({ err });

      return;
    }
    // Send the data to the renderer process
    event.sender.send("reducedQuantity", rows);
  });
});

ipcMain.on("fetchSalesBills", (event) => {
  // Fetch data from the database
  database.all("SELECT * FROM salesBills", (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("fetchedSalesBills", rows);
  });
});

ipcMain.on("fetchProductsSold", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error({ err });

      return;
    }
    // Send the data to the renderer process
    event.sender.send("fetchedProductsSold", rows);
  });
});

ipcMain.on("fetchUsers", (event) => {
  // Fetch data from the database
  database.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("Users", rows);
  });
});

ipcMain.on("deleteUser", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("deletedUser", rows);
  });
});

ipcMain.on("AddUser", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("AddedUser", rows);
  });
});

ipcMain.on("editUser", (event, arg) => {
  // Fetch data from the database
  let sql = arg;
  database.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    // Send the data to the renderer process
    event.sender.send("editedUser", rows);
  });
});
