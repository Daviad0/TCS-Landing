<template>
  <!--

    Top clock and date portion

  -->
  <div class="top-left bg-dim container flex-center shadow" style="border-radius: 0px 0px 24px 0px;width:40%;height:100px;min-width: 700px;">
    <div style="margin:20px;width:45%" v-if="loaded.time">
      <span class="text f-large">{{ dateStrings[0] }}</span>
      <span class="text f-xlarge">{{ dateStrings[1] }}</span>
    </div>
    <div style="margin: 10px 20px;width:45%" v-if="loaded.time">
      <span class="text f-bold"><inline class="f-xxxlarge" ref="time">{{ timeStrings[0] }}</inline><inline class="f-large">{{ timeStrings[1] }}</inline></span>
    </div>
    <span class="material-icons-round text" style="font-size:60px;margin:20px" v-if="!loaded.time">
      schedule
    </span>
  </div>
  <div class="top-right flex-center bg-dim shadow" style="border-radius: 0px 0px 0px 24px;padding:10px;width:30%;height:100px;max-width:400px;min-width:200px">
    <div ref="tr_content" class="fade-in">
      <span class="text f-large" v-if="tr.phase == 0">Welcome to <inline class="f-bold">Plymouth, MI</inline></span>
      <div v-if="tr.phase == 1">
        <span class="text f-medium">Today's Hours:</span>
        <div class="bg-dim" style="padding:8px;border-radius:8px;margin:10px 10px 0px 10px">
          <span class="text f-small">9:00AM - 3:00PM</span>
        </div>
        
      </div>
      <img src="@/assets/tcs-logo.png" height="80" v-if="tr.phase == 2" style="margin-top:12px"/>
      <div v-if="tr.phase == 3">
        <span class="text f-medium">To quote <inline class="f-bold">{{ quotes[randomSelectorNum % quotes.length].author }}</inline>...</span>
        <div class="bg-dim" style="padding:8px;border-radius:8px;margin:10px 10px 0px 10px">
          <span class="text f-small f-italic">"{{ quotes[randomSelectorNum % quotes.length].quote }}"</span>
        </div>
        
      </div>
      <div v-if="tr.phase == 4">
        <span class="text f-medium" style="font-family:Consolas">{{ welcomes[randomSelectorNum % welcomes.length] }}</span>
        
        
      </div>
    </div>
  </div>

  <div class="side-panel" style="margin-right:15px">
    <div v-if="sp.expanded">
      <div class="container bg-dim" style="border-radius:40px;margin:5px 0px">
        <span class="material-icons-round text" style="font-size:25px;margin:5px">
          person_remove
        </span>
      </div>
      <div class="container bg-dim" style="border-radius:40px;margin:5px 0px">
        <span class="material-icons-round text" style="font-size:25px;margin:5px">
          settings
        </span>
      </div>
    </div>
    <div v-if="!sp.expanded">
      <div class="container bg-dim" style="border-radius:40px;margin:5px 0px">
        <span class="material-icons-round text" style="font-size:25px;margin:5px">
          menu
        </span>
      </div>
    </div>
    
  </div>

  <div class="main flex-center" style="width:100%;margin:0px;padding:0px">
    <div style="width:90%">
      <CoachNode class="flex-center" style="margin:10px"/>
    </div>
    
  </div>
</template>

<script>
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var phaseTimes = [6000, 10000, 8000, 8000, 5000];
  var welcomes = ["var greeting = 'Hello'", "Welcome();", "<p>Happy to see you!</p>", "console.log('Welcome!')", "01101000 01101001", "char[] greeting = {'H', 'e', 'l', 'l', 'o'};"]
  var quotes = [
    {
      author: 'Kirby',
      quote: 'Uwaaaa'
    },
    {
      author: 'Alan Turing',
      quote: 'Those who can imagine anything, can create the impossible.'
    }
  ]
  export default {
    name: 'Landing',
    data() {
      return {
        timeStrings: ['12:00:00', 'PM'],
        dateStrings: ['Thursday', 'June 23rd, 2023'],
        loaded: {
          time: false
        },
        tr: {
          phase: 0,
          phases: 5,
          timefrom: new Date().getTime()
        },
        randomSelectorNum: 0,
        quotes: quotes,
        welcomes: welcomes,
        sp: {
          expanded: false
        }
      }
    },
    mounted() {
      setInterval(() => {
        this.timeStrings[0] = new Date().toLocaleTimeString().split(' ')[0]
        this.timeStrings[1] = new Date().toLocaleTimeString().split(' ')[1]
        this.loaded.time = true
        this.dateStrings[0] = days[new Date().getDay()]
        this.dateStrings[1] = new Date().toLocaleDateString()
      }, 200)

      setInterval(() => {
        if((new Date().getTime() - this.tr.timefrom) < phaseTimes[this.tr.phase]) return;


        this.tr.timefrom = new Date().getTime()

        this.$refs.tr_content.classList = 'fade-out'
        setTimeout(() => {
          this.randomSelector();
          this.tr.phase = (this.tr.phase + 1) % this.tr.phases
          this.$refs.tr_content.classList = 'fade-in'

          this.tr.timefrom = new Date().getTime()
          
        }, 1100)
      }, 100)
    },
    methods: {
      randomSelector(){
        this.randomSelectorNum = Math.floor(Math.random() * 1000)
      }
    }
  }
</script>