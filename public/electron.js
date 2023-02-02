
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const sqlite3 = require('sqlite3').verbose();

const {
  FETCH_TEXT,
  FETCH_IMAGE,
  FETCH_VIDEO,
  FETCH_AUDIO,
  SAVE_TEXT,
  HANDLE_SAVE,
  HANDLE_FETCH,
} = require('./utils/constants')

const isDev = require('electron-is-dev');
// require('../src/dbConnection/main')
let win;
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      // webSecurity: false
      contextIsolation: false
    },
  });

  // and load the index.html of the app.
  // win.loadFile("./index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

ipcMain.on(FETCH_TEXT, ()=> {
  //grab text
  win.send(HANDLE_FETCH, {
    success:true,
    message: 'text returned successfully',
    text:'fooBar'
  })
})
ipcMain.on(SAVE_TEXT, (event, arg)=> {
  //save text
  win.send(HANDLE_SAVE, {
    success:true,
    message: 'saved',
    text:arg,
  })
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

