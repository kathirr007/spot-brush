<template>
  <v-container>
    <div class="row">
      <div class="d-none d-sm-flex col-sm-5 justify-center">
        <img class="w-60 form-promo" src="~/assets/images/sb-logo.svg" alt="">
      </div>
      <div class="col-12 col-sm-7 d-flex align-center justify-center">
        <v-card class="px-5 pb-5 w-100 rounded-xl">
          <v-card-title class="justify-center text-center text-primary text-h5">Login to your account</v-card-title>
          <v-card-text v-if="error" class="text-error text-center text-body-1 px-0">{{ error }}</v-card-text>
          <v-form ref="form" v-model="valid" class="w-100" @submit.prevent="loginUser">
            <v-text-field
              v-model="email"
              :rules="[rules.required('Email'), rules.email]"
              label="E-mail"
              required
            />
            <v-text-field
              v-model="password"
              :rules="[rules.required('Password'), rules.length('Password', 8), rules.password]"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              counter
              @click:append-inner="show1 = !show1"
            />
            <v-card-text class="text-right text-body-1 px-0">
              Forgot password? <NuxtLink to="/auth/forgotpassword">Click Here</NuxtLink>
            </v-card-text>
            <v-btn :disabled="!valid" color="primary" size="x-large" class="w-100" @click="loginUser">Sign In</v-btn>
            <v-card-text class="text-center text-body-1 px-0">
              Not Registered with us? <NuxtLink to="/auth/signup">Click Here</NuxtLink>
            </v-card-text>
          </v-form>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  middleware: ['refresh-token', 'not-authenticated'],
  title: 'SpotBrush | Sign In',
})

const auth = useAuthStore()
const router = useRouter()
const { $axios } = useNuxtApp()
const toast = useToast()

const form = ref()
const valid = ref(false)
const email = ref('')
const password = ref('')
const show1 = ref(false)
const error = ref('')

const rules = {
  required: (name: string) => (v: string) => !!v || `${name} field is required`,
  length: (name: string, len: number) => (v: string) => (v || '').length >= len || `${name} should be at least ${len} characters`,
  email: (v: string) => !!(v || '').match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Please enter a valid email address',
  password: (v: string) => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 'Password must contain upper case, number, and special character',
}

async function loginUser() {
  const { valid: isValid } = await form.value.validate()
  if (!isValid) return
  try {
    const res = await $axios.post('/auth/login', { data: { email: email.value, password: password.value } })
    const authData = res.data
    auth.setAuth(authData)
    auth.setWhiteboard(false)
    toast.success(`Hello ${authData.given_name}! Welcome to SpotBrush.`)
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.response?.data?.error?.message || 'Login failed'
    auth.setAuth(null)
    const code = err.response?.data?.error?.code
    if (code === 'UserNotConfirmedException') {
      toast.warning('Please confirm your email before signing in.')
      router.push('/auth/confirm/' + email.value)
    } else if (code === 'NotAuthorizedException') {
      toast.error(err.response.data.error.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-promo {
  transform: rotate(-28deg);
  opacity: 0.25;
}
</style>
