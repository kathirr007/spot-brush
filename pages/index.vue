<template>
  <v-container class="h-100 d-flex align-center">
    <v-row>
      <v-col cols="12" sm="5" class="d-flex align-center align-sm-start justify-center flex-column">
        <div class="w-100 text-center text-sm-left">
          <h1>Welcome to SpotBrush</h1>
          <p>A Collaborative Whiteboard / Sketchboard</p>
          <v-col cols="8" sm="9" class="px-0 text-center text-sm-left ma-auto ma-sm-0">
            <v-btn v-if="auth.isAuthenticated" x-large class="w-100" color="primary" @click="createBoard">Create Board</v-btn>
            <v-btn v-else x-large class="w-100" color="primary" to="/auth/signin">Get started</v-btn>
          </v-col>
        </div>
      </v-col>
      <v-col cols="12" sm="7" class="d-flex align-center align-sm-start justify-center flex-column">
        <img class="mw-100" src="~/assets/images/hero.png" alt="">
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ middleware: ['refresh-token', 'not-authenticated'] })

const auth = useAuthStore()
const router = useRouter()
const { $axios } = useNuxtApp()
const toast = useToast()

async function createBoard() {
  const accessToken = auth.auth?.jwt
  try {
    await $axios.post('/auth/createboard', {
      data: { email: auth.auth?.email }
    }, { headers: { Authorization: `Bearer ${accessToken}` } })
    toast.success('Welcome to SpotBrush!')
    router.push('/')
  } catch (err: any) {
    console.error(err.message)
  }
}
</script>
