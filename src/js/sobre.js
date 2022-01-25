let linkFechar = document.querySelector('#link-fechar');

linkFechar.addEventListener('click', () => {
  console.log('fechando janella');
  window.janelas.fecharJanelaSobre();
})