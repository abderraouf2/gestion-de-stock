// import { Database } from 'sqlite3';
// const { ipcMain } = window.require('electron');

// const database = new Database('../../public/stockage.db', (err) => {
//     if (err) console.error('Database opening error: ', err);
// });

// ipcMain.on('asynchronous-message', (event, arg) => {
//     const sql = arg;
//     database.all(sql, (err, rows) => {
//         event.reply('asynchronous-reply', (err && err.message) || rows);
//     });
// });
// ipcMain.on('asynchronous-message', (event, arg) => {
//     console.log(arg); // prints "ping"
//     if (arg === 'ping') event.reply('asynchronous-reply', 'pong!');
//     else event.reply('asynchronous-reply', 'please, send me ping.');
// }); 