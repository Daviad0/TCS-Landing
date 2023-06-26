<template>
    <div style="margin-top:20px">
        <div style="width:100%" class="flex-center">
            <div class="bg-dim shadow" style="width:90%;padding:20px;border-radius: 16px;margin:10px 0px">
                <div class="flex-apart">
                    <span class="text f-large f-bold">Features</span>
                    <span class="text material-icons-round" @click="toggleSection('features')" :style="this.showSections.includes('features') ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)'">expand_more</span>
                </div>
                <div style="overflow-y:hidden;margin:0px 5px" :style="this.showSections.includes('features') ? 'max-height:100vh;padding-top:10px' : 'max-height:0px;padding-top:0px'">
                    <div class="flex-apart" style="margin:10px 0px">
                        <span class="text f-medium">Mark Students as Absent</span>
                    </div>
                    <div class="flex-apart" style="margin:10px 0px">
                        <span class="text f-medium">Mark Students as Present</span>
                    </div>
                </div>
                
            </div>
            
        </div>
        <div style="width:100%" class="flex-center">
            
            <div class="bg-dim shadow" style="width:90%;padding:20px;border-radius: 16px;margin:10px 0px">
                <div class="flex-apart">
                    <span class="text f-large f-bold">Theme</span>
                    <span class="text material-icons-round" @click="toggleSection('theme')" :style="this.showSections.includes('theme') ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)'">expand_more</span>
                </div>
                <div style="overflow-y:hidden;margin:0px 5px" :style="this.showSections.includes('theme') ? 'max-height:100vh;padding-top:10px' : 'max-height:0px;padding-top:0px'">
                    <div class="flex-apart" style="margin:10px 0px">
                        <span class="text f-medium">Color</span>
                        <input :value="this.$root.settings.color" class="bg-dim input" name="color" @change="handleInput($event)" type="color"/>
                    </div>
                    <div class="flex-apart" style="margin:10px 0px">
                        <span class="text f-medium">Custom Gradient</span>
                        <input :value="this.$root.settings.bggradient" style="width:50%" class="bg-dim input text" name="bggradient" @change="handleInput($event)" type="text"/>
                    </div>
                </div>
                
            </div>
        </div>
        
        
    </div>

</template>
<script>
export default {
    name: 'Settings',
    data() {
        return {
            showSections: []
        }
    },

    methods: {
        toggleSection(section){
            if(this.showSections.includes(section)){
                this.showSections.splice(this.showSections.indexOf(section), 1);
            }else{
                this.showSections.push(section);
            }
        },
        setSetting(setting, value){
            this.$root.settings[setting] = value;
        },
        handleInput(e){
            this.setSetting(e.target.name, e.target.value);
        }
    }
}
</script>