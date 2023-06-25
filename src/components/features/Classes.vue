<template>
    <div style="width:100%;max-height:80vh;overflow-y:scroll" ref="scroll" class="hidescroll">
      <CoachNode v-for="staff in this.$parent.staff.sort((a,b) => a.name.localeCompare(b.name))" :key="staff.id" class="flex-center" :coach="staff"/>
    </div>

</template>
<script>
    export default {
        name: 'Classes'
    }
</script>