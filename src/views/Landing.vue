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
  <div class="top-right flex-center" >
    <img src="@/assets/circle-logo.png" style="margin:20px;border-radius: 100px;" height="80" class="shadow" />
  </div>
  <div class="bottom-right flex-center bg-dim shadow" style="border-radius: 24px 0px 0px 0px;padding:10px;width:50%;height:100px;max-width:500px;min-width:200px">
    <div ref="tr_content" class="fade-in">
      <span class="text f-large" v-if="tr.phase == 0">Welcome to <inline class="f-bold">Plymouth, MI</inline></span>
      <div v-if="tr.phase == 1">
        <span class="text f-medium">Today's Hours:</span>
        <div class="bg-dim" style="padding:8px;border-radius:8px;margin:10px 10px 0px 10px">
          <span class="text f-small">{{ hours }}</span>
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

  <div class="bottom-left bg-dim flex-center shadow" style="margin:20px;border-radius:16px;width:40%;height:80px;padding:10px" :style="message.show ? 'bottom:0' : 'bottom: -200px'">
    <div>
      
      <span class="f-medium text">{{ message.text }}</span>
    </div>
    
  </div>

  

  <div class="main flex-center " style="width:100%;margin:0px;padding:0px;border-radius:16px">
    <div class="fade-in-large" style="width:100%" :ref="'mainContent'">
      <component :is="this.mainFeatures.find(mF => this.screen == mF.name).component" :key="this.screenCheck"/>
    </div>
    
  </div>
  





  <div class="side-panel" style="margin-right:15px" :ref="'buttonPanel'">
    <div v-if="screen == 'coaches'" :key="this.screen">
      <div class="container bg-dim shadow" style="border-radius:40px;margin:10px 0px" v-for="feature in mainFeatures.filter(mF => mF.use && mF.name != this.screen)">
        <span class="material-icons-round text" style="font-size:25px;margin:5px">
          {{ feature.icon }}
        </span>
        <Key :character="buttonLetter(feature)" style="left:-10px;top:-5px"/>
      </div>
      
    </div>
    <div v-if="screen != 'coaches'" :key="this.screen">
      <div class="container bg-dim shadow" style="border-radius:40px;margin:10px 0px">
        <span class="material-icons-round text" style="font-size:25px;margin:5px">
          arrow_back
        </span>
        <Key :character="'0'" style="left:-10px;top:-5px"/>
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
  

  import Absent from '../components/features/Absent.vue';
  import Present from '../components/features/Present.vue';
  import Classes from '../components/features/Classes.vue';
  import Search from '../components/features/Search.vue';

  var mainFeatures = [
    {
      name: "coaches",
      icon: "",
      use: true,
      component: Classes
    },
    {
      name: "absent",
      icon: "person_remove",
      use: true,
      component: Absent
    },
    {
      name: "present",
      icon: "check",
      use: true,
      component: Present
    },
    {
      name: "settings",
      icon: "settings",
      use: true
    },
    {
      name: "search",
      icon: "search",
      use: true,
      component: Search
    }

  ]


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
        screen: "coaches",
        screenCheck: 0,
        updateStudentAbsentClasses: 0,
        statusCheck: 0,
        cacheClasses: {},
        studentClasses: {},
        visits: {},
        scroll:{
          dir: 1,
          amount: 1000
        },
        message:{
          text: "",
          show: false,
          icon: "",
        },
        hours: "-:-- to -:--",
        mainFeatures: mainFeatures,
        allPeople: [],
        showIdle: false,
        saveLatestTime: new Date()
      }
    },
    mounted() {

      // setTimeout(async () => {
      //   var totalPeople = 500;


      //   for(var i = 1; this.allPeople.length < totalPeople; i++){
      //     

      //     this.allPeople.concat(res.data.people);
          
      //   }


        
      // }, 500)
      

      document.addEventListener('keyup', (evt) => {

        if(this.$root.showAccessPanel){
          return;
        }

        switch(this.screen){
          case "coaches":
            this.mainFeatures.filter(mF => mF.use && mF.name != this.screen).forEach(mF => {
              if(this.buttonLetter(mF) == evt.key){
                this.switchScreen(mF.name);
              }
            })
            break;
          case "absent":
            if(evt.key == '0') {
              this.switchScreen('coaches');
            }

            // get index of key in letters
            var index = letters.indexOf(evt.key.toLowerCase())
            if(index < this.students.length){

              var closestClass = this.studentClasses[this.students[index].id][0];
              for(var i = 1; i < this.studentClasses[this.students[index].id].length; i++){
                var endDate = new Date(this.studentClasses[this.students[index].id][i].end_at);
                if((this.$root.now()).getTime() - endDate.getTime() < (this.$root.now()).getTime() - new Date(closestClass.end_at).getTime()){
                  closestClass = this.studentClasses[this.students[index].id][i];
                }
              }

              this.markStudentStatus(this.students[index], closestClass, "noshow", "cancel");
              this.showMessage(`${this.students[index].name} was marked as absent!`, 4000);
              this.switchScreen('coaches');
            }


            break;
          case "present":
            if(evt.key == '0') {
              this.switchScreen('coaches');
            }

            // get index of key in letters
            var index = letters.indexOf(evt.key.toLowerCase())
            if(index < this.students.length){

              var closestClass = this.studentClasses[this.students[index].id][0];
              for(var i = 1; i < this.studentClasses[this.students[index].id].length; i++){
                var endDate = new Date(this.studentClasses[this.students[index].id][i].end_at);
                if((this.$root.now()).getTime() - endDate.getTime() < (this.$root.now()).getTime() - new Date(closestClass.end_at).getTime()){
                  closestClass = this.studentClasses[this.students[index].id][i];
                }
              }

              this.markStudentStatus(this.students[index], closestClass, "complete", "check_circle");
              this.showMessage(`${this.students[index].name} was marked as present!`, 4000);
              this.switchScreen('coaches');
            }


            break;
          case "search":
            if(evt.key == '0') {
              this.switchScreen('coaches');
            }

            


            break;
        }
      })


      var token = this.$cookies.get('token')
      if(token == undefined) {
        window.location = `${this.$root.path}/oauth/authorize?client_id=${"H4DMGD1xMHHfRyUoz9mC7zH7ZT1Hvda7GUT0rgGU"}&response_type=code&redirect_uri=http://localhost:5173/auth`
      }

      setInterval(() => {
        this.timeStrings[0] = this.$root.now().toLocaleTimeString().split(' ')[0]
        this.timeStrings[1] = this.$root.now().toLocaleTimeString().split(' ')[1]
        this.loaded.time = true
        this.dateStrings[0] = days[this.$root.now().getDay()]
        this.dateStrings[1] = months[this.$root.now().getMonth()] + ' ' + this.$root.now().getDate() + (this.$root.now().getDate() >= 10 && this.$root.now().getDate() <= 19 ? 'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][this.$root.now().getDate() % 10]) + ', ' + this.$root.now().getFullYear()
      }, 200)

      setInterval(() => {
        this.refreshAPI()
      }, 20000);



      setInterval(() => {

        // this.$refs.scroll.scrollBy(0,this.scroll.dir* 1);
        // this.scroll.amount--;0
        // if(this.scroll.amount == 0){
        //   this.scroll.dir = -this.scroll.dir;
        //   this.scroll.amount = 1000;
        // }

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
      switchScreen(newScreen){
        this.$refs.mainContent.classList = 'fade-out-large';
        this.$refs.buttonPanel.style.opacity = '0';
        setTimeout(() => {
          this.screen = newScreen;

          this.screenCheck++;
          this.$refs.buttonPanel.style.opacity = '1';
          this.$refs.mainContent.classList = 'fade-in-large'
          

          
          
        }, 1100)

      },
      showMessage(text, duration, icon){
        if(this.message.show) return;

        this.message.text = text;
        this.message.icon = icon;
        this.message.show = true;

        setTimeout(() => {
          this.message.show = false;
        }, duration)
      },
      buttonLetter(fin){
        var useLetters = '01232456789';
        if(!fin.use) return '';
        var indexOfFeature = this.mainFeatures.filter(mF => mF.use && mF.name != this.screen).indexOf(fin);

        return useLetters.substring(indexOfFeature, indexOfFeature+1);
      },
      randomSelector(){
        this.randomSelectorNum = Math.floor(Math.random() * 1000)
      },
      getLetter(student){
        var index = this.students.findIndex(s => s.id == student.id)
        return letters[index % letters.length]
      
      },
      getClasses(student){
        return this.studentClasses[student.id];
      },
      getStatus(student, eO){
        var overrideeOID = student.eOID;

        var visit = this.visits[(overrideeOID == undefined ? eO.id : overrideeOID) + "-" + student.id];
        if(visit == undefined) return "";
        return visit.status;
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
        var localeStartMin = start.toLocaleString('en-US', { minute: 'numeric' });
        localeStartMin = parseInt(localeStartMin) < 10 ? "0" + localeStartMin : localeStartMin;

        var localeEnd = end.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        var localeEndMin = end.toLocaleString('en-US', { minute: 'numeric' });
        localeEndMin = parseInt(localeEndMin) < 10 ? "0" + localeEndMin : localeEndMin;
        return localeStart.split(" ")[0] + (localeStartMin != "00" ? ":" + localeStartMin : "") + (localeStart.split(" ")[1] != localeEnd.split(" ")[1] ? localeStart.split(" ")[1] : "") + "-" + localeEnd.split(" ")[0] + (localeEndMin != "00" ? ":" + localeEndMin : "") + localeEnd.split(" ")[1];
      },
      markStudentStatus(s, eO, status){
        // first have to get visit ids
        

        var overrideeOID = s.eOID;

        var visitToNote = this.visits[(overrideeOID == undefined ? eO.id : overrideeOID) + "-" + s.id];
        if(visitToNote == undefined) return;


        if(status == "complete" && visitToNote.status == "noshow") status = "reset";
        if(status == "noshow" && visitToNote.status == "complete") status = "reset";


        this.axios.put(`${this.$root.pathLocation}/api/v2/desk/visits/${visitToNote.id}`, {visit: {state_event: status}}, {headers: {'Authorization': `Bearer ${this.$cookies.get('token')}`}}).then((res) => {
          
        });
        visitToNote.status = status;
        this.visits[eO.id + "-" + s.id] = visitToNote;
        this.statusCheck++;
      },
      refreshAPI(){


        console.log(this.$root.now());

        var startDate = this.$root.now();
        startDate.setMinutes(0);
        startDate.setHours(0);
        var endDate = this.$root.now();
        endDate.setHours(23);
        endDate.setMinutes(59);

        Object.keys(this.actualClasses).forEach(key => {
          this.actualClasses[key] = []
        });

        var studentsCheck = [];

        var earliestTime = new Date('3000-01-01T00:00:00.000Z');
        var latestTime = new Date('1000-01-01T00:00:00.000Z');

        this.axios.get(`${this.$root.pathLocation}/api/v2/desk/event_occurrences?from=${startDate.toString()}&to=${endDate.toString()}`, {headers: {'Authorization': `Bearer ${this.$cookies.get('token')}`}}).then((res) => {
          res.data.event_occurrences = res.data.event_occurrences.sort((a,b) => new Date(a.start_at) > new Date(b.start_at) ? 1 : -1);
          res.data.event_occurrences.forEach(eO => {

            var plusOneMin = this.$root.now();
            plusOneMin.setMinutes(plusOneMin.getMinutes() + 1);

            
            if(new Date(eO.start_at) < earliestTime){
              earliestTime = new Date(eO.start_at);
            }      
            if(new Date(eO.end_at) > latestTime){
              latestTime = new Date(eO.end_at);
            }      
            // get each status and SAVE
            this.axios.get(`${this.$root.pathLocation}/api/v2/desk/event_occurrences/${eO.id}/visits`,{headers: {'Authorization': `Bearer ${this.$cookies.get('token')}`}}).then((vRes) => {
              vRes.data.visits.forEach(v => {
                this.visits[eO.id + "-" + v.person.id] = v;
              });
            });

            // cache them
            eO.people.forEach(p => {
              if(this.students.find(s => s.id == p.id) == undefined && p.name != "Trial Attendee"){
                this.students.push(p);
                studentsCheck.push(p);
                this.studentClasses[p.id] = [];
              } 


              if(p.name != "Trial Attendee" && this.studentClasses[p.id].find(c => c.id == eO.id) == undefined){
                this.studentClasses[p.id].push(eO);
              }
            });


            //if(new Date(eO.end_at) < plusOneMin) return;

            eO.staff_members.forEach(sM => {

              if(new Date(eO.end_at) < this.$root.now()) return;

              if(this.staff.find(s => s.id == sM.id) == undefined) {
                this.staff.push(sM)
                this.actualClasses[sM.id] = []
              }


              

              // check for duplicate eO with staff at same time
              var preveO = this.actualClasses[sM.id].find(e => e.start_at == eO.start_at && e.name == eO.name && e.end_at == eO.end_at);
              if(preveO != undefined) {


                eO.people.forEach(p => {
                  p.eOID = eO.id;
                })

                preveO.people = preveO.people.concat(eO.people)
                return;
              }


              this.actualClasses[sM.id].push(eO)

            });

            



          })
          console.log(this.staff)


          this.hours = this.timeRange(earliestTime, latestTime);
          this.saveLatestTime = latestTime;
          if(this.$root.now() > latestTime){
            this.showIdle = true;
          }else{
            this.showIdle = false;
          }

        }).catch((err) => {
          console.log(err)
        });

        


        // this.students.forEach(s => {
        //   if(studentsCheck.find(a => a.id == s.id) == undefined){
        //     // student no longer in schedule...
        //     this.students = this.students.filter(a => a.id != s.id);
        //     this.studentClasses[s.id] = [];
        //   }
        // })

        



        

        console.log(this.studentClasses)


      }
    }
  }
</script>