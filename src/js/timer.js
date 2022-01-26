import { Duration } from './libs/luxon.min.js';

let _segundos = 0;
let interval;

const timer = {
  iniciar(el) {
    let tempo = Duration.fromISOTime(el.textContent)
    _segundos = tempo.seconds;

    interval = setInterval(() => {
      _segundos++;

      el.textContent = this.segundosParaTempo(_segundos);
    }, 1000)
  },

  segundosParaTempo(segundos) {
    return Duration.fromObject({ seconds: segundos }).toFormat('hh:mm:ss')
  },

  parar(el) {
    clearInterval(interval);
    _segundos = 0;
    el.textContent = Duration.fromObject({ hours: 0, minutes: 0, seconds: 0 }).toFormat('hh:mm:ss')
  }
}

export default timer;