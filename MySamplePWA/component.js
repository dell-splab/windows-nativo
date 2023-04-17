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
	background-color: orange;
}

.notification[priority="priority-1"]{
	background-color: CornflowerBlue;
}

.notification[priority="priority-2"]{
	background-color: IndianRed;
}
</style>

<div id=container>
	<button>Disparar notificação</button>
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
    this.$disparar_btn = this.shadowRoot.querySelector("button")
    this.$input = this.shadowRoot.querySelector("#notification-input")
    
    this.notifications = [
    	{
        "title": "Ligação perdida",
        "description": "Ligação perdida no sistema xxx",
        "priority": 2
      },
      {
        "title": "Mensagem de João",
        "description": "Mensagem recebida às 10 a.m.",
        "priority": 1
      },      
      {
        "title": "Email de José",
        "description": "Email recebido no sistema yyy",
        "priority": 0
      }

    ]
  }
  
  connectedCallback(){
    this.notifications.forEach(n => this.adicionarNotf(n))
    
    this.$disparar_btn.addEventListener('click', async (_) => {
    	let notfIndex = Math.floor(Math.random() * (3 - 0) + 0)
      let notf = this.notifications[notfIndex]
      this.adicionarNotf(notf)
    })
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
      <p>${notf_body.description}</p>`
    
    let $btn_delete_notf =  $notif_div.querySelector(".btn")
    $btn_delete_notf.addEventListener('click', this.callbackDeleteNotf)
  	this.$notif_list.prepend($notif_div)
  }
	
}
window.customElements.define('notifications-list', ListNotifications);