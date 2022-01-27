# Projeto Electron na alura

Desenvovido aplicação desktop de um timer que salva a última vez que pausou o tempo.

## Iniciando projeto

- ter Node instalado
- executar:

  ```bash
  npm install

  npm start
  ```

## Build

```bash
# build para windows  
npm run build:win

# build para linux
npm run build:linux
# build para linux com pacote .deb
npm run build:linux:deb

# build para Mac
npm run build:win
```

- caso esteja no `linux` e queira fazer o build para `windows`, é necessário baixar o [**wine HQ**](https://www.winehq.org/)
  - ele faz com que programas `.exe` possam ser executados no linux, pois ele adiciona mais uma camada entre o shell e o kernel do linux
  - após baixado o wine, para executar os `.exe` basta digitar `wine arquivo.exe`