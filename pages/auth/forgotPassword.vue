<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="7" class="mx-auto">
        <v-card class="w-100 rounded-xl pa-5">
          <v-progress-linear v-if="isLoading" indeterminate rounded color="primary" />
          <v-card-title class="justify-center text-center text-primary text-h5">
            {{ codeSent ? 'Reset Password' : 'Get Verification Code' }}
          </v-card-title>
          <v-card-text v-if="error" class="text-error text-center text-body-1 px-0">{{ error }}</v-card-text>
          <v-form ref="form" v-model="valid" class="w-100" @submit.prevent>
            <template v-if="codeSent">
              <v-text-field v-model="verificationCode" :rules="[rules.required('Verification Code')]" label="Verification Code" required />
              <v-text-field
                v-model="newPassword"
                :rules="[rules.required('New Password'), rules.length('Password', 8), rules.password]"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="New Password"
                counter
                @click:append-inner="show1 = !show1"
              />
              <v-text-field
                v-model="confirmPassword"
                :rules="[rules.required('Confirm Password'), confirmPasswordRule]"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Confirm Password"
                counter
                @click:append-inner="show1 = !show1"
              />
              <v-card-text class="text-right text-body-1 px-0">
                Not received code? <a @click.prevent="resetPassword">Resend code</a>
              </v-card-text>
              <v-btn :disabled="!valid" color="primary" size="x-large" class="w-100" @click="confirmNewPassword">Reset Password</v-btn>
            </template>
            <template v-else>
              <v-text-field v-model="email" :rules="[rules.required('Email'), rules.email]" label="E-mail" required />
              <v-btn :disabled="!valid" color="primary" size="x-large" class="w-100" @click="resetPassword">Get Code</v-btn>
            </template>
            <v-card-text class="text-center text-body-1 px-0">
              Remember old password? <NuxtLink to="/auth/signin">Click Here</NuxtLink>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'

const router = useRouter()
const { $axios } = useNuxtApp()
const toast = useToast()

const form = ref()
const valid = ref(false)
const codeSent = ref(false)
const email = ref('')
const verificationCode = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const show1 = ref(false)
const error = ref('')
const isLoading = ref(false)

const rules = {
  required: (name: string) => (v: string) => !!v || `${name} field is required`,
  length: (name: string, len: number) => (v: string) => (v || '').length >= len || `${name} should be at least ${len} characters`,
  email: (v: string) => !!(v || '').match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Please enter a valid email address',
  password: (v: string) => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 'Password must contain upper case, number, and special character',
}

const confirmPasswordRule = computed(() =>
  newPassword.value === confirmPassword.value || 'Confirm Password must match'
)

async function resetPassword() {
  isLoading.value = true
  try {
    const res = await $axios.post('/auth/forgotpassword', { email: email.value })
    const data = res.data.message
    if (data?.code === 'LimitExceededException') {
      error.value = data.message
    } else {
      toast.success(`Verification code sent to ${email.value}.`)
      error.value = ''
      codeSent.value = true
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

async function confirmNewPassword() {
  isLoading.value = true
  try {
    const res = await $axios.post('/auth/confirmPasswordChange', {
      email: email.value,
      verificationCode: verificationCode.value,
      newPassword: newPassword.value,
    })
    toast.success(res.data.message)
    router.push('/auth/signin')
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>
