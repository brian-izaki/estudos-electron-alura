import timer from './timer.js';
//const {ipcRenderer} = require('electron');

let link = document.querySelector("#link-sobre");
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');

let botaoAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');

window.onload = () => {
  carregaCurso()
}

window.mainEvents.onTray.selectedCourse(((message) => {
  curso.textContent = message.curso;
  carregaCurso()
}))

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

botaoAdicionar.addEventListener('click', () => {
  let novoCurso = campoAdicionar.value.trim();
  campoAdicionar.value = '';

  curso.textContent = novoCurso;
  tempo.textContent = '00:00:00';

  window.data.cursoAdicionado(novoCurso);
})

async function carregaCurso () {
  try {
    const tempoJson = await window.data.getDadosCurso(curso.textContent);
    
    tempo.textContent = tempoJson.tempoEstudo || '00:00:00';
  } catch (err) {
    console.error(err)
  }
}