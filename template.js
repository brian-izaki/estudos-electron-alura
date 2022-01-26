const data = require("./data");

module.exports = {
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

        return template;
    }
}