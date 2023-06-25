<template>
    <div style="position: relative;">
        <div class="border-green bg-white flex-center f-bold" style="border-radius:8px;height:20px;position:absolute" :style="character.length > 1 ? 'width:unset;padding:0px 5px' : 'width:20px'">
            <span class="f-small color-green">{{ character }}</span>
        </div>
    </div>
    
</template>
<script>
    export default{
        name: "Key",
        props: {
            character: String,
        },
        data(){
            return {
                character: this.character,
                selected: false,
            }
        },
        mounted(){
            
        },
    }

</script>