const electron = require('electron');
const isDev = require('electron-is-dev');
ipc = electron.ipcMain;

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    nodeIntegration: false,
    contextIsolation: false, // protect against prototype pollution
    enableRemoteModule: false, // turn off remote
    sandbox: false,
    webPreferences: {
      preload: path.join(app.getAppPath(), '/electron/preload.js')
    }
  });

  let home_page_path = 'file://' + path.join(__dirname, '../index.html')
  if (isDev) {
    console.log('is dev');
    console.log(home_page_path);
    console.log(path.join(app.getAppPath(), '/electron/preload.js'));
    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('test', 'This is a test');

    })
  } else {
    console.log('not dev', home_page_path);
    // 'build/index.html'
    console.log(home_page_path);
    mainWindow.loadURL(home_page_path);
  }


  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  mainWindow.webContents.send('m1', 'from main');
  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  let win = createWindow();
  win.webContents.send('messege', { 'source': 'From Main' });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    //
    // See the following item for considerations regarding what
    // URLs should be allowed through to shell.openExternal.
    if (isSafeForExternalOpen(url)) {
      setImmediate(() => {
        shell.openExternal(url)
      })
    }

    return { action: 'deny' }
  });

  contents.on('will-navigate', (event, navigationUrl) => {
    event.preventDefault()
  });

  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('localhost')) {
      event.preventDefault()
    }
  });

});

ipc.on('messege:request', (event, args) => {
  console.log(args);
  event.sender.send('messege:response', 'test');
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

