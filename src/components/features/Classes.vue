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
    <div style="width:100%;max-height:80vh;overflow-y:scroll" ref="scroll" class="hidescroll">
      <CoachNode v-for="staff in this.$parent.staff.sort((a,b) => a.name.localeCompare(b.name))" :key="staff.id" class="flex-center" :coach="staff"/>
    </div>

</template>
<script>
    export default {
        name: 'Classes',
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