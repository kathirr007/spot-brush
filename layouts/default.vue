<template>
  <v-app>
    <topNavBar />
    <v-main>
      <slot />
    </v-main>
    <v-footer v-if="!auth.isAuthenticated" app class="justify-center">
      <span class="text-primary mr-2">{{ title }}</span>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import topNavBar from '~/components/shared/topNavBar.vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const title = 'spotbrush'
</script>

<style lang="scss">
.flex-basis-0 {
  flex-basis: 0;
}
</style>
