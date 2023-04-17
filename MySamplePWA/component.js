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
}

.notification p {
  margin-top: 5px;
  margin-left: 15px;
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
</style>

<div id=container>
  <div id=notifications-list></div>
</div>`

let template = document.createElement("template")
template.innerHTML = templateContent

class ListNotifications extends HTMLElement {
   
	constructor(){    
  	super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.$notif_list = this.shadowRoot.querySelector("#notifications-list")
  }
  
  connectedCallback(){
    setInterval(this.sendNotification.bind(this), 10000)
    
  }

  sendNotification(){
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

    let notf = {
      title: "Hello World!",
      body: body,
      priority: priority,
      img: img
    }
    this.adicionarNotf(notf)
    this.dispatchEvent(new CustomEvent("notification", {
      detail: notf
    }));

  }
  
  getAtributoPrioridade(notf_body){
  	let attr = ""
    if(notf_body['priority'] == 0) attr = 'priority-0'
    else if(notf_body['priority'] == 1) attr = 'priority-1'
    else attr = 'priority-2'
    return attr
  }
  
  callbackDeleteNotf(event){
  	const div = event.target.parentNode.parentNode;
    div.remove();
  }
  
  adicionarNotf(notf_body){
  	let $notif_div = document.createElement("div")
    $notif_div.setAttribute('class', 'notification')
    $notif_div.setAttribute('priority', this.getAtributoPrioridade(notf_body))
    $notif_div.innerHTML =  `
    	<div>
        <h4>${notf_body.title}</h4>
        <button class="btn">X</button>
      </div>
      <p>${notf_body.body}</p>`
    
    let $btn_delete_notf =  $notif_div.querySelector(".btn")
    $btn_delete_notf.addEventListener('click', this.callbackDeleteNotf)
  	this.$notif_list.prepend($notif_div)
  }
	
}
window.customElements.define('notifications-list', ListNotifications);