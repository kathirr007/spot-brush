<template>
  <v-container>
    <div class="row">
      <div class="d-none d-sm-flex col-sm-5 justify-center">
        <img class="w-60 form-promo" src="~/assets/images/sb-logo.svg" alt="">
      </div>
      <div class="col-12 col-sm-7 d-flex align-center justify-center">
        <v-card class="px-5 pb-5 w-100 rounded-xl">
          <v-card-title class="justify-center text-center text-primary text-h5">Sign Up with us</v-card-title>
          <v-card-text v-if="error" class="text-error text-center text-body-1 px-0">{{ error }}</v-card-text>
          <v-form ref="form" v-model="valid" class="w-100">
            <v-text-field v-model="firstName" :rules="[rules.required('First Name')]" label="Firstname" required />
            <v-text-field v-model="lastName" label="Lastname" />
            <v-text-field v-model="organisation" label="Organisation" />
            <v-text-field v-model="email" :rules="[rules.required('Email'), rules.email]" label="E-mail Address" required />
            <v-text-field
              v-model="password"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required('Password'), rules.length('Password', 8), rules.password]"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append-inner="show1 = !show1"
            />
            <v-text-field
              v-model="confirmPassword"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              :rules="[rules.required('Confirm Password'), rules.length('Confirm Password', 8), confirmPasswordRule]"
              label="Confirm Password"
              counter
              @click:append-inner="show1 = !show1"
            />
            <v-btn :disabled="!valid" color="primary" size="x-large" class="w-100 my-5" @click="registerUser">Sign Up</v-btn>
            <v-card-text class="text-center text-body-1 px-0">
              Already have an account? <NuxtLink to="/auth/signin">Click Here</NuxtLink>
            </v-card-text>
          </v-form>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'

definePageMeta({ middleware: ['refresh-token', 'not-authenticated'] })

const router = useRouter()
const { $axios } = useNuxtApp()
const toast = useToast()

const form = ref()
const valid = ref(false)
const error = ref('')
const firstName = ref('')
const lastName = ref('')
const organisation = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const show1 = ref(false)

const rules = {
  required: (name: string) => (v: string) => !!v || `${name} field is required`,
  length: (name: string, len: number) => (v: string) => (v || '').length >= len || `${name} should be at least ${len} characters`,
  email: (v: string) => !!(v || '').match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Please enter a valid email address',
  password: (v: string) => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 'Password must contain upper case, number, and special character',
}

const confirmPasswordRule = computed(() =>
  password.value === confirmPassword.value || 'Confirm Password must match with password'
)

async function registerUser() {
  const { valid: isValid } = await form.value.validate()
  if (!isValid) return
  try {
    await $axios.post('/auth/register', {
      data: { email: email.value, password: password.value, firstName: firstName.value, lastName: lastName.value, organisation: organisation.value }
    })
    toast.success(`User ${email.value} created. Please check your email to confirm registration.`)
    router.push(`/auth/confirm/${email.value}`)
  } catch (err: any) {
    error.value = err.response?.data?.error?.message || 'Registration failed'
    if (err.response?.data?.error?.code === 'UsernameExistsException') {
      setTimeout(() => router.push('/auth/signin'), 3000)
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
