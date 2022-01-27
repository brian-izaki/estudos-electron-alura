const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');

const path = require('path');
const data = require('./data');
const template = require('./template');

let mainWindow = null;

let tray = null;
app.on('ready', () => {
  console.log('Aplicação iniciada! \\O/');

  mainWindow = new BrowserWindow({
    width: 800,
    height: 420,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  tray = new Tray(`${__dirname}/src/img/icon-tray.png`);
  const templateGenerator = template.geraTrayTemplate(mainWindow);
  let trayMenu = Menu.buildFromTemplate(templateGenerator)
  tray.setContextMenu(trayMenu);

  let templateMenu = [
    {
      label: 'Meu menu',
      submenu: [
        { label: 'item 1', },
        { label: 'item 2' },
        { label: 'item 3' },
      ]
    }
  ]
  if (process.platform === 'darwin') {
    templateMenu.unshift({
      label: app.getName(),
      submenu: [
        { label: 'item 1' }
      ]
    })
  }
  const menuPrincipal = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menuPrincipal)

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

ipcMain.on('curso-adicionado', (e, curso) => {
  let novoTemplate = template.adicionaCursoTray(mainWindow, curso);
  let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
  tray.setContextMenu(novoTrayMenu);

})

console.log('\tserá mostrado antes do ready...\n')