const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path')

app.on('ready', () => {
  console.log('Aplicação iniciada! \\O/');

  let mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadURL(`file://${__dirname}/src/index.html`)

})

app.on('window-all-closed', () => {
  app.quit();
})

let sobreWindow = null
ipcMain.on('abrir-janela-sobre', () => {
  if (sobreWindow === null) {
    sobreWindow = new BrowserWindow({
      width: 300,
      height: 230,
      alwaysOnTop: true,
      frame: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });

    sobreWindow.on('closed', () => {
      sobreWindow = null
    })
  }

  sobreWindow.loadURL(`file://${__dirname}/src/sobre.html`);
})

ipcMain.on('fechar-janela-sobre', () => {
  sobreWindow.close();
})

console.log('\tserá mostrado antes do ready...\n')