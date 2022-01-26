import timer from './timer.js';

let link = document.querySelector("#link-sobre");
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');

link.addEventListener('click', (e) => {
  window.janelas.abrirJanelaSobre()
})

let imgs = ['img/play-button.svg', 'img/stop-button.svg']
botaoPlay.addEventListener('click', (e) => {
  if (imgs[0].includes('play')) 
    timer.iniciar(tempo)
  else
    timer.parar(tempo)

  imgs = imgs.reverse();
  botaoPlay.src = imgs[0];
})