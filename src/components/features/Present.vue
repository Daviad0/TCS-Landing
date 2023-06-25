<template>
    <div style="width:100%" class="flex-center">
      <div style="width:90%;max-height:80vh;overflow-y:scroll" class="hidescroll">
        <div class="flex-center">
          <span class="material-icons-round text" style="font-size:30px;margin:5px">
            check_circle
          </span>
          <span class="text f-xlarge f-bold" style="margin:5px;margin-top:20px">Mark Student Present</span>
        </div>
        
        <span class="text f-medium" style="margin:5px">To mark a student as present for their class periods, select the letter corresponding to your student below...</span>
        <div class="flex-center" style="flex-wrap:wrap;margin-top:40px">
          <div v-for="student in this.$parent.students" :key="student.id">
            <div class="container bg-white shadow" style="border-radius:16px;margin:10px;padding:12px 24px">
              <span class="f-large color-green">{{ student.name }}</span>
              <div class="flex-center" style="flex-wrap:wrap">
                <div class="bg-green flex-center" style="padding:4px 8px;border-radius:8px;margin:4px" v-for="c in this.$parent.getClasses(student)" :key="c.id">
                  <span class="material-icons-round" style="font-size:14px;margin-right:5px" :class="`text`" v-if="this.$parent.getStatus(student, c) == 'noshow'">cancel</span>
                  <span class="material-icons-round" style="font-size:14px;margin-right:5px" :class="`text`" v-if="this.$parent.getStatus(student, c) == 'complete'">check_circle</span>
                  <span class="text f-small">{{ this.$parent.timeRange(c.start_at, c.end_at) }}</span>
                </div>
              </div>
              <Key :character="this.$parent.getLetter(student).toUpperCase()" style="left:-20px;top:-5px"/>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
</template>
<script>
    export default {
        name: "Present"
    }
</script>