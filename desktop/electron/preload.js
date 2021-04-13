const { ipcRenderer, contextBridge } = require('electron')
const validChannels = ["toMain", "myRenderChannel", 'messege'];
contextBridge.exposeInMainWorld(
  "api", {
  send: (channel, data) => {
    // if (validChannels.includes(channel)) {
    ipcRenderer.send(channel, data);
    // }
  },
  on: (channel, callback) => {
    // if (validChannels.includes(channel)) {
    // Filtering the event param from ipcRenderer
    // const newCallback = (_, data) => callback(data);
    ipcRenderer.on(channel, callback);
    // }
  },
  once: (channel, callback) => {
    if (validChannels.includes(channel)) {
      const newCallback = (_, data) => callback(data);
      ipcRenderer.once(channel, newCallback);
    }
  },
  removeListener: (channel, callback) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.removeListener(channel, callback);
    }
  },
  removeAllListeners: (channel) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.removeAllListeners(channel)
    }
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(event, ...args))
  },
}
);

console.log('PRELOAD START');