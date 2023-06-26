<template>
    <div>
        <div class="flex-center" style="margin-top:20px">
            <div class="bg-dim shadow" :style="searchDisabled ? 'padding: 20px 20px 15px 20px;border-radius: 20px;' : 'padding:20px;border-radius: 80px;'">
                <span class="text f-medium" style="overflow-y:hidden" :style="searchDisabled ? 'max-height:200px;' : 'max-height:0px'">Results for</span>
                <div class="flex-center">
                    <span class="material-icons-round text" style="font-size:40px;overflow-x:hidden" :style="searchDisabled ? 'max-width:0px;margin:0px 0px;' : 'max-width:100px;margin:0px 10px;'">person_search</span>
                    <input ref="search" type="text" placeholder="Student Name" class="text" :class="searchDisabled ? 'f-large' : 'f-xlarge'" style="border:none;background: none;" :style="searchDisabled ? 'text-align:center' : 'text-align:left'" :disabled="searchDisabled"/>
                </div>
                <Key :character="'Back'" style="left:-25px;top:0px" :style="searchDisabled ? 'opacity:1' : 'opacity:0'"/>
                
            </div>
        </div>

        <div :style="this.results.length > 0 ? 'max-height:100vh' : 'max-height:0px'" style="margin-top:20px;overflow-y:hidden">
            <div class="flex-center" v-for="result in this.results" :key="result.person.id">
                <div class="bg-white shadow" style="padding:20px;border-radius: 16px;width:80%;margin:5px">
                    <div class="flex-apart">
                        <div>
                            <span class="f-large f-bold" :style="`color:${this.$root.settings.color}`" style="text-align: left;">{{ result.person.first_name }} {{ result.person.last_name }}</span>
                            <span class="f-medium" :style="`color:${this.$root.settings.color}`" style="text-align: left;" :key="result.dep">{{ result.dep ? `Child of ${result.dep.first_name} ${result.dep.last_name}` : `Student` }}</span>
                        </div>
                        
                        <div class="bg-green" style="padding:5px 8px;border-radius: 8px;">
                            <span class="f-small text">{{ result.person.membership }}</span>
                        </div>
                    </div>
                    
                    <div class="border-green flex-center" style="padding:10px;border-radius: 16px;margin-top:20px;flex-wrap:wrap">
                        
                        <div class="bg-green" style="padding:6px 10px;border-radius: 8px;" v-if="!result.unlocked">
                            <span class="f-small text">Unlock Contact Details</span>
                            <Key :character="letterInResult(result.person.first_name + ' ' + result.person.last_name)" style="left:-25px;top:-20px"/>
                        </div>

                        <div class="flex-center bg-green" style="padding:6px 10px;border-radius: 12px;margin:5px" v-if="result.unlocked">

                            <span class="material-icons-round text" style="font-size:24px">phone</span>
                            <span style="margin-left:10px" class="f-medium text">{{ result.dep.phone }}</span>
                        </div>
                        <div class="flex-center bg-green" style="padding:6px 10px;border-radius: 12px;margin:5px" v-if="result.unlocked">

                            <span class="material-icons-round text" style="font-size:24px">mail</span>
                            <span style="margin-left:10px" class="f-medium text">{{ result.dep.email }}</span>
                        </div>
                        <div class="flex-center bg-green" style="padding:6px 10px;border-radius: 12px;margin:5px" v-if="result.unlocked">

                            <span class="material-icons-round text" style="font-size:24px">cake</span>
                            <span style="margin-left:10px" class="f-medium text">{{ result.person.birthdate }}</span>
                        </div>
                            
                       
                    </div>
                    
                </div>
            </div>
            
        </div>
        
    </div>
</template>
<script>
    export default {
        name: 'Search',
        data() {
            return {
                results: [],
                searchDisabled: false,
                resultCheck: 0,
                rememberSeed: this.$parent.pageKeySeed
            }
        },
        mounted() {

            document.addEventListener('keyup', (e) => {

                if(this.$root.showAccessPanel) return;
                if(this.$parent.pageKeySeed != this.rememberSeed) return;

                // if backspace
                if(e.keyCode == 8) {
                    this.$refs.search.value = "";
                    this.results = [];
                    this.searchDisabled = false;
                    setTimeout(() => {
                        this.$refs.search.focus()
                    }, 100);
                    return;
                }

                this.results.forEach(result => {
                    if(this.letterInResult(result.person.first_name + " " + result.person.last_name) == e.key.toUpperCase() && !result.unlocked) {
                        var cb = () => {
                            result.unlocked = true;
                            
                        };
                        this.$root.accessCodeShow(cb);
                    }
                })
            });

            setTimeout(() => {
                this.$refs.search.focus()
                this.$refs.search.addEventListener('keydown', (e) => {
                    // if key pressed is numerical
                    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                        e.preventDefault()
                        return;
                    }
                    // if key pressed is backspace
                    if(e.keyCode == 8) {
                        this.$refs.search.value = "";
                        e.preventDefault()
                        return;
                    }

                    // if key pressed is enter
                    if(e.keyCode == 13) {
                        this.searchDisabled = true;
                        e.preventDefault()
                        this.startSearch()
                        return;
                    }


                    // this.results = this.$parent.students.filter(student => student.name.toLowerCase().includes(this.$refs.search.value.toLowerCase()))
                })
            }, 200)
            
        },
        methods: {
            startSearch(){
                var searchTerm = this.$refs.search.value.toLowerCase();

                this.axios.get(`${this.$root.pathLocation}/api/v2/desk/people/search?q=${searchTerm}`, {headers: {'Authorization': `Bearer ${this.$cookies.get('token')}`}}).then(res => {
                    this.results = res.data.results.filter(result => result.person.guardian_name != null);

                    this.results.forEach( async (result) => {
                        // need to get each dependent

                        var resDep = await this.axios.get(`${this.$root.pathLocation}/api/v2/desk/people/search?q=${result.person.guardian_name}`, {headers: {'Authorization': `Bearer ${this.$cookies.get('token')}`}});
                        result.dep = resDep.data.results[0].person;
                    })

                    console.log(this.results)
                    this.resultCheck++;
                });


                
                


            },
            letterInResult(name){
                var letters = "abcdefghijklmnopqrstuvwxyz";
                var applicableResult = this.results.find(res => res.person.first_name + " " + res.person.last_name == name)
                var indexOfResult = this.results.indexOf(applicableResult);
                return letters.substring(indexOfResult, indexOfResult+1).toUpperCase();
            }
        }
    }
</script>