const button = document.getElementById('push-button')


button.addEventListener("click", () => {
    if (Notification.permission === "granted") {
        console.log("The user already accepted");
        const notification = new Notification("Hello World!");
    } else{
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("The user accepted");
                const notification = new Notification("Hello World!");
            }
        });
    }
    
});