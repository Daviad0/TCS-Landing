<template>
    <div v-if="this.$parent.showIdle" style="height:80vh" class="flex-center fade-in-large">
        <div>
            <span class="f-xlarge text text-shadow-less" style="font-size:80px">Learn to code,</span>
            <div class="border-white flex-center" style="border-width:4px;height:400px;border-radius: 40px;margin:10px 0px">
                <img src="@/assets/tcs-logo.png" height="200"  style="margin-top:12px"/>
            </div>
            <span class="f-xlarge text f-bold text-shadow" style="font-size:90px">change the world</span>
        </div>
        
    </div>
    <div class="flex-center" style="flex-wrap:wrap;padding:10px 0px;align-items: start;">
        <div class="bg-white flex-center" style="border-radius: 16px;margin:10px;overflow:hidden" v-for="c in this.$parent.multiStaffClasses" >
            <div :style="!hideMultiClasses.includes(c.id) ? 'max-height:500px;margin:20px;opacity:1' : 'max-height:0px;margin:0px 20px;opacity:0'" :key="multiClassUpdate">
                <span class="f-medium" style="margin-bottom:15px;width:40vw" :style="`color:${this.$root.settings.color}`">{{ generateStringOfStaff(c.staff_members, c.id) }}</span>
                <ClassNode :classdata="c" :baselanding="this.$parent"/>
            </div>
            
        </div>
    </div>
    <div style="width:100%;overflow-y:scroll" ref="scroll" class="hidescroll" :style="this.$parent.multiStaffClasses.length > 0 ? 'max-height:60vh' : 'max-height:80vh'">
        
      <CoachNode v-for="staff in this.$parent.staff.sort((a,b) => a.name.localeCompare(b.name))" :key="staff.id" class="flex-center" :coach="staff"/>
    </div>

</template>
<script>
    export default {
        name: 'Classes',
        data(){
            return {
                hideMultiClasses: [],
                multiClassUpdate: 0
            }
        },
        
        methods: {
            checkShouldShow(){
                if(this.$root.now() > this.$parent.saveLatestTime){
                    this.$parent.showIdle = true;


                    var message = '';
                    if(this.$root.now().getHours() < 12){
                        message = 'Have a great rest of your morning! Thanks for coming to theCoderSchool!'
                    }else if(this.$root.now().getHours() < 16){
                        message = 'Have a great rest of your day! Thanks for coming to theCoderSchool!'
                    }else{
                        message = 'Have a great rest of your evening! Thanks for coming to theCoderSchool!'
                    }

                    this.$parent.showMessage(message, 10000);
                }
            },
            generateStringOfStaff(staffMembers, id){
                // EX: David Reeves, John Doe, and Jake Ludwig
                var str = '';
                for(var i = 0; i < staffMembers.length; i++){
                    if(i == staffMembers.length - 1){
                        str += 'and ' + staffMembers[i].name;
                    }else{
                        str += staffMembers[i].name + (staffMembers.length > 2 ? ', ' : ' ');
                    }
                }
                return str;
            },
            removeFromTimeSection(eO){
                setTimeout(() => {
                    var index = this.$parent.multiStaffClasses.indexOf(eO);
                    if(index > -1){
                        this.$parent.multiStaffClasses.splice(index, 1);
                    }
                },1000)  
                

                this.hideMultiClasses.push(eO.id);


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