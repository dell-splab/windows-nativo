let templateContent = `
<style>
.notification{
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 10px;  
	height: 100px;
 	width: 300px;
}
.notification div{
	display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 7px;
  max-height: 50px;
}
.notification div h4 {
  text-align: center;
}
.notification p {
  margin: 0;
  text-align: center;
}
.notification[priority="priority-0"]{
	background-color: CornflowerBlue;
}
.notification[priority="priority-1"]{
	background-color: orange;
}
.notification[priority="priority-2"]{
	background-color: IndianRed;
}
/* Classe para botão azul */
.btn-blue {
  background-color: CornflowerBlue;
  color: white;
}
/* Classe para botão laranja */
.btn-orange {
  background-color: orange;
  color: white;
}
/* Classe para botão vermelho */
.btn-red {
  background-color: IndianRed;
  color: white;
}
/* Estilização básica para o botão */
.btn {
  font-size: 18px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
<div id=container>
  <p id=notification-count>0 notifications</p>
  <div id=notifications-list></div>
</div>`;

let template = document.createElement("template");
template.innerHTML = templateContent;

class ListNotifications extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.$notif_list = this.shadowRoot.querySelector("#notifications-list")
    this.$notif_count = this.shadowRoot.querySelector("#notification-count")
    this.configNotif = {
      'all-muted-until': "",
      'muted-by-id-until':{
          'id': "",
          'muted-until': ""
      }
    }
  }

  connectedCallback() {
    setInterval(this.sendNotification.bind(this), 7000)
    document.querySelector('notifications-config').addEventListener(
      "notificationConfig", (e) => this.configNotif = e.detail)
  }

  sendNotification() {
    const priority = Math.floor(Math.random() * 3);
    let img = "";
    let body = "";
    let id = Math.floor(Math.random() * 2);

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

    let notf = {
      title: "Hello World!",
      body: body,
      priority: priority,
      img: img,
      id: id
    };
    this.adicionarNotf(notf);
    this.dispatchNotfByConfig(notf)   
  }

  dispatchNotf(notf){
    this.dispatchEvent(
      new CustomEvent("notification", {
        detail: notf,
      })
    );
  }

  dispatchNotfByConfig(notf){
    let date = new Date()
    let timestampAtual = date.getTime()
    console.log(notf)
    if(this.configNotif['all-muted-until'] == "" || this.configNotif['all-muted-until'] < timestampAtual){
      if(notf.id != this.configNotif['muted-by-id-until']['id']){
        this.dispatchNotf(notf)
      } else if(this.configNotif['muted-by-id-until']['muted-until'] < timestampAtual){
        this.dispatchNotf(notf)
      }         
    } 
  }

  getAtributoPrioridade(notf_body) {
    let attr = "";
    if (notf_body["priority"] == 0) attr = "priority-0";
    else if (notf_body["priority"] == 1) attr = "priority-1";
    else attr = "priority-2";
    return attr;
  }

  callbackDeleteNotf(event) {
    const div = event.target.parentNode.parentNode;
    div.remove();
  }

  adicionarNotf(notf_body) {
    if (this.$notif_list.children.length === 5) {
      this.$notif_list.removeChild(this.$notif_list.children[4]);
    }
    let $notif_div = document.createElement("div");
    $notif_div.setAttribute("class", "notification");
    $notif_div.setAttribute("priority", this.getAtributoPrioridade(notf_body));
    $notif_div.innerHTML = `
    	<div>
        <h4>${notf_body.title} - ID: ${notf_body.id}</h4>
        <button class="btn">X</button>
      </div>
      <p>${notf_body.body}</p>`;

    let $btn_delete_notf = $notif_div.querySelector(".btn");
    $btn_delete_notf.addEventListener("click", this.callbackDeleteNotf);

    // Estilizar botão de fechar
    $btn_delete_notf.style.backgroundColor =
      notf_body.priority === 0
        ? "CornflowerBlue"
        : notf_body.priority === 1
        ? "orange"
        : "IndianRed";
    $btn_delete_notf.style.border = "none";
    $btn_delete_notf.style.borderRadius = "50%";
    $btn_delete_notf.style.color = "white";
    $btn_delete_notf.style.cursor = "pointer";
    $btn_delete_notf.style.fontWeight = "bold";
    $btn_delete_notf.style.padding = "5px 10px";

    this.$notif_list.prepend($notif_div);
    this.$notif_count.innerHTML = this.$notif_list.children.length + " notifications"
  }
}
window.customElements.define("notifications-list", ListNotifications);
