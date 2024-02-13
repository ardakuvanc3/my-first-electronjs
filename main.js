const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const path = require('path');
const url = require('url');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true, 
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "main.html"),
            protocol: "file:",
            slashes: true,
        }) 
    );


    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

    ipcMain.on("key", (err, data) => {
        console.log(data);
    })

    ipcMain.on("key:inputValue", (err,data) => {
        console.log(data);
    })

    ipcMain.on("key:newWindow", () => {
        console.log("okey");
        createWindow();
    })

    mainWindow.on('close', () => {
        app.quit();
    })

});



const mainMenuTemplate = [
    {
        label: "Dosya",
        submenu: [
            { label: "Yeni TODO Ekle" },
            { label: "Tümünü Sil" },
            { type: 'separator' },
            {
                label: "Çıkış",
                accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                role: "quit"
            }
        ]
    }
];

if (process.platform == "darwin") {
    mainMenuTemplate.unshift({
        label: app.getName(),
        role: "TODO" // Burası yanlış olabilir, uygun bir role değiştirin.
    });
}

if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push({
        label: "Dev Tools",
        submenu: [
            {
                label: "Geliştirici Penceresini Aç",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            { label: "Yenile", role: "reload" }
        ]
    });
}


function createWindow(){
    addWindow = new BrowserWindow({
        width:482,
        height:200,
        title: "Yeni bir pencere"
    });

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, "modal.html"),
        protocol: "file:",
        slashes: true
    }));

    addWindow.on('close', () => {
        addWindow = null;
    })
    
}
