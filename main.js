const { app, BrowserWindow, ipcMain, Tray, Menu} = require('electron');

const path = require('path');
const data = require('./data');

let tray = null;
const buildTray = () => {
  tray = new Tray(`${__dirname}/src/img/icon-tray.png`);
  const trayMenu = Menu.buildFromTemplate([
    {label: 'Cursos', type: 'normal'},
    {label: 'aaa', type: 'separator'},
    {label: 'Teste', type: 'radio'},
    {label: 'Ola mundo', type: 'radio'},
  ])

  tray.setContextMenu(trayMenu);
}

app.on('ready', () => {
  console.log('Aplicação iniciada! \\O/');

  let mainWindow = new BrowserWindow({
    width: 800,
    height: 420,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  buildTray();

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

ipcMain.on('curso-parado', (e, curso, tempoEstudado) => {
  data.salvaDados(curso, tempoEstudado);
})

console.log('\tserá mostrado antes do ready...\n')