const { contextBridge, ipcRenderer } = require('electron')
const { shell } = require('electron/common')
const process = require('process')

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