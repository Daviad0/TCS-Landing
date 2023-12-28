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
        <span class="material-icons-round text" style="font-size:30px;margin:5px 10px">arrow_circle_up</span>
      <span class="text f-xlarge f-bold" style="margin:5px;margin-top:10px">Current Preset: {{ currentPreset.name }}</span>
    </div>
  </div>
  
  <div class="flex-center" style="flex-wrap:wrap;margin-top:40px">
    <div v-for="preset in this.presets" :key="preset.file">
        <div class="container bg-white shadow" style="border-radius:16px;margin:10px;padding:12px 24px">
            <span class="f-large" :style="`color:${this.$root.settings.color}`">{{ preset.name }}</span>
            <div class="flex-center">
                <div v-for="color in preset.colors">
                    <div :style="`background-color:${color}`" class="shadow-less" style="width:20px;height:20px;border-radius:50%;margin:5px"></div>
                </div>
            </div>
            <Key :character="this.getLetter(preset.file).toUpperCase()" style="left:-20px;top:-5px"/>
        </div>
    </div>
    </div>

    <div class="flex-center" style="flex-wrap:wrap;margin-top:40px">
        <div class="container bg-white shadow flex-center" style="border-radius:16px;margin:10px;padding:12px 24px">
            <span class="f-xlarge" :style="`color:${this.$root.settings.color}`" style="margin-right:10px">Set Custom Color</span>
            <input type="color" ref="colorSelector" v-on:change="setCustomColor()" style="width:40px;height:40px;border-radius:8px;margin:5px;background-color: white;border:2px solid black">
            
            
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

                // check if the key is a letter within the number of presets we have

                if(letters.includes(e.key.toLowerCase())){
                    var index = letters.indexOf(e.key.toLowerCase());

                    if(index >= this.presets.length) return;
                    var preset = this.presets[letters.indexOf(e.key.toLowerCase())];

                    this.sendRequest(preset.file, preset.name);
                    this.currentPreset = preset.name;
                }
                
            });

            this.axios.get(`http://10.1.10.246:3000/presets`).then((res) => {
                this.presets = res.data.presets;
                this.currentPreset = res.data.current;
            });
            
        },
        methods: {
            getLetter(preset){
                return letters.charAt(this.presets.indexOf(this.presets.find(p => p.file == preset)));
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
            setCustomColor(){
                if(this.sendingRequest) return;
                this.sendingRequest = true;
                var color = this.$refs.colorSelector.value.replace("#", "").toUpperCase();
                console.log(this.$refs.colorSelector.value)
                
                this.currentPreset = "Custom Color: #" + color;
                this.axios.get(`http://10.1.10.246:3000/setcolor?color=${color}`).then((res) => {
                    this.$parent.switchScreen('coaches');
                    this.sendingRequest = false;
                });
            },
            sendRequest(file, name){
                if(this.sendingRequest) return;
                this.sendingRequest = true;

                            
                this.axios.get(`http://10.1.10.246:3000/setpreset?file=${file}&name=${name}`).then((res) => {
                    this.$parent.switchScreen('coaches');
                    this.sendingRequest = false;
                });
            }
        }
    }
</script>