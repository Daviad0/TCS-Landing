<template>
    <div class="flex-center" style="padding:0px;align-items: start;">
        <div style="width:40%;border-radius: 16px 0px 0px 16px;padding:20px 0px" class="bg-white container">
            <span class="text color-green f-xlarge f-bold" style="margin:5px">David Reeves</span>
            <span class="text color-green f-medium" style="margin:5px">Working until 8PM</span>
        </div>
        <div style="width:55%;border-radius: 0px 16px 16px 16px;min-height:150px;padding:10px 20px;flex-wrap: wrap;" class="bg-white container flex-center">
            <ClassNode/>
            <ClassNode/>
            <BreakNode/>
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
                coach: this.coach
            }
        },
        mounted() {
            
        },
        methods: {
            
        }
    }
</script>