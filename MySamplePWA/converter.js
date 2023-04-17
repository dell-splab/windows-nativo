const notificationsList = [];

function sendNotification(notf) {
  if (notificationsList.length === 5) {
    notificationsList.shift();
  }

  if (Notification.permission === "granted") {
    console.log("The user already accepted");
    new Notification("Hello World!", {
      body: notf.body,
      icon: notf.img,
    });
  } else {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("The user accepted");
        new Notification("Hello World!", {
          body: notf.body,
          icon: notf.img,
        });
      }
    });
  }

  notificationsList.push(notf);
}

document.querySelector('notifications-list').addEventListener(
  "notification", (e) => sendNotification(e.detail))