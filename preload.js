const { contextBridge, ipcRenderer } = require('electron')
const { shell } = require('electron/common')
const process = require('process')
const data = require('./data')

contextBridge.exposeInMainWorld('janelas', {
  abrirJanelaSobre: () => ipcRenderer.send('abrir-janela-sobre'),
  fecharJanelaSobre: () => ipcRenderer.send('fechar-janela-sobre')
})

contextBridge.exposeInMainWorld('shell', {
  abrirLink: (link = '') => shell.openExternal(link)
})

contextBridge.exposeInMainWorld('projectStatus', {
  versions: process.versions
})

contextBridge.exposeInMainWorld('savingTimer', {
  stopCourse: (curso, tempoEstudado) => ipcRenderer.send('curso-parado', curso, tempoEstudado)
})

contextBridge.exposeInMainWorld('data', {
  getDadosCurso: (curso) => data.pegaDados(curso),
  cursoAdicionado: (curso) => ipcRenderer.send('curso-adicionado', curso),
})

contextBridge.exposeInMainWorld('mainEvents', {
  onTray: {
    selectedCourse: (callback) => ipcRenderer.on('tray-selected', (event, message) => {
      callback(message)
    })
  }
})

contextBridge.exposeInMainWorld('shortcuts', {
  stopPlayTimer: (callback) => ipcRenderer.on('atalho-iniciar-parar', (event) => {
    callback();
  })
})