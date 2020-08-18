<template>
  <v-row>
      <v-col cols="7" class="mx-auto">
          <v-card
            color=""
            class="w-100 rounded-xl pa-5"
          >
            <v-card-title class="headline justify-center text-center primary--text break-word text-h5">Please confirm your email</v-card-title>
            <v-card-text class="text-center">
                We've send an email confirmation to your registered <strong class="primary--text">{{ email }}</strong>. <br>
                Please check and confirm your registration.
            </v-card-text>
            <v-card-text class="text-center text-body-1 px-0">
                If you've not recieved confirmation email. Please
                <a @click.prevent="resendConfirmEmail">Click Here</a>
            </v-card-text>
            <v-card-text class="text-center text-body-1 px-0">
                Already confirmed the registration?
                <nuxt-link to="/auth/signin">Click Here</nuxt-link>
            </v-card-text>
          </v-card>
      </v-col>
  </v-row>
</template>

<script>

export default {
  middleware: ['refreshToken','notAuthenticated'],
  validate ({ params }) {
    if(!params.email) return false
    return true
  },
  data() {
    return {
      code: '',
      error: '',
      email: ''
    }
  },
  asyncData(context) {
    return  {
      email: context.params.email
    }
  },
  methods: {
    confirm() {
      const { code, email } = this
      const data = { code, email }

      this.$axios('/auth/confirm', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          Content: 'application/json'
        },
        data: data
      }).then(res => {
        const auth = res.data
        this.$router.push('/auth/login')
      }).catch((err) => {
        this.error = err.response.data.error
      })
    },
    resendConfirmEmail() {
      const { email } = this
      const data = { email }

      this.$axios('/auth/resendConfirmEmail', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          Content: 'application/json'
        },
        data: data
      }).then(res => {
          debugger
        const auth = res.data
        this.$router.push('/auth/login')
      }).catch((err) => {
          debugger
          console.log(err)
        this.error = err.response.data.error
      })
    }
  }
}
</script>
