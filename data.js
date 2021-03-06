const jsonFile = require('jsonfile-promised')
const { existsSync, readdirSync } = require('fs')
const path = require('path')

module.exports = {
  async salvaDados(curso, tempoEstudado) {
    let arquivoDoCurso = path.join(__dirname, `data/${curso}.json`)

    if (existsSync(arquivoDoCurso)) {
      this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
    } else {
      try {
        this.criaArquivoDeCurso(arquivoDoCurso, {})

        this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
      } catch (error) {
        console.log(err)
      }
    }
  },

  async adicionaTempoAoCurso(arquivoCurso, tempo) {
    let dados = {
      ultimoTempoEstudo: new Date().toString(),
      tempoEstudo: tempo,
    }

    try {
      jsonFile.writeFile(arquivoCurso, dados, { spaces: 2 });
      console.log('Tempo salvo com sucesso')
    } catch (err) {
      console.log(err)
    }

  },

  async criaArquivoDeCurso(nomeArquivo, conteudoArquivo) {
    try {
      jsonFile.writeFile(nomeArquivo, conteudoArquivo, { spaces: 2 })
      console.log('arquivo criado')
    } catch (err) {
      console.error(err)
    }
  },

  pegaDados(curso) {
    let arquivoDoCurso = path.join(__dirname, `data/${curso}.json`)
    return jsonFile.readFile(arquivoDoCurso);
  },

  getNomeCursos() {
    let arquivos = readdirSync(path.join(__dirname, 'data'));

    let cursos = arquivos
      .filter(nome => /.\.json/g.test(nome))
      .map(nome => nome.replace('.json', ''))

    return cursos;
  }
}