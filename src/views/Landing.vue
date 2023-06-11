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
      <div class="container bg-dim shadow" style="border-radius:40px;margin:5px 0px">
        <span class="material-icons-round text" style="font-size:25px;margin:5px">
          person_remove
        </span>
      </div>
      <div class="container bg-dim shadow" style="border-radius:40px;margin:5px 0px">
        <span class="material-icons-round text" style="font-size:25px;margin:5px">
          settings
        </span>
      </div>
    </div>
    <div v-if="!sp.expanded">
      <div class="container bg-dim shadow" style="border-radius:40px;margin:5px 0px">
        <span class="material-icons-round text" style="font-size:25px;margin:5px">
          menu
        </span>
      </div>
    </div>
    
  </div>

  <div class="main flex-center" style="width:100%;margin:0px;padding:0px">
    <div style="width:90%;max-height:80vh;overflow-y:scroll">
      <CoachNode v-for="staff in this.staff.sort((a,b) => a.localeCompare(b))" :key="staff.id" class="flex-center" style="margin:10px" :coach="staff"/>
    </div>
    
  </div>
</template>

<script>
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
        },
        actualClasses: {},
        students: [],
        staff: []
      }
    },
    mounted() {


      var token = this.$cookies.get('token')
      if(token == undefined) {
        window.location = `${this.$root.path}/oauth/authorize?client_id=${"H4DMGD1xMHHfRyUoz9mC7zH7ZT1Hvda7GUT0rgGU"}&response_type=code&redirect_uri=http://localhost:5173/auth`
      }

      setInterval(() => {
        this.timeStrings[0] = new Date().toLocaleTimeString().split(' ')[0]
        this.timeStrings[1] = new Date().toLocaleTimeString().split(' ')[1]
        this.loaded.time = true
        this.dateStrings[0] = days[new Date().getDay()]
        this.dateStrings[1] = months[new Date().getMonth()] + ' ' + new Date().getDate() + ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][new Date().getDate() % 10] + ', ' + new Date().getFullYear()
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

      this.refreshAPI()
    },
    methods: {
      randomSelector(){
        this.randomSelectorNum = Math.floor(Math.random() * 1000)
      },
      refreshAPI(){

        var startDate = new Date()
        startDate.setMinutes(0);
        startDate.setHours(0);
        var endDate = new Date()
        endDate.setHours(23);
        endDate.setMinutes(59);

        this.axios.get(`${this.$root.pathLocation}/api/v2/desk/event_occurrences?from=${startDate.toString()}&to=${endDate.toString()}`, {headers: {'Authorization': `Bearer ${this.$cookies.get('token')}`}}).then((res) => {
          res.data.event_occurrences.forEach(eO => {

            // cache them
            eO.people.forEach(p => {
              if(this.students.find(s => s.id == p.id) == undefined) this.students.push(p)
            });
            eO.staff_members.forEach(sM => {
              if(this.staff.find(s => s.id == sM.id) == undefined) {
                this.staff.push(sM)
                this.actualClasses[sM.id] = []
              }


              

              this.actualClasses[sM.id].push(eO)
            });

            



          })
          console.log(this.staff)
        }).catch((err) => {
          console.log(err)
        });
      }
    }
  }
</script>