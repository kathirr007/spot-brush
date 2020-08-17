<template>
  <v-app>
    <topNavBar />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
      class="justify-center"
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
    display: flex;
    flex: 1;
  }
  .flex-basis-0 {
    flex-basis: 0;
  }
</style>
