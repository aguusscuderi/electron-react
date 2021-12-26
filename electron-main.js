// Node script that starts up my electron app
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

function createWindow () {
    // https://www.electronjs.org/es/docs/latest/api/browser-window
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    const filePath = `file://${path.join(__dirname, "build", "index.html")}`
    console.log(filePath)
    win.loadURL(isDev ? "http://localhost:3000" : filePath)
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit()
    }
})

app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})

//npm run package: para crear el .exe de la app
//npm run make: me crea el instalador de la app