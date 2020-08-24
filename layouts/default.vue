<template>
  <v-app>
    <topNavBar />
    <v-main>
        <nuxt />
      <!-- <v-container fluid>
      </v-container> -->
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
      class="justify-center"
      v-if="$store.state.auth != null ? false : true"
    >
      <span class="primary--text mr-2">{{ title }}</span> <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import topNavBar from '~/components/shared/topNavBar'
export default {
  data() {
    return {
      fixed: false,
      title: 'spotbrush'
    }
  },
  components: {
    topNavBar
  }
}
</script>
<style lang="scss">
  .v-main__wrap, .container {
    // display: flex;
    // flex: 1;
  }
  .flex-basis-0 {
    flex-basis: 0;
  }
</style>
