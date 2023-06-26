<template>
  <link href="https://fonts.googleapis.com/icon?family=Geologica"
      rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
      rel="stylesheet">
  <link href="main.css" rel="stylesheet"/>
  <RouterView />

  <div style="position: absolute;top:0;left:0;width:100%;height:100%;z-index: -5" :style="`background-color:rgba(0,0,0,${this.settings.darken})`">

  </div>

  <div v-show="showAccessPanel" class="flex-center" style="position:absolute;top:0;left:0;width:100%;height:100%;background-color: rgba(0,0,0,0.5);z-index:90">
    <div class="bg-white shadow fade-in" style="padding:20px;border-radius: 20px;width:50%">
      <span class="f-large color-green f-bold">Unlock Code</span>
      <span class="f-small color-green" style="margin:5px">You are trying to access sensitive details of a student. Please enter in the coach access code to continue accessing this student data...</span>
      <div class="flex-center" style="margin-top:20px">
        <input ref="pw" class="border-green f-medium color-green" type="password" style="border-radius: 16px;padding:6px 10px"/>
      </div>

      <div class="flex-center">
        <button class="bg-red text f-small" style="padding:10px 20px;border-radius: 16px;margin-top:20px;border:none" @click="accessCB()">Cancel</button>
        <Key :character="'='" style="left:-10px;top:10px"/>
      </div>

      
      

    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      location: "tcs-plymouth",
      path: "https://pike13.com",
      redirect: "http://localhost:5173/auth",
      adjustMin: 0,
      accessCode: '0ffbyabyte!',
      accessCB: () => {},
      showAccessPanel: false,
      settings: {
        color: "#06001c",
        // diagonal rainbow linear gradient
        bggradient: "linear-gradient(45deg, #ff8282, #fffc8c, #79ff80, #65d1ff, #e47bff)",
        darken: 0.3
      }
    }
  },
  mounted(){

    // set html background
    document.body.style.background = this.settings.bggradient;


    document.addEventListener('keydown', (e) => {
      if(e.key == '=' && this.showAccessPanel){
        this.showAccessPanel = false;
      }
      
    })

    document.addEventListener('keyup', (e) => {
      if(this.showAccessPanel){
        if(this.$refs.pw.value == this.accessCode){
          this.showAccessPanel = false;
          this.accessCB();
        }
      }
      
    })
  },
  methods: {
    now(){
      var date = new Date();
      date.setMinutes(date.getMinutes() + this.adjustMin);
      return date;
    },
    accessCodeShow(cb){
      this.showAccessPanel = true;
      this.accessCB = cb;
      this.$refs.pw.value = "";
      setTimeout(() => {
        this.$refs.pw.focus();
      }, 100);
      
    }
  },
  computed: {
    pathLocation (){
      return `${this.path.split("//")[0] + "//" + this.location + "." + this.path.split("//")[1]}`
    }
    
  }
  
}

</script>