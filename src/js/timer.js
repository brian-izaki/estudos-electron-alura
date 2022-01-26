import { Duration } from './libs/luxon.min.js';

let _segundos = 0;
let tempo;
let interval;

const timer = {
  iniciar(el) {
    tempo = Duration.fromISOTime(el.textContent)
    _segundos = tempo.seconds;

    interval = setInterval(() => {
      _segundos++;

      el.textContent = this.segundosParaTempo(_segundos);
    }, 1000)
  },

  segundosParaTempo(segundos) {
    return Duration.fromObject({ seconds: segundos }).toFormat('hh:mm:ss')
  },

  parar(cursoEl) {
    clearInterval(interval);
    let tempoEstudado = this.segundosParaTempo(_segundos);

    window.savingTimer.stopCourse(cursoEl.textContent, tempoEstudado);
  }
}

export default timer;
