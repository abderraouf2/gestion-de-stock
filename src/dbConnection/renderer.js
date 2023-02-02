
// const electron = require('electron');
// const { ipcRenderer } = electron;


// var  process;

// if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
//   const { remote } = window.require('electron');
//   process = remote.process;
// } else {
//   process = require('process');
// }

// const path = require('path');


// export default function send(sql) {
//     return new Promise((resolve) => {
//         ipcRenderer.once('asynchronous-reply', (_, arg) => {
//             resolve(arg);
//         });
//         ipcRenderer.send('asynchronous-message', sql);
//     });
// }
