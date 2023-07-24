<template>
    <div class="flex-center" style="width:100%">

<div style="width:90%;max-height:80vh;overflow-y:scroll" class="hidescroll">
  <div class="bg-dim shadow" style="padding:30px 20px;border-radius: 16px;margin:10px;margin-top:20px">
    <div class="flex-center">
      <span class="text f-xlarge f-bold" style="margin:5px;margin-top:10px">Computer Management</span>
    </div>
    <span class="text f-medium" style="margin:5px">You can shut down, restart, and power up all computers in the building from this dashboard by IP address. Please follow the next few steps to manage the computers...</span>
  </div>
  
  <div style="margin-top:40px">
    <div class="bg-white shadow" style="padding:20px;border-radius: 16px;margin:20px">
        
        <div class="flex-apart">
            <span class="f-medium f-bold" :style="`color:${this.$root.settings.color}`" style="text-align:left">Select Computers</span>
            <span class="f-medium" :style="`color:${this.$root.settings.color}`" style="text-align:right"><i>{{ selectedComputers.length }} Computers Selected</i></span>
        </div>
        <div :style="phase == 'select' ? 'max-height:1000px' : 'max-height:0px'" style="overflow-y:hidden">
            
            <div class="flex-center">
                <div :style="`background-color:${this.$root.settings.color}`" style="padding:8px 12px;border-radius: 8px;">
                    <span class="f-medium text">Select All Available Computers</span>
                    <Key :character="'A'" style="left:-30px;top:-24px"/>
                </div>
            </div>

            <div class="border-green" :style="`border-color:${this.$root.settings.color}`" style="padding:10px;border-radius: 16px;margin-top:20px;flex-wrap:wrap">
                        
                <span class="f-small" style="margin:15px" :style="`color:${this.$root.settings.color}`"><i>Select the computers you would like to affect by choosing their letters...</i></span>
                <div class="flex-center" style="flex-wrap:wrap;margin-bottom:10px">
                    <div class="flex-center" :style="selectedComputers.includes(comp.ip) ? `background-color:${this.$root.settings.color}` : `background-color:${this.$root.settings.color}b0   `" style="padding:6px 10px;border-radius: 12px;margin:5px" v-for="comp in computers" :key="comp.ip">

                        <Key :character="getComputerLetter(comp.ip)" style="left:-5px;top:-12px"/>
                        <span style="margin-left:25px;" class="f-medium text">{{ comp.name }} ({{ comp.ip }})</span>
                        <span class="material-icons-round text" v-if="comp.status != 'online'" style="font-size:24px;margin-left:5px">power_off</span>
                        
                    </div>
                </div>
                
            </div>
            
        </div>
        <Key :character="'Enter'" style="left:97%;top:6px" :style="phase == 'select' ? 'opacity: 1' : 'opacity: 0'"/>
    </div>
    <div class="bg-white shadow" style="padding:20px;border-radius: 16px;margin:20px">
        <Key :character="'Backspace'" style="left:0px;top:-32px" :style="phase == 'action' ? 'opacity: 1' : 'opacity: 0'"/>
        <div class="flex-apart">
            <span class="f-medium f-bold" :style="`color:${this.$root.settings.color}`" style="text-align:left">Select Action</span>
            <span class="f-medium" :style="`color:${this.$root.settings.color}`" style="text-align:right" v-if="selectedAction != ''"><i>Going to {{ selectedAction }}</i></span>
        </div>
        <div :style="phase == 'action' ? 'max-height:1000px' : 'max-height:0px'" style="overflow-y:hidden">
            <div class="flex-center">
                <div :style="selectedAction == 'shutdown' ? `background-color:${this.$root.settings.color}` : `background-color:${this.$root.settings.color}b0   `" style="padding:20px;border-radius: 16px;margin:10px">

                    <Key :character="'A'" style="left:-30px;top:-12px"/>
                    <div class="flex-center">
                        <span class="material-icons-round text" style="font-size:100px;margin:0px 20px">power_settings_new</span>
                    </div>
                    
                    <span class="f-medium f-bold text" style="margin:0px 10px">Shutdown</span>

                </div>
                <div :style="selectedAction == 'restart' ? `background-color:${this.$root.settings.color}` : `background-color:${this.$root.settings.color}b0   `" style="padding:20px;border-radius: 16px;margin:10px">

                    <Key :character="'B'" style="left:-30px;top:-12px"/>

                    <div class="flex-center">
                        <span class="material-icons-round text" style="font-size:100px;margin:0px 20px">restart_alt</span>
                    </div>
                    
                    <span class="f-medium f-bold text" style="margin:0px 10px">Restart</span>

                </div>
            </div>
            
        </div>
        <Key :character="'Enter'" style="left:97%;top:6px" :style="phase == 'action' ? 'opacity: 1' : 'opacity: 0'"/>
    </div>
    <div class="bg-white shadow" style="padding:20px;border-radius: 16px;margin:20px">
        <Key :character="'Backspace'" style="left:0px;top:-32px" :style="phase == 'finalize' ? 'opacity: 1' : 'opacity: 0'"/>
        <div class="flex-apart">
            <span class="f-medium f-bold" :style="`color:${this.$root.settings.color}`" style="text-align:left">Finalize</span>
            
        </div>
        <div :style="phase == 'finalize' ? 'max-height:1000px' : 'max-height:0px'" style="overflow-y:hidden">
            <span class="f-medium" :style="`color:${this.$root.settings.color}`">You will be {{ selectedAction == 'restart' ? 'restarting' : 'shutting down' }} {{ selectedComputers.length }} computer{{ selectedComputers.length > 1 ? 's' : '' }}</span>
            <div class="flex-center">
                <span class="f-large f-bold" :style="`color:${this.$root.settings.color}`" style="margin:10px">Hit Enter to Send Request</span>
            </div>
            
        </div>
    </div>
  </div>
  
