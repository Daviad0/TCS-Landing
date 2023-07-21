<template>
    <div>
        <div class="flex-center" style="margin-bottom: 20px;">
            <div class="bg-dim shadow" style="padding:20px 80px;border-radius: 80px;margin-top:20px">
                <span class="f-xlarge text f-bold">{{ coach.name }}</span>
            </div>
        </div>
        <div ref="scroll" class="hidescroll" style="max-height:70vh;overflow-y: hidden;">
            <div class="flex-center" v-for="c in classes" style="margin:20px">
                <div style="width:90%" v-if="new Date(c.end_at) > this.$root.now()">
                    <div style="justify-content: left" class="flex-center">
                        <div class="bg-white" style="padding:6px 20px;border-radius: 8px 8px 0px 0px;;margin-left:20px">
                            <span class="f-small f-bold" :style="`color:${this.$root.settings.color}`">{{ timeRange(c.start_at, c.end_at) }} Class Notes</span>
                        </div>
                    </div>
                    <div class="bg-white" style="padding:20px;border-radius: 16px">
                        <div v-if="c.people.length < 3">
                            <div v-for="student in c.people" class="border-green" style="padding:10px;border-radius: 8px;margin:5px" :style="`border-color:${this.$root.settings.color}`">
                                <div class="flex-apart" style="margin:0px 5px">
                                    <span class="f-medium f-bold" :style="`color:${this.$root.settings.color}`" style="text-align: left;width:25%">{{ student.name }}</span>


                                    <div v-if="this.$parent.studentNoteDetail[student.id] != undefined && this.$parent.studentNoteDetail[student.id].language != 'None'" style="width:50%">
                                        <div class="flex-center">
                                            <div class="flex-center" style="margin:0px 10px">
                                                <span class="material-icons-round"  :style="`color:${this.$root.settings.color}`" style="transform: rotate(90deg);margin-right:10px">vertical_align_top</span>
                                                <span class="f-small" :style="`color:${this.$root.settings.color}`" style="text-align: left;">Last Coached by <strong>{{ this.$parent.studentNoteDetail[student.id].coach }}</strong></span>
                                            </div>
                                            <div class="flex-center" style="margin:0px 10px" :style="this.$parent.studentNoteDetail[student.id].app_name == 'None' ? 'opacity:0.7' : 'opacity:1'">
                                                <span class="material-icons-round"  :style="`color:${this.$root.settings.color}`" style="transform: rotate(90deg);margin-right:10px">local_offer</span>
                                                <span class="f-small" :style="`color:${this.$root.settings.color}`" style="text-align: left;">Working on <strong>{{ this.$parent.studentNoteDetail[student.id].app_name == 'None' ? 'No Project (At the Moment)' : this.$parent.studentNoteDetail[student.id].app_name }}</strong></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div style="width:25%;justify-content: right;" class="flex-center" v-if="this.$parent.studentNoteDetail[student.id] != undefined && this.$parent.studentNoteDetail[student.id].language != 'None'">
                                        <div class="bg-green" style="padding:6px 10px;border-radius: 8px;margin:5px" :style="`background-color:${this.$root.settings.color}`">
                                            <span class="f-small text">{{this.$parent.studentNoteDetail[student.id].language}}</span>
                                            
                                        </div>
                                        <div class="bg-green" style="padding:6px 10px;border-radius: 8px;margin:5px" :style="`background-color:${this.$root.settings.color}A0`">
                                            <span class="f-small text">{{this.$parent.studentNoteDetail[student.id].points}} Points</span>
                                            
                                        </div>

                                    </div>

                                    
                                    
                                    <div class="bg-gray" style="padding:6px 10px;border-radius: 8px;" v-if="this.$parent.studentNoteDetail[student.id] == undefined || this.$parent.studentNoteDetail[student.id].language == 'None'">
                                        <span class="f-small text">No Previous Notes</span>
                                        
                                    </div>
                                    
                                </div>
                                <div :style="`background-color:${this.$root.settings.color}30`" v-if="this.$parent.studentNoteDetail[student.id] != undefined && this.$parent.studentNoteDetail[student.id].language != 'None'" style="margin: 10px 10px;margin-bottom: 5px;padding:20px;border-radius: 8px;">
                                    <span :style="`color:${this.$root.settings.color}`" class="f-medium">
                                        {{ this.$parent.studentNoteDetail[student.id].description }}
                                    </span>
                                    <span style="justify-content: right;opacity:0.7;margin-top:10px" :style="`color:${this.$root.settings.color}`" class="f-small flex-center">
                                        Written on 
                                        <div class="bg-green" style="padding:6px 10px;border-radius: 8px;margin-left:7px" :style="`background-color:${this.$root.settings.color}90`">
                                            <span class="f-bold f-small text">{{ new Date(this.$parent.studentNoteDetail[student.id].date).toLocaleString() }}</span>
                                            
                                        </div>
                                    </span>

                                    
                                </div>
                                
                                

                            </div>
                        </div>
                        <div v-if="c.people.length >= 3" class="flex-center" style="flex-wrap: wrap;">
                            <div v-for="student in c.people" class="border-green flex-center" style="padding: 6px 12px;border-radius: 8px;margin:5px" :style="`border-color:${this.$root.settings.color}`">
                                <span class="f-medium f-bold"  :style="`color:${this.$root.settings.color}`">{{ student.name }}</span>
                                <div class="bg-green" style="padding:6px 10px;border-radius: 8px;margin-left:10px" :style="`background-color:${this.$root.settings.color}`" v-if="this.$parent.studentNoteDetail[student.id] != undefined && this.$parent.studentNoteDetail[student.id].language != 'None'">
                                    <span class="f-small text">{{this.$parent.studentNoteDetail[student.id].language}}</span>
                                    
                                </div>
                                

                            </div>
                        </div>
                        
                    </div>
                </div>
                <div style="width:90%" v-if="new Date(c.end_at) < this.$root.now()">
                    <div class="bg-white flex-apart" style="padding:20px;border-radius: 16px">
                        <span class="f-medium f-bold" :style="`color:${this.$root.settings.color}`">{{ timeRange(c.start_at, c.end_at) }} Class</span>
                        <span class="material-icons-round" :style="`color:${this.$root.settings.color}`" style="font-size:30px">check_circle</span>
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: "Coach",
        data(){
            return {
                coach: this.$parent.featureData,
                classes: this.$parent.actualClasses[this.$parent.featureData.id]
            }
        },
        methods: {
            generateStringOfStudents(students){
                // EX: David Reeves, John Doe, and Jake Ludwig
                var str = '';
                for(var i = 0; i < students.length; i++){
                    if(i == students.length - 1){
                        str += 'and ' + students[i].name;
                    }else{
                        str += students[i].name + (students.length > 2 ? ', ' : ' ');
                    }
                }
                return str;
            },
            timeRange(dStart, dEnd){
                var start = new Date(dStart);
                var end = new Date(dEnd);
                var localeStart = start.toLocaleString('en-US', { hour: 'numeric', hour12: true });
                var localeStartMin = start.toLocaleString('en-US', { minute: 'numeric' });
                localeStartMin = parseInt(localeStartMin) < 10 ? "0" + localeStartMin : localeStartMin;

                var localeEnd = end.toLocaleString('en-US', { hour: 'numeric', hour12: true });
                var localeEndMin = end.toLocaleString('en-US', { minute: 'numeric' });
                localeEndMin = parseInt(localeEndMin) < 10 ? "0" + localeEndMin : localeEndMin;
                return localeStart.split(" ")[0] + (localeStartMin != "00" ? ":" + localeStartMin : "") + (localeStart.split(" ")[1] != localeEnd.split(" ")[1] ? localeStart.split(" ")[1] : "") + "-" + localeEnd.split(" ")[0] + (localeEndMin != "00" ? ":" + localeEndMin : "") + localeEnd.split(" ")[1];
            }
        },
        mounted(){
            setInterval(() => {
                this.$refs.scroll.scrollBy(0,this.$parent.scroll.dir* 1);
                this.$parent.scroll.amount--;0
                if(this.$parent.scroll.amount == 0){
                  this.$parent.scroll.dir = -this.$parent.scroll.dir;
                  this.$parent.scroll.amount = 1000;
                }
            }, 100)
        }
    }
</script>