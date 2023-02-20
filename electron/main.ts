import { app, BrowserWindow, Menu, PopupOptions, webContents } from 'electron';
import * as path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
let ipc = require('electron').ipcMain;
const util = require('util');
const fs = require('fs');
const copyFilePromise = util.promisify(fs.copyFile);

let fileSplitterCharacter = '-';
let arrayFromStringArchivos: any[] = [];
let sourceFolder = "";
let targetFolder = "";

function copyFiles(srcDir: any, destDir: any, files: any) {
  return Promise.all(files.map((f: any) => {
      return copyFilePromise(path.join(srcDir, f), path.join(destDir, f));
  }));
}

function isFile(pathItem: any) {
  return !!path.extname(pathItem);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    frame: false,
    show: false,
    webPreferences: {
      // contextIsolation: false,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.setResizable(false);

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL('http://localhost:3000/index.html');

    win.webContents.openDevTools();

    // Hot Reloading on 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname,
        '..',
        '..',
        'node_modules',
        '.bin',
        'electron' + (process.platform === "win32" ? ".cmd" : "")),
      forceHardReset: true,
      hardResetMethod: 'exit'
    });
  }

  return win;
}

function statusCheck() {
      if(!arrayFromStringArchivos || arrayFromStringArchivos.length === 0) return 'Ingrese el listado de archivos';
      if(!sourceFolder) return 'Seleccione la carpeta de origen';
      if(!targetFolder) return 'Seleccione la carpeta de destino';

      return 'Listo para comenzar';
}

app.whenReady().then(() => {
  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));


  let splash = new BrowserWindow({width: 400, height: 200, transparent: true, frame: false, alwaysOnTop: true});
  if (app.isPackaged) {
    splash.loadURL(`file://${__dirname}/../splash.html`);
  } else {
    splash.loadURL('http://localhost:3000/splash.html');
  }

  let win: any;

  win = createWindow();

  ipc.on('domLoaded',()=>{
    splash.destroy();
    win.show();
  })
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipc.on('openGitHub', () => {
    require("electron").shell.openExternal("https://github.com/gastonalt/");
  })

  ipc.on('setListaArchivos', (_event, value)=>{
    arrayFromStringArchivos = [];
    let auxArrayArchivos = [];
    auxArrayArchivos = value.split(" ");
    auxArrayArchivos.forEach((substring: string) => {
      let substringToNumber = substring.match(/(?:\d+\.)?\d+/g);
      if(substringToNumber) arrayFromStringArchivos.push(substringToNumber[substringToNumber.length-1]);
    });
    BrowserWindow.getFocusedWindow()?.webContents.send('getStatusBar', statusCheck());
  })

  ipc.on('setCaracterSeparador', (_event, value)=>{
    fileSplitterCharacter = value;
    BrowserWindow.getFocusedWindow()?.webContents.send('getStatusBar', statusCheck());
  })

  ipc.on('minimizeWindow', () => BrowserWindow.getFocusedWindow()?.minimize());

  //changeSourceFolder  changeTargetFolder

  ipc.on('changeSourceFolder',()=>{
    const {dialog} = require('electron');
    dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
      .then((data: any)=>{
        sourceFolder = data.filePaths[0];
        BrowserWindow.getFocusedWindow()?.webContents.send('sourcePathSelected', data.filePaths);
        BrowserWindow.getFocusedWindow()?.webContents.send('getStatusBar', statusCheck());
      });
  })
  
  ipc.on('changeTargetFolder',()=>{
    const {dialog} = require('electron');
    dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
      .then((data: any)=>{
        console.log(typeof data.filePaths)
        targetFolder = data.filePaths[0];
        BrowserWindow.getFocusedWindow()?.webContents.send('targetPathSelected', data.filePaths);
        BrowserWindow.getFocusedWindow()?.webContents.send('getStatusBar', statusCheck());
      });
  })

  ipc.on('comenzarCopiado',()=>{
    console.log('copiando')
    fs.readdir(sourceFolder, (err: any, files: any) => {

      let onlyFiles = files.filter((file: any) => isFile(file));

        let archivosACopiar: any[] = [];
        onlyFiles.map((file: any)=>{
            return arrayFromStringArchivos.reduce((acc: any, val: any)=> {
                //if(file.toLowerCase().includes(val.toLowerCase())) archivosACopiar.push(file);
                if(file.match(/(?:\d+\.)?\d+/g)[0] === val) archivosACopiar.push(file);
                return archivosACopiar;
            })
        });
        
        BrowserWindow.getFocusedWindow()?.webContents.send('getStatusBar', 'Copiando ' + archivosACopiar.length + ' archivos.');

        copyFiles(sourceFolder, targetFolder, archivosACopiar).then(() => {
            BrowserWindow.getFocusedWindow()?.webContents.send('getStatusBar', 'Archivos copiados exitosamente.');
        }).catch(err => {
            console.log(err);
        });
    });
  })

  ipc.on('closeWindow', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  ipc.on('setSourcePathSelectedManually', (_event, value)=>{
    sourceFolder = value;
    BrowserWindow.getFocusedWindow()?.webContents.send('getStatusBar', statusCheck());
  })

  ipc.on('setTargetPathSelectedManually', (_event, value)=>{
    targetFolder = value;
    BrowserWindow.getFocusedWindow()?.webContents.send('getStatusBar', statusCheck());
  })
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});
