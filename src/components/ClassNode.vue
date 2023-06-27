<template>

    <div class="container" :class="selected ? `bg-light${color} ${color}glow border-${color}` : `bg-verylight${color} border-light${color}`" :style="closing ? 'width:0px;opacity:0%;padding:0px;margin:0px' : `width:${width};opacity:100%;margin:5px`" style="border-radius:16px;overflow-x:hidden">
        <div :style="`width:${width}`">
            <div class="flex-apart">
                <div class="flex-center">
                    <span class="material-icons-round" :class="selected ? `color-${color}` : `color-${color}`" style="margin-right:8px;font-size:30px">{{ icon}}</span>
                    <span class="f-medium" :class="selected ? `color-${color}` : `color-${color}`">{{ getFirstThreeWords(this.class.name) }}</span>
                </div>
                
                <div :class="!selected ? `bg-white` : `bg-${color}`" style="padding:5px 8px;border-radius: 8px;">
                    <span class="f-small" :class="selected ? 'text' : `color-${color}`">{{ selected ? 'Until ' + untilTime : timeRange }}</span>
                </div>
            </div>
            <div class="flex-center" style="flex-wrap:wrap;margin-top:5px" v-if="this.class.people.length > 0">
                <div :class="this.baselanding.getStatus(person, this.classdata) == 'complete' ? `border-${color}` : ''" class="bg-white shadow-less" v-for="person in this.class.people" :key="person.id" style="padding:4px 8px;border-radius: 8px;margin:4px">
                    <div class="flex-center">
                        <span class="material-icons-round" style="font-size:18px;margin-right:5px" :class="`color-red`" v-if="this.baselanding.getStatus(person, this.classdata) == 'noshow'">cancel</span>
                        <span class="material-icons-round" style="font-size:18px;margin-right:5px" :class="`color-${color}`" v-if="this.baselanding.getStatus(person, this.classdata) == 'complete'">check_circle</span>
                        <span class="f-small" :class="this.baselanding.getStatus(person, this.classdata) == 'noshow' ? 'color-red' :`color-${color}`" :style="this.baselanding.getStatus(person, this.classdata) == 'noshow' ? 'text-decoration:line-through' : ''">{{ person.name }}</span>
                        <div :class="`bg-${color}`" :style="selected ? 'opacity:1' : 'opacity:0.8'" style="padding:4px 8px;border-radius: 8px;margin-left:8px" v-if="getLanguage(person.id) != 'None'">
                            <span class="text" style="font-size:0.6rem">{{ getLanguage(person.id) }}</span>
                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>


var lookConfigs = [
    {
        search: "trial",
        icon: "public",
        color: "yellow"
    },
    {
        search: "internal",
        icon: "forum",
        color: "gray"
    },
    {
        search: "make",
        icon: "history",
        color: "green"
    },
    
    {
        search: "camp",
        icon: "school",
        color: "blue"
    },
    {
        search: "virtual",
        icon: "computer",
        color: "green"
    },
    {
        search: "2:1",
        icon: "group",
        color: "green"
    },
    {
        search: "1:1",
        icon: "face",
        color: "green"
    },
]

export default {
    name: 'ClassNode',
    props: {
        classdata: Object,
        baselanding: Object
    },
    data() {
        return {
            class: this.classdata,
            selected: false,
            closing: false,
            lookConfigs: lookConfigs,
            color: "green",
            icon: "face",
            width: "320px",
        }
    },
    mounted() {

        var now = this.$root.now();
        // check if started
        if(now.getTime() > new Date(this.class.start_at).getTime()){
            // check if ended
            this.selected = true;
        }
        

        let res = this.appropriateLookObject(this.class.name, this.class.people.length);
        this.color = res.color;
        this.icon = res.icon;

        if(this.class.people.length > 3){
            this.width = "40vw";
            this.color = "blue";
            this.icon = "star"
        }

        this.checkTimer = setInterval(() => {
            var now = this.$root.now();
            // check if started
            if(now.getTime() > new Date(this.class.start_at).getTime()){
                // check if ended
                this.selected = true;
            }

            if(now.getTime() > new Date(this.class.end_at).getTime()){
                // check if ended
                this.closing = true;
                this.checkTimer = null;

                setTimeout(() => {
                    this.$parent.removeFromTimeSection(this.class);
                }, 1000)
            }
        }, 1000)
    },
    methods: {
        close(){
            this.closing = true
        },
        getFirstThreeWords(string){
            return string.split(" ").slice(0, 3).join(" ");
        },
        appropriateLookObject(name, students){
            var config = this.lookConfigs.find(config => name.toLowerCase().includes(config.search));
            if(config == undefined){
                config = {
                    icon: "face",
                    color: "green"
                }
            }
            return config;
        },
        getLanguage(sid){
            if(this.baselanding.studentNoteDetail[sid] == undefined){
                return "None"
            }
            return this.baselanding.studentNoteDetail[sid].language;
        }
    },
    computed: {
        untilTime(){
            var date = new Date(this.class.end_at);
            var localeHour = date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
            var localeMin = date.toLocaleString('en-US', { minute: 'numeric' });
            localeMin = parseInt(localeMin) < 10 ? "0" + localeMin : localeMin;
            return localeHour.split(" ")[0] + (localeMin != "00" ? ":" + localeMin : "") + localeHour.split(" ")[1];
        },
        timeRange(){
            var start = new Date(this.class.start_at);
            var end = new Date(this.class.end_at);
            var localeStart = start.toLocaleString('en-US', { hour: 'numeric', hour12: true });
            var localeStartMin = start.toLocaleString('en-US', { minute: 'numeric' });
            localeStartMin = parseInt(localeStartMin) < 10 ? "0" + localeStartMin : localeStartMin;

            var localeEnd = end.toLocaleString('en-US', { hour: 'numeric', hour12: true });
            var localeEndMin = end.toLocaleString('en-US', { minute: 'numeric' });
            localeEndMin = parseInt(localeEndMin) < 10 ? "0" + localeEndMin : localeEndMin;
            return localeStart.split(" ")[0] + (localeStartMin != "00" ? ":" + localeStartMin : "") + (localeStart.split(" ")[1] != localeEnd.split(" ")[1] ? localeStart.split(" ")[1] : "") + "-" + localeEnd.split(" ")[0] + (localeEndMin != "00" ? ":" + localeEndMin : "") + localeEnd.split(" ")[1];
        }
    }
}

</script>
