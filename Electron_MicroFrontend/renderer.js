const notificationsList = [];

function sendNotification(notf) {
    if (notificationsList.length === 5) {
        notificationsList.shift();
    }

    new Notification("Hello World!", {
        body: notf.body,
        icon: notf.img,
      });
    
    notificationsList.push(notf);
}

document.querySelector('notifications-list').addEventListener(
    "notification", (e) => sendNotification(e.detail))
