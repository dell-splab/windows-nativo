let templateConfigNotif = `<div id=container>
	<h3>Notification Settings</h3>
  <div id="mute-notification-container">
    <label for="hours">Mute Notifications for:</label>
    <select id="hours">
    	<option value="0">-</option>
      <option value="2">2 hours</option>
      <option value="4">4 hours</option>
      <option value="8">8 hours</option>
      <option value="16">16 hours</option>
    </select>
  </div>
  <div id="mute-notification-by-id-container">
    <label for="hours-by-id">Mute Notification by ID:</label>
    <input type="text" id="id-notf" placeholder="Notification ID">
    <select id="hours-by-id">
    	<option value="0">-</option>
      <option value="2">2 hours</option>
      <option value="4">4 hours</option>
      <option value="8">8 hours</option>
      <option value="16">16 hours</option>
    </select>
  </div>
  <button id="save-settings-btn">Save Settings</button>
</div>`

let templateEl = document.createElement("template")
templateEl.innerHTML = templateConfigNotif

class ConfigNotifications extends HTMLElement {
   
	constructor(){    
  	super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(templateEl.content.cloneNode(true))
    
    this.$saveSettingsBtn = this.shadowRoot.querySelector("#save-settings-btn")
    this.$hoursDropdown = this.shadowRoot.querySelector("#hours")
    this.$hoursByIdDropdown = this.shadowRoot.querySelector("#hours-by-id")
    this.$input = this.shadowRoot.querySelector("#id-notf")
    this.$saveSettingsBtn.click()
  }
  
  connectedCallback(){
    this.$saveSettingsBtn.addEventListener('click', async (_) => {
    	let config = {
      	'all-muted-until': "",
        'muted-by-id-until':{
            'id': "",
            'muted-until': ""
        }
      }
      
      let allMutedUntil = this.$hoursDropdown.value
      if(allMutedUntil != "0"){
      	config['all-muted-until'] = this.recuperarTimestamp(allMutedUntil)
      } 
    	
      let notificationID = this.$input.value
      if(notificationID != "" && this.$hoursByIdDropdown.value != "0"){
        config['muted-by-id-until']['id'] = notificationID
        let IDmutedUntil = this.$hoursByIdDropdown.value
        config['muted-by-id-until']['muted-until'] = this.recuperarTimestamp(IDmutedUntil)
      }
      this.dispatchEvent(
        new CustomEvent("notificationConfig", {
          detail: config,
        })
      );
    })
  }
  
  recuperarTimestamp(hoursToAdd){
  	let agora = new Date()
    let timestampAtual = agora.getTime()
    let timestampHorasDepois = timestampAtual + (hoursToAdd * 60 * 60 * 1000) // Adiciona 16 horas em milissegundos
    let dataComHorasDepois = new Date(timestampHorasDepois)
    let timestampComHorasDepois = dataComHorasDepois.getTime()
    return timestampComHorasDepois
  }
	
}
window.customElements.define('notifications-config', ConfigNotifications);