</div>

</div>
</template>

<script>
    export default {
        name: "ComputerManage",
        data() {
            return {
                computers: [{
                    ip: '10.1.10.1',
                    name: "Router",
                    status: "online"
                }],
                selectedComputers: [],
                phase: "select",
                rememberSeed: this.$parent.pageKeySeed,
                selectedAction: "",
                sendingRequest: false
            }
        },
        mounted(){



            document.addEventListener('keyup', (e) => {

                if(this.$parent.pageKeySeed != this.rememberSeed) return;

                if(this.phase == 'select'){
                    if(e.key == "a"){

                        if(this.selectedComputers.length == this.computers.length){
                            this.selectedComputers = [];
                            return;
                        }

                        this.selectedComputers = [];
                        this.computers.forEach(c => {
                            this.selectedComputers.push(c.ip);
                        })
                    }

                    if(e.key == "Enter" && this.selectedComputers.length > 0){
                        this.phase = "action";
                    }
                    
                    this.computers.forEach(c => {
                        if(e.key == this.getComputerLetter(c.ip).toLowerCase()){
                            if(this.selectedComputers.includes(c.ip)){
                                this.selectedComputers.splice(this.selectedComputers.indexOf(c.ip), 1);
                            }else{
                                this.selectedComputers.push(c.ip);
                            }
                        }
                    })
                }else if(this.phase == 'action'){
                    if(e.key == 'a'){
                        this.selectedAction = this.selectedAction == 'shutdown' ? '' : "shutdown";
                    }else if(e.key == 'b'){
                        this.selectedAction = this.selectedAction == 'restart' ? '' : "restart";
                    }

                    // if  backspace, go back
                    if(e.key == "Backspace"){
                        this.phase = "select";
                    }
                    if(e.key == "Enter" && this.selectedAction != ""){
                        this.phase = "finalize";
                    }
                }else if(this.phase == 'finalize'){
                    if(e.key == "Backspace"){
                        this.phase = "action";
                    }
                    if(e.key == "Enter"){
                        this.doesNeedAuth();
                        this.phase = 'none';
                    }
                }
            });

            this.axios.get(`http://10.1.10.246:3000/computers`).then((res) => {
                res.data.forEach(c => {

                    var ip = c.ip;
                    var name = c.name;

                    ip.replace(" ", "");
                    ip.replace("\r", "");

                    this.computers.push({
                        ip: ip,
                        name: name,
                        status: "online"
                    });
                })
            });
            
        },
        methods: {
            getComputerLetter(ip){
                var useLetters = "bcdefghijklmnopqrstuvwxyz/.,';[]-=";
                var letter = useLetters.charAt(this.computers.indexOf(this.computers.find(c => c.ip == ip)));
                return letter.toUpperCase();
            },
            doesNeedAuth(){
                if(this.$parent.showIdle){
                    this.sendRequest();
                }
                else{
                    this.$root.accessCodeShow(this.sendRequest);
                }
            },
            sendRequest(){
                if(this.sendingRequest) return;
                this.sendingRequest = true;

                var ipString = "";
                this.selectedComputers.forEach(c => {
                    ipString += c + ",";
                });
                ipString = ipString.substring(0, ipString.length - 1);
                
                this.axios.get(`http://10.1.10.246:3000/shutdown?ips=${ipString}&restart=${this.selectedAction == 'restart'}&pw=0ffbyabyte!`).then((res) => {
                    this.$parent.switchScreen('coaches');
                });
            }
        }
    }
</script>