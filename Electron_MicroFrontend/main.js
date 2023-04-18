const { app, BrowserWindow, Notification } = require('electron')

// const notifications = []

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })
  
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})

// function showNotification (priority) {
    // const notification = {
    //     title: 'Notificação aleatória',
    //     body: 'Esta é uma notificação aleatória gerada pelo Electron!',
    //     priority: priority
    // }
    // notifications.push(notification)
    // new Notification(notification).show()
    // console.log(notifications)

// }

// function scheduleNotification () {
    // const randomInterval = Math.floor(Math.random() * (15000 - 1000 + 1)) + 1000 // intervalo aleatório entre 1 e 60 segundos
    // const randomPriority = Math.floor(Math.random() * 3) // prioridade aleatória entre 0 e 2
    // setTimeout(() => {
    //     showNotification(randomPriority)
    //     scheduleNotification()
    // }, randomInterval)
// }

// app.whenReady().then(() => {
//     scheduleNotification()
// })