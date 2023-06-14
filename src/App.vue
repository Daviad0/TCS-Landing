<template>
  <link href="https://fonts.googleapis.com/icon?family=Geologica"
      rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
      rel="stylesheet">
  <link href="main.css" rel="stylesheet"/>
  <RouterView />
</template>

<script>

export default {
  data(){
    return {
      location: "tcs-plymouth",
      path: "https://pike13.com",
      redirect: "http://localhost:5173/auth",
      adjustMin: 846
    }
  },
  methods: {
    now(){
      var date = new Date();
      date.setMinutes(date.getMinutes() + this.adjustMin);
      return date;
    }
  },
  computed: {
    pathLocation (){
      return `${this.path.split("//")[0] + "//" + this.location + "." + this.path.split("//")[1]}`
    }
    
  }
  
}

</script>