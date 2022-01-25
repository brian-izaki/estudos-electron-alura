const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  console.log('Aplicação iniciada! \\O/');

  let mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  })

  mainWindow.loadURL(`file://${__dirname}/src/index.html`)

})

app.on('window-all-closed', () => {
  app.quit();
})

console.log('\tserá mostrado antes do ready...\n')