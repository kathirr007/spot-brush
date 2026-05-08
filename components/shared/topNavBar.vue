<template>
  <div>
    <!-- Sidebar nav for authenticated users -->
    <v-navigation-drawer
      v-model="drawer"
      color="white"
      :permanent="auth.isAuthenticated"
      :expand-on-hover="expandOnHover"
      :rail="miniVariant"
      rail-width="70"
      app
    >
      <v-list class="py-0">
        <v-list-item v-if="auth.isAuthenticated" lines="two">
          <template #prepend>
            <v-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="avatar">
            </v-avatar>
          </template>
          <v-list-item-title class="text-primary">
            {{ auth.auth?.given_name || 'User name' }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ auth.auth?.nickname || '' }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item v-else to="/" class="justify-center">
          <template #prepend>
            <v-avatar>
              <img src="~/assets/images/sb-logo.svg" alt="logo">
            </v-avatar>
          </template>
        </v-list-item>

        <v-divider />

        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          exact
        >
          <template #prepend>
            <v-icon class="text-primary">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="text-primary">{{ item.title }}</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="auth.isAuthenticated" @click="onLogout">
          <template #prepend>
            <v-icon class="text-primary">mdi-logout</v-icon>
          </template>
          <v-list-item-title class="text-primary">Logout</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-footer color="white" class="text-primary justify-center">
        <img src="~/assets/images/sb-logo.svg" style="width:20px" alt="logo">
        <span class="ml-2">{{ title }}</span>
      </v-footer>
    </v-navigation-drawer>

    <!-- Top app bar for guests -->
    <v-app-bar v-if="!auth.isAuthenticated" app color="white">
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="pl-2 pl-sm-0">
        <NuxtLink to="/" class="text-primary text-decoration-none font-weight-bold text-h4">{{ title }}</NuxtLink>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          variant="text"
          :to="item.link"
          class="text-capitalize"
        >
          <v-icon start class="d-none d-md-flex">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn v-if="auth.isAuthenticated" variant="text" class="text-capitalize" @click="onLogout">
          <v-icon start>mdi-logout</v-icon> Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const { $axios } = useNuxtApp()

const drawer = ref(false)
const miniVariant = ref(true)
const expandOnHover = ref(true)
const title = 'spotbrush'

const menuItems = computed(() => {
  if (auth.isAuthenticated) {
    return [
      { icon: 'mdi-view-dashboard', title: 'Dashboard', link: '/dashboard' },
      { icon: 'mdi-cog', title: 'Settings', link: '/dashboard/settings' },
      { icon: 'mdi-bell', title: 'Notifications', link: '/dashboard/notifications' },
      { icon: 'mdi-information', title: 'Service', link: '/dashboard/service' },
    ]
  }
  return [
    { icon: 'mdi-home', title: 'Home', link: '/' },
    { icon: 'mdi-information', title: 'About', link: '/about' },
    { icon: 'mdi-server', title: 'Service', link: '/service' },
    { icon: 'mdi-login', title: 'Sign in', link: '/auth/signin' },
  ]
})

async function onLogout() {
  try {
    await $axios.post('/auth/logout')
  } catch {}
  auth.setAuth(null)
  auth.setWhiteboard(false)
  drawer.value = false
  router.push('/')
}
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px;
}
</style>
