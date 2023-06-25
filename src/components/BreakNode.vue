<template>

    <div class="container bg-lightgray flex-center" :class="expanded ? 'bg-gray border-gray' : 'bg-lightgray border-lightgray'" :style="closing ? 'margin:0px;padding:0px;width:0px;opacity:0%' : (expanded ? 'width:200px;opacity:100%;margin:5px' : 'width:50px;opacity:100%;margin:5px')" style="border-radius:16px;height:60px;overflow-x:hidden">
        <div v-if="expanded">
            <div class="flex-center">
                <span class="material-icons-round text" style="margin-right:5px">hotel</span>
                <span class="f-medium text">{{ minutes > 60 ? 'Off Work' : 'Break'}}</span>
            </div>
            <span class="text f-large" style="margin-top:5px" v-if="minutes > 60">
                Until {{ this.$parent.$parent.$parent.untilTime(this.breakEndTime) }}
            </span>
            <span class="text f-large" style="margin-top:5px" v-if="minutes <= 60">
                {{ breakTimeText }}
            </span>
        </div>

        <div v-if="!expanded" class="flex-center">
            <span class="material-icons-round color-gray" style="font-size:32px">hotel</span>
        </div>

        
    </div>
</template>

<script>

export default {
    name: 'BreakNode',
    props: {
        class: Object,
        breakdata: Object,
    },
    data() {
        return {
            class: this.class,
            expanded: false,
            closing: false,
            breakEndTime: undefined,
            breakTimeText: '-:--',
            minutes: 0,
        }
    },
    mounted() {
        if((this.$root.now()).getTime() > (new Date(this.breakdata.start_at)).getTime()){

            this.breakEndTime = new Date(this.breakdata.end_at);

            this.triggerBreakStart();

        }
        setInterval(() => {
            if((this.$root.now()).getTime() > (new Date(this.breakdata.start_at)).getTime()){

                this.breakEndTime = new Date(this.breakdata.end_at);

                this.triggerBreakStart();

            }
        }, 500)
    },
    methods: {
        close(){
            this.closing = true
        },
        triggerBreakStart(){
            

            setInterval(() => {
                if(this.breakEndTime < this.$root.now()){
                    this.breakTimeText = '0:00'
                    this.close()
                    return;
                }

                let diff = this.breakEndTime - this.$root.now();
                this.minutes = Math.floor((diff/1000)/60)
                let seconds = Math.floor((diff/1000)%60)
                this.breakTimeText = `${this.minutes}:${seconds.toString().padStart(2, '0')}`
            }, 100)

            this.expanded = true
        }
    }
}

</script>