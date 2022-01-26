const data = require("./data");

module.exports = {
    templateInicial: null,

    geraTrayTemplate(mainWindow) {
        let template = [
            { label: 'Cursos', },
            { type: 'separator' },
        ]
        let cursos = data.getNomeCursos();

        cursos.forEach(curso => {
            let menuItem = {
                label: curso,
                type: 'radio',
                click: () => {
                    mainWindow.webContents.send('tray-selected', { curso })
                }
            }
            template.push(menuItem);
        })

        this.templateInicial = template;

        return template;
    },

    adicionaCursoTray(mainWindow, curso) {
        this.templateInicial.push({
            label: curso, 
            type: 'radio', 
            checked: true,
            click() {
                mainWindow.webContents.send('tray-selected', { curso })
            }
        })

        return this.templateInicial;
    }
}