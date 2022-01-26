import timer from './timer.js';

let link = document.querySelector("#link-sobre");
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');

link.addEventListener('click', (e) => {
  window.janelas.abrirJanelaSobre()
})

let imgs = ['img/play-button.svg', 'img/stop-button.svg']
let isPlay = false;
botaoPlay.addEventListener('click', (e) => {
  if (isPlay) {
    timer.parar(curso)
    isPlay = false
  } else {
    timer.iniciar(tempo)
    isPlay = true
  }
  
  imgs = imgs.reverse();
  botaoPlay.src = imgs[0];
})