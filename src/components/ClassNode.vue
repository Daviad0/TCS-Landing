<template>

    <div class="container border-green" :class="selected ? 'bg-green greenglow' : 'bg-light'" :style="closing ? 'width:0px;opacity:0%;padding:0px;margin:0px' : 'width:250px;opacity:100%;margin:5px'" style="border-radius:16px;min-height:60px;overflow-x:hidden" @click="close()">
        <div class="flex-apart">
            <div class="flex-center">
                <span class="material-icons-round" :class="selected ? 'text' : 'color-green'" style="margin-right:5px">face</span>
                <span class="f-medium" :class="selected ? 'text' : 'color-green'">2:1 Class</span>
            </div>
            
            <div :class="selected ? 'bg-white' : 'bg-green'" style="padding:5px 8px;border-radius: 8px;">
                <span class="f-small" :class="!selected ? 'text' : 'color-green'">{{ selected ? 'Until 5PM' : '4-5PM' }}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ClassNode',
    props: {
        class: Object
    },
    data() {
        return {
            class: this.class,
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
    }
}

</script>