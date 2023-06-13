<template>

    <div class="container" :class="selected ? `bg-light${color} ${color}glow border-${color}` : `bg-verylight${color} border-light${color}`" :style="closing ? 'width:0px;opacity:0%;padding:0px;margin:0px' : `width:${width};opacity:100%;margin:5px`" style="border-radius:16px;overflow-x:hidden" @click="selected = !selected">
        <div :style="`width:${width}`">
            <div class="flex-apart">
                <div class="flex-center">
                    <span class="material-icons-round" :class="selected ? `color-${color}` : `color-${color}`" style="margin-right:5px">{{ icon}}</span>
                    <span class="f-small" :class="selected ? `color-${color}` : `color-${color}`">{{ getFirstThreeWords(this.class.name) }}</span>
                </div>
                
                <div :class="!selected ? 'bg-white' : `bg-${color}`" style="padding:5px 8px;border-radius: 8px;">
                    <span class="f-small" :class="selected ? 'text' : `color-${color}`">{{ selected ? 'Until ' + untilTime : timeRange }}</span>
                </div>
            </div>
            <div class="flex-center" style="flex-wrap:wrap;margin-top:5px" v-if="this.class.people.length > 0">
                <div class="bg-white shadow-less flex-center" v-for="person in this.class.people" :key="person.id" style="padding:4px 8px;border-radius: 8px;margin:4px">
                    <span class="material-icons-round" style="font-size:18px;margin-right:5px" :class="`color-red`" v-if="this.$parent.$parent.getStatus(person, this.classdata) == 'noshow'">cancel</span>
                    <span class="material-icons-round" style="font-size:18px;margin-right:5px" :class="`color-${color}`" v-if="this.$parent.$parent.getStatus(person, this.classdata) == 'complete'">check_circle</span>
                    <span class="f-small" :class="this.$parent.$parent.getStatus(person, this.classdata) == 'noshow' ? 'color-red' :`color-${color}`" :style="this.$parent.$parent.getStatus(person, this.classdata) == 'noshow' ? 'text-decoration:line-through' : ''">{{ person.name }}</span>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>


var lookConfigs = [
    {
        search: "trial",
        icon: "warning",
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
        classdata: Object
    },
    data() {
        return {
            class: this.classdata,
            selected: false,
            closing: false,
            lookConfigs: lookConfigs,
            color: "green",
            icon: "face",
            width: "260px",
        }
    },
    mounted() {


        

        let res = this.appropriateLookObject(this.class.name, this.class.people.length);
        this.color = res.color;
        this.icon = res.icon;

        if(this.class.people.length > 3){
            this.width = "400px";
            this.color = "blue";
            this.icon = "star"
        }

        this.checkTimer = setTimeout(() => {
            var now = new Date();
            // check if started
            if(now.getTime() > new Date(this.class.start_at).getTime()){
                // check if ended
                this.selected = true;
            }

            if(now.getTime() > new Date(this.class.end_at).getTime()){
                // check if ended
                this.closing = true;
                this.checkTimer = null;
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
        }
    },
    computed: {
        untilTime(){
            var date = new Date(this.class.end_at);
            var localeHour = date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
            return localeHour.split(" ")[0] + localeHour.split(" ")[1];
        },
        timeRange(){
            var start = new Date(this.class.start_at);
            var end = new Date(this.class.end_at);
            var localeStart = start.toLocaleString('en-US', { hour: 'numeric', hour12: true });
            var localeEnd = end.toLocaleString('en-US', { hour: 'numeric', hour12: true });
            return localeStart.split(" ")[0] + (localeStart.split(" ")[1] != localeEnd.split(" ")[1] ? localeStart.split(" ")[1] : "") + "-" + localeEnd.split(" ")[0] + localeEnd.split(" ")[1];
        }
    }
}

</script>