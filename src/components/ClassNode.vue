<template>

    <div class="container border-green" :class="selected ? 'bg-green greenglow' : 'bg-light'" :style="closing ? 'width:0px;opacity:0%;padding:0px;margin:0px' : 'width:250px;opacity:100%;margin:5px'" style="border-radius:16px;min-height:60px;overflow-x:hidden" @click="close()">
        <div class="flex-apart">
            <div class="flex-center">
                <span class="material-icons-round" :class="selected ? 'text' : 'color-green'" style="margin-right:5px">face</span>
                <span class="f-small" :class="selected ? 'text' : 'color-green'">{{ this.class.name }}</span>
            </div>
            
            <div :class="selected ? 'bg-white' : 'bg-green'" style="padding:5px 8px;border-radius: 8px;">
                <span class="f-small" :class="!selected ? 'text' : 'color-green'">{{ selected ? 'Until ' + untilTime : timeRange }}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ClassNode',
    props: {
        classdata: Object
    },
    data() {
        return {
            class: this.classdata,
            selected: false,
            closing: false
        }
    },
    mounted() {
        
    },
    methods: {
        close(){
            this.closing = true
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