<template>
    <div>
        <div class="border-green bg-white flex-center f-bold" style="border-radius:8px;height:20px" :style="(character.length > 1 ? 'width:unset;padding:0px 5px' : 'width:20px') + `;border-color:${this.$root.settings.color}`">
            <span class="f-small" :style="`color:${this.$root.settings.color}`">{{ character }}</span>
        </div>
    </div>
    
</template>
<script>
    export default{
        name: "KeyInline",
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