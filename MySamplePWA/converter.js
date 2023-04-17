const notificationsList = [];

function sendNotification() {
  if (notificationsList.length === 5) {
    notificationsList.shift();
  }

  const priority = Math.floor(Math.random() * 3);
  let img = "";
  let body = "";

  if (priority === 0) {
    img = "low-priority.png";
    body = "Low priority notification";
  } else if (priority === 1) {
    img = "danger-sign.png";
    body = "Medium priority notification";
  } else if (priority === 2) {
    img = "priority.png";
    body = "High priority notification";
  }

  if (Notification.permission === "granted") {
    console.log("The user already accepted");
    new Notification("Hello World!", {
      body: body,
      icon: img,
    });
  } else {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("The user accepted");
        new Notification("Hello World!", {
          body: body,
          icon: img,
        });
      }
    });
  }

  notificationsList.push({
    title: "Hello World!",
    description: body,
    priority: priority,
  });
  document.getElementById("list-length").innerHTML = notificationsList.length + " notifications";
}

document.addEventListener(
  "DOMContentLoaded",
  setInterval(sendNotification, 10000)
);
