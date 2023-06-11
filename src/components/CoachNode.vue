<template>
    <div class="flex-center" style="padding:0px;align-items: start;">
        <div style="width:40%;border-radius: 16px 0px 0px 16px;padding:20px 0px;max-width:400px;min-width:300px" class="bg-white container">
            <span class="text color-green f-xlarge f-bold" style="margin:5px">{{ coach.name }}</span>
            <span class="text color-green f-medium" style="margin:5px">Working until 8PM</span>
        </div>
        <div style="width:55%;border-radius: 0px 16px 16px 16px;min-height:150px;padding:20px;flex-wrap: wrap;" class="bg-white container flex-center">
            <div v-for="ts in timeSections">
                <ClassNode v-if="ts.type == 'class'" :classdata="ts.data"/>
                <BreakNode v-if="ts.type == 'break'"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CoachNode',
        props: {
            coach: Object
        },
        data() {
            return {
                coach: this.coach,
                timeSections: [],
                showClasses: []
            }
        },
        mounted() {
            this.updateTimeSections();
        },
        methods: {
            updateTimeSections(){
                this.timeSections = [];
                for(let i = 0; i < this.$parent.actualClasses[this.coach.id].length; i++){
                    var c = this.$parent.actualClasses[this.coach.id][i];
                    
                    if(i > 0){
                        // check for break...
                        var endPrev = new Date(this.$parent.actualClasses[this.coach.id][i-1].end_at);
                        var startThis = new Date(c.start_at);

                        var diff = startThis.getTime() - endPrev.getTime();

                        if(diff > 0){
                            // there is a break
                            this.timeSections.push({
                                type: "break",
                                start_at: endPrev,
                                end_at: startThis,
                                time: diff
                            });
                        }

                    }

                    this.timeSections.push({
                        type: "class",
                        data: c
                    });
                }
            }
        }
    }
</script>