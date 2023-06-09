<template>

    <div class="container bg-lightgray border-gray flex-center" :class="expanded ? 'bg-gray' : 'bg-lightgray'" :style="closing ? 'margin:0px;padding:0px;width:0px;opacity:0%' : (expanded ? 'width:250px;opacity:100%;margin:5px' : 'width:50px;opacity:100%;margin:5px')" style="border-radius:16px;height:60px;overflow-x:hidden" @click="triggerBreakStart()">
        <div v-if="expanded">
            <div class="flex-center">
                <span class="material-icons-round text" style="margin-right:5px">hotel</span>
                <span class="f-medium text">Break</span>
            </div>
            <span class="text f-large" style="margin-top:5px">
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
        class: Object
    },
    data() {
        return {
            class: this.class,
            expanded: false,
            closing: false,
            breakEndTime: undefined,
            breakTimeText: '15:00'
        }
    },
    mounted() {
        
    },
    methods: {
        close(){
            this.closing = true
        },
        triggerBreakStart(){
            this.breakEndTime = new Date()
            this.breakEndTime.setSeconds(this.breakEndTime.getSeconds() + 15)

            setInterval(() => {
                if(this.breakEndTime < new Date()){
                    this.breakTimeText = '0:00'
                    this.close()
                    return;
                }

                let diff = this.breakEndTime - new Date();
                let minutes = Math.floor((diff/1000)/60)
                let seconds = Math.floor((diff/1000)%60)
                this.breakTimeText = `${minutes}:${seconds.toString().padStart(2, '0')}`
            }, 100)

            this.expanded = true
        }
    }
}

</script>