<template>
    <div class="flex-center" style="width:100%">

<div style="width:90%;max-height:80vh;overflow-y:scroll" class="hidescroll">
  <div class="bg-dim shadow" style="padding:30px 20px;border-radius: 16px;margin:10px;margin-top:20px">
    <div class="flex-center">
      <span class="text f-xlarge f-bold" style="margin:5px;margin-top:10px">Setup LEDs</span>
    </div>
    <span class="text f-medium" style="margin:5px">Setup the LEDs inside of the school by various presets created by theCoderSchool Coaches. Want to make your own light configuation? Create a text file inside of \\10.1.10.251\Home\DavidReeves\</span>
  </div>

  <div class="bg-dim shadow" style="padding:30px 20px;border-radius: 16px;margin:10px;margin-top:20px">
    <div class="flex-center">
      <span class="text f-xlarge f-bold" style="margin:5px;margin-top:10px">Current Preset: {{ currentPreset }}</span>
    </div>
  </div>
  
  <div class="flex-center" style="flex-wrap:wrap;margin-top:40px">
    <div v-for="preset in this.presets" :key="preset">
        <div class="container bg-white shadow" style="border-radius:16px;margin:10px;padding:12px 24px">
            <span class="f-large" :style="`color:${this.$root.settings.color}`">{{ preset }}</span>
            <Key :character="this.getLetter(preset).toUpperCase()" style="left:-20px;top:-5px"/>
        </div>
    </div>
    </div>
  
</div>

</div>
</template>

<script>
    var letters = "abcdefghijklmnopqrstuvwxyz123456789,./;[]-";
    export default {
        name: "ComputerManage",
        data() {
            return {
                presets: [],
                currentPreset: "",
                rememberSeed: this.$parent.pageKeySeed,
                selectedAction: "",
                sendingRequest: false
            }
        },
        mounted(){



            document.addEventListener('keyup', (e) => {

                if(this.$parent.pageKeySeed != this.rememberSeed) return;

                
            });

            this.axios.get(`http://10.1.10.246:3000/presets`).then((res) => {
                presets = res.data.presets;
                currentPreset = res.data.current;
            });
            
        },
        methods: {
            getLetter(preset){
                return letters.charAt(this.presets.indexOf(preset));
            },
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