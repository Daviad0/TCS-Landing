<template>
    <div style="position: relative;">
        <div class="border-green bg-white flex-center f-bold" style="border-radius:8px;width:20px;height:20px;position:absolute">
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