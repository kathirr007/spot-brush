<template>
  <v-row
    column
    justify-center
    align-center>
    <v-col
      cols="12"
      sm="5"
      class="d-flex align-center align-sm-start justify-center flex-column">
      <div class="w-100 text-center text-sm-left">
        <h1>SpotBrush Service</h1>
        <p>Lorem ipsum sit dolor amet nuev done</p>
        <v-col cols="8" sm="9" class="px-0 text-center text-sm-left ma-auto ma-sm-0">
          <v-btn x-large class="w-100" color="primary px-16">Get started</v-btn>
        </v-col>
      </div>
    </v-col>
    <v-col cols="12" sm="7" class="d-flex align-center align-sm-start justify-center flex-column">
      <img class="mw-100" src="~assets/images/hero.png" alt="">
    </v-col>
  </v-row>
</template>

<script>

  export default {
    head:{
      title: `SpotBrush | About`
    },
    components: {
    }
  }

</script>
