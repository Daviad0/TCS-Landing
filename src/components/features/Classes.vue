<template>
    <div v-if="this.$parent.showIdle" style="height:80vh" class="flex-center fade-in-large">
        <div>
            <span class="f-xlarge text text-shadow-less" style="font-size:80px">Learn to code,</span>
            <div class="flex-center">
                <div class="border-white flex-center" style="border-width:4px;height:400px;border-radius: 40px;margin:10px 0px;width:70vw">
                    <div id="idlecontent" class="fade-in" style="width:100%">
                        <div v-if="this.landingBox.organization == 'vert'" style="width:100%;height:100%">
                            <div class="container bg-white flex-apart" style="margin:10px 20px;border-radius: 16px;padding:10px 30px" v-for="review in this.landingBox.toUse" :style="this.landingBox.toUse.length == 1 ? 'min-height:300px' : 'min-height:140px'">
                                <img style="border-radius: 16px;" width="100" height="100" :src="`https://server.thecoderschool.com/appgallery/images/app${review.app_id}.png`" onerror="this.src = '/src/assets/circle-logo.png'"/>
                                <div style="margin-left:30px;height:110px;width:85%">
                                    <div class="flex-apart">
                                        <span class="f-large f-bold" :style="`color:${this.$root.settings.color}`" style="text-align: left;"> {{ review.app_name }}</span>
                                        <div class="flex-center">
                                            <span class="f-medium" style="text-align: right;margin-right:15px" :style="`color:${this.$root.settings.color}`"> {{ review.firstname }} {{ review.lastname.substring(0,1) }}.</span>
                                            <div class="bg-green" style="padding:6px 10px;border-radius: 8px;" :style="`background-color:${this.$root.settings.color}`">
                                                <span class="f-small text">{{ review.location }}</span>
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <span class="f-medium twolineclamp" style="text-align: left;margin-left:10px;margin-top:5px;word-wrap: break-word;text-overflow: ellipsis;overflow: hidden;max-lines: 2;">{{ review.description }}</span>
                                    
                                </div>
                            </div>
                            
                            
                        </div>
                        <div v-if="this.landingBox.organization == 'horz'" class="flex-center">
                            <div class="container bg-white" style="width:40%;height:300px;margin:10px;border-radius: 16px;padding:20px" v-for="review in this.landingBox.toUse">
                                <div class="flex-apart" style="flex-direction: column;height:100%">
                                    <div>
                                        <span class="f-large f-bold" :style="`color:${this.$root.settings.color}`"> {{ review.app_name }}</span>
                                        <span class="f-medium fourlineclamp" style="text-align: center;margin-top:10px;word-wrap: break-word;text-overflow: ellipsis;overflow: hidden;max-lines: 2;">{{ review.description }}</span>
                                    </div>
                                    <div class="flex-apart" style="width:100%;align-items: end;">
                                        <img style="border-radius: 16px;" width="100" height="100" :src="`https://server.thecoderschool.com/appgallery/images/app${review.app_id}.png`" onerror="this.src = '/src/assets/circle-logo.png'"/>
                                        <div>
                                            <div class="bg-green" style="padding:6px 10px;border-radius: 8px;" :style="`background-color:${this.$root.settings.color}`">
                                                <span class="f-small text">{{ review.location }}</span>
                                                
                                            </div>
                                            <span class="f-medium" style="text-align: right;margin-top:5px" :style="`color:${this.$root.settings.color}`"> {{ review.firstname }} {{ review.lastname.substring(0,1) }}.</span>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
            <span class="f-xlarge text f-bold text-shadow" style="font-size:90px">change the world</span>
        </div>
        
    </div>
    <div v-if="!this.$parent.showIdle" class="flex-center" style="flex-wrap:wrap;padding:10px 0px;align-items: start;">
        <div class="bg-white flex-center" style="border-radius: 16px;margin:10px;overflow:hidden" v-for="c in this.$parent.multiStaffClasses" >
            <div :style="!hideMultiClasses.includes(c.id) ? 'max-height:500px;margin:20px;opacity:1' : 'max-height:0px;margin:0px 20px;opacity:0'" :key="multiClassUpdate">
                <div class="flex-center">
                    <span class="f-medium" style="margin-bottom:15px;width:40vw" :style="`color:${this.$root.settings.color}`">{{ generateStringOfStaff(c.staff_members, c.id) }}</span>
                </div>
                
                <ClassNode :classdata="c" :baselanding="this.$parent"/>
            </div>
            
        </div>
    </div>
    <div v-if="!this.$parent.showIdle" style="width:100%;overflow-y:scroll" ref="scroll" class="hidescroll" :style="this.$parent.multiStaffClasses.length > 0 ? 'max-height:60vh' : 'max-height:80vh'">
        
      <CoachNode v-for="staff in this.$parent.staff.sort((a,b) => a.name.localeCompare(b.name))" :key="staff.id" class="flex-center" :coach="staff"/>
    </div>

</template>
<script>

    var organizations = ['horz', 'vert']

    export default {
        name: 'Classes',
        data(){
            return {
                hideMultiClasses: [],
                multiClassUpdate: 0,
                landingBox: {
                    changeTime: new Date(),
                    organization: "vert",
                    toUse: []
                },
                rememberSeed: this.$parent.pageKeySeed

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

            setTimeout(() => {
                this.landingBox.toUse = [];
                var random1 = Math.floor(Math.random() * this.$root.appReviews.length);
                var random2 = Math.floor(Math.random() * this.$root.appReviews.length);

                this.landingBox.toUse.push(this.$root.appReviews[random1]);
                this.landingBox.toUse.push(this.$root.appReviews[random2]);
            }, 2000);
            
            setInterval(() => {

                if(this.$parent.pageKeySeed != this.rememberSeed) return;

                if(new Date() > this.landingBox.changeTime){



                    this.landingBox.changeTime = new Date();
                    this.landingBox.changeTime.setSeconds(this.landingBox.changeTime.getSeconds() + 10);
                    

                    var element = document.getElementById('idlecontent');
                    if(element == null){
                        return;
                    }

                    element.classList = 'fade-out';
                    setTimeout(() => {
                        this.landingBox.toUse = [];


                        // pick two random items out of this.$root.allReviews
                        var random1 = Math.floor(Math.random() * this.$root.appReviews.length);
                        var random2 = Math.floor(Math.random() * this.$root.appReviews.length);

                        this.landingBox.toUse.push(this.$root.appReviews[random1]);
                        this.landingBox.toUse.push(this.$root.appReviews[random2]);
                        this.landingBox.organization = organizations[Math.floor(Math.random() * organizations.length)];
                        
                        setTimeout(() => {
                            
                            element.classList = 'fade-in'
                        

                        
                        
                        }, 300)

                    
                    
                    }, 1000)
                    
                }
            },100);


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