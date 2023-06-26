<template>
    <div ref="base" class="flex-center" style="padding:0px;align-items: start" :style="show ? 'margin:20px 0px;max-height:800px;overflow-y:hidden;opacity:1' : 'margin:0px;max-height:0px;overflow-y:hidden;margin-top:-20px;opacity:0'">
        <div style="width:30%;border-radius: 16px 0px 0px 16px;padding:20px 0px;max-width:400px;min-width:250px" class="bg-white container">
            <span class="text f-xlarge f-bold" style="margin:5px" :style="`color:${this.$root.settings.color}`">{{ coach.name }}</span>
            <span class="text f-medium" style="margin:5px" :style="`color:${this.$root.settings.color}`">Working until {{ latest }}</span>
        </div>
        <div style="width:62%;border-radius: 0px 16px 16px 16px;min-height:150px;padding:20px;flex-wrap: wrap;" class="bg-white container flex-center" :key="timeSections">
            <div v-for="ts in timeSections">
                <ClassNode v-if="ts.type == 'class'" :classdata="ts.data"/>
                <BreakNode v-if="ts.type == 'break'" :breakdata="ts.data"/>
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
                showClasses: [],
                latest: "",
                show: true,
            }
        },
        mounted() {
            this.updateTimeSections();
            
        },
        methods: {
            removeFromTimeSection(eO){

                if(this.timeSections.find(e => e.data.id == eO.id) == undefined) return;

                this.timeSections = this.timeSections.filter((e) => {
                    return e.data.id != eO.id;
                });

                if(this.timeSections.filter(t => t.type == 'class').length == 0){
                    // collapse coach
                    this.show = false;
                    setTimeout(() => {
                        this.$refs.base.style.display = "none";
                    }, 1000);
                    setTimeout(() => {
                        this.$parent.checkShouldShow();
                    }, 2000);
                    
                }

               
            },
            updateTimeSections(){
                var latestTime = new Date("1/1/1970");
                this.timeSections = [];

                this.$parent.$parent.actualClasses[this.coach.id] = this.$parent.$parent.actualClasses[this.coach.id].sort((a, b) => {
                    var aDate = new Date(a.start_at);
                    var bDate = new Date(b.start_at);
                    return aDate.getTime() - bDate.getTime();
                });

                for(let i = 0; i < this.$parent.$parent.actualClasses[this.coach.id].length; i++){
                    var c = this.$parent.$parent.actualClasses[this.coach.id][i];
                    
                    if(new Date(c.end_at).getTime() > latestTime.getTime()){
                        latestTime = new Date(c.end_at);
                        this.latest = latestTime.toLocaleString('en-US', { hour: 'numeric', hour12: true });
                    }

                    if(i > 0){
                        // check for break...
                        var endPrev = new Date(this.$parent.$parent.actualClasses[this.coach.id][i-1].end_at);
                        var startThis = new Date(c.start_at);

                        var diff = startThis.getTime() - endPrev.getTime();

                        if(diff > 0 && startThis > this.$root.now()){
                            // there is a break
                            this.timeSections.push({
                                type: "break",
                                data: {
                                    start_at: endPrev,
                                    end_at: startThis,
                                    time: diff
                                }
                            });
                        }

                    }
                    // else{
                    //     if(this.$root.now() < new Date(c.start_at)){
                    //         // there is a break
                    //         this.timeSections.push({
                    //             type: "break",
                    //             data: {
                    //                 start_at: this.$root.now(),
                    //                 end_at: new Date(c.start_at),
                    //                 time: new Date(c.start_at).getTime() - this.$root.now().getTime()
                    //             }
                    //         });
                    //     }
                    // }

                    if(this.$root.now() > new Date(c.end_at)){
                        continue;
                    }

                    this.timeSections.push({
                        type: "class",
                        data: c
                    });
                }
                if(this.timeSections.filter(t => t.type == 'class').length == 0){
                    // collapse coach
                    this.show = false;
                    setTimeout(() => {
                        this.$refs.base.style.display = "none";
                    }, 1000);
                }
            }
        }
    }
</script>