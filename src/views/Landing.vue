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
    <div v-if="screen == 'coaches'">
      <div class="container bg-dim shadow" style="border-radius:40px;margin:10px 0px">
        <span class="material-icons-round text" style="font-size:25px;margin:5px">
          person_remove
        </span>
        <Key :character="'0'" style="left:-10px;top:-5px"/>
      </div>
      <div class="container bg-dim shadow" style="border-radius:40px;margin:10px 0px">
        <span class="material-icons-round text" style="font-size:25px;margin:5px">
          settings
        </span>
        <Key :character="'1'" style="left:-10px;top:-5px"/>
      </div>
    </div>
    <div v-if="screen == 'absent'">
      <div class="container bg-dim shadow" style="border-radius:40px;margin:10px 0px">
        <span class="material-icons-round text" style="font-size:25px;margin:5px">
          arrow_back
        </span>
        <Key :character="'0'" style="left:-10px;top:-5px"/>
      </div>
      
    </div>
    
  </div>

  <div class="main flex-center" style="width:100%;margin:0px;padding:0px;border-radius:16px" :style="screen == 'coaches' ? 'max-height:100vh;overflow-y:hidden' : 'max-height:0vh;overflow-y:hidden'">
    <div style="width:100%;max-height:80vh;overflow-y:scroll">
      <CoachNode v-for="staff in this.staff.sort((a,b) => a.name.localeCompare(b.name))" :key="staff.id" class="flex-center" style="margin:20px 10px" :coach="staff"/>
    </div>
    
  </div>
  <div class="main flex-center" style="width:100%;margin:0px;padding:0px;border-radius:16px" :style="screen == 'absent' ? 'max-height:100vh;overflow-y:hidden;opacity:1' : 'max-height:0vh;overflow-y:hidden;opacity:0'">
    <div style="width:90%;max-height:80vh;overflow-y:scroll">
      <div class="flex-center" style="flex-wrap:wrap">
        <div v-for="student in this.students" :key="student.id">
          <div class="container bg-white shadow" style="border-radius:16px;margin:10px;padding:12px 24px">
            <span class="f-large color-green">{{ student.name }}</span>
            <div class="flex-center" style="flex-wrap:wrap">
              <div class="bg-green" style="padding:4px 8px;border-radius:8px;margin:4px" v-for="c in getClasses(student)">
                <span class="text f-small">{{ c }}</span>
              </div>
            </div>
            <Key :character="getLetter(student).toUpperCase()" style="left:-20px;top:-5px"/>
          </div>
        </div>
      </div>
      
    </div>
    
  </div>
</template>

<script>
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var phaseTimes = [6000, 10000, 8000, 8000, 5000];
  var welcomes = ["var greeting = 'Hello'", "Welcome();", "<p>Happy to see you!</p>", "console.log('Welcome!')", "01101000 01101001", "char[] greeting = {'H', 'e', 'l', 'l', 'o'};"]
  var letters = "abcdefghijklmnopqrstuvwxyz123456789,./;[]-";
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
        staff: [],
        showKeys: false,
        screen: "coaches"
      }
    },
    mounted() {


      document.addEventListener('keyup', (evt) => {
        switch(this.screen){
          case "coaches":
            if(evt.key == '0') {
              this.screen = "absent"
            }
            break;
          case "absent":
            if(evt.key == '0') {
              this.screen = "coaches"
            }
            break;
        }
      })


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
        this.refreshAPI()
      }, 4000);

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
      },
      getLetter(student){
        var index = this.students.findIndex(s => s.id == student.id)
        return letters[index % letters.length]
      
      },
      getClasses(student){
        var classes = [];
        Object.keys(this.actualClasses).forEach(key => {
          this.actualClasses[key].forEach(c => {
            if(c.people.find(p => p.id == student.id)) classes.push(this.timeRange(c.start_at, c.end_at))
          })
        })
        return classes;
      },
      untilTime(d){
        var date = new Date(d);
        var localeHour = date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        return localeHour.split(" ")[0] + localeHour.split(" ")[1];
      },
      timeRange(dStart, dEnd){
        var start = new Date(dStart);
        var end = new Date(dEnd);
        var localeStart = start.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        var localeEnd = end.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        return localeStart.split(" ")[0] + (localeStart.split(" ")[1] != localeEnd.split(" ")[1] ? localeStart.split(" ")[1] : "") + "-" + localeEnd.split(" ")[0] + localeEnd.split(" ")[1];
      },
      refreshAPI(){

        var startDate = new Date()
        startDate.setMinutes(0);
        startDate.setHours(0);
        var endDate = new Date()
        endDate.setHours(23);
        endDate.setMinutes(59);

        Object.keys(this.actualClasses).forEach(key => {
          this.actualClasses[key] = []
        });

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


              

              // check for duplicate eO with staff at same time
              var preveO = this.actualClasses[sM.id].find(e => e.start_at == eO.start_at && e.name == eO.name && e.end_at == eO.end_at);
              if(preveO != undefined) {
                preveO.people = preveO.people.concat(eO.people)
                return;
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