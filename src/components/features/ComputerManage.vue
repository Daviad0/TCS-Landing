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
    <div class="bg-white shadow" style="padding:20px;border-radius: 16px;margin:10px">
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
                        <span style="margin-left:25px;" class="f-medium text">{{ comp.ip }}</span>
                        <span class="material-icons-round text" v-if="comp.status != 'online'" style="font-size:24px;margin-left:5px">power_off</span>
                        
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
    <div class="bg-white shadow" style="padding:20px;border-radius: 16px;margin:10px">
        <div class="flex-apart">
            <span class="f-medium f-bold" :style="`color:${this.$root.settings.color}`" style="text-align:left">Select Action</span>
            
        </div>
    </div>
    <div class="bg-white shadow" style="padding:20px;border-radius: 16px;margin:10px">
        <div class="flex-apart">
            <span class="f-medium f-bold" :style="`color:${this.$root.settings.color}`" style="text-align:left">Finalize</span>
            
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
                computers: [],
                selectedComputers: [],
                phase: "select",
                rememberSeed: this.$parent.pageKeySeed
            }
        },
        mounted(){



            document.addEventListener('keyup', (e) => {

                if(this.$parent.pageKeySeed != this.rememberSeed) return;

                if(this.phase == 'select'){
                    if(e.key == "a"){
                        this.selectedComputers = [];
                        this.computers.forEach(c => {
                            this.selectedComputers.push(c.ip);
                        })
                    }

                    if(e.key == "Enter"){
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
                }
            });

            this.axios.get(`http://10.1.10.246:3000/computers`).then((res) => {
                res.data.forEach(c => {

                    c.replace(" ", "");
                    c.replace("\r", "");

                    this.computers.push({
                        ip: c,
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
            }
        }
    }
</script>