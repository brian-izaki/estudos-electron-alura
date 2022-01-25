let linkFechar = document.querySelector('#link-fechar');
let linkGithub = document.querySelector('#link-github');
let spanVerElectron = document.querySelector('#versao-electron');

linkFechar.addEventListener('click', () => {
  console.log('fechando janella');
  window.janelas.fecharJanelaSobre();
})

linkGithub.addEventListener('click', () => {
  window.shell.abrirLink("https://github.com/brian-izaki")
  window.janelas.fecharJanelaSobre();
})

spanVerElectron.textContent = window.projectStatus.versions.electron