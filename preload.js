const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('janelas', {
  abrirJanelaSobre: () => ipcRenderer.send('abrir-janela-sobre'),
  fecharJanelaSobre: () => ipcRenderer.send('fechar-janela-sobre')
})