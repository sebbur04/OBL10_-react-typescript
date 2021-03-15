/**
 * Starts the desktop application through the electron framework.
 * This file is not part of the curriculum, and does not need to be altered.
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');
const chokidar = require('chokidar');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, contextIsolation: false, enableRemoteModule: true },
  });

  // Open Development Tools
  mainWindow.openDevTools();

  mainWindow.loadFile('public/index.html');
});

app.on('window-all-closed', () => {
  app.quit();
});

// Reload application on changes in src folder
const watcher = chokidar.watch(path.join(__dirname, 'src'), { ignored: /^.*\.(json|txt)$/ });
watcher.on('change', () => {
  if (mainWindow) mainWindow.webContents.reloadIgnoringCache();
});

// To prevent crash on exit in MacOS
app.on('will-quit', () => {
  watcher.close();
});
