<template>
    <v-container>
      <div class="row">
        <div class="d-none d-sm-flex col-sm-5 justify-center">
          <img class="w-60 form-promo" src="~assets/images/sb-logo.svg" alt="">
        </div>
        <div class="col-12 col-sm-7 d-flex align-center justify-center">
          <v-card
            color="" class="px-5 pb-5 w-100 rounded-xl">
            <v-card-title class="headline justify-center text-center primary--text break-word text-h5">Login to your account</v-card-title>
            <v-card-text v-if="error" class="error--text text-center text-body-1 px-0">
                {{ error }}
            </v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              class="w-100"
              @submit.prevent="loginUser"
            >
              <!-- <v-text-field
                v-model="name"
                :counter="10"
                :rules="nameRules"
                label="Name"
                required></v-text-field> -->

              <v-text-field
                v-model="email"
                :rules="[rules.required('Email'), rules.email]"
                name="email"
                label="E-mail"
                required></v-text-field>

              <v-text-field
                v-model="password"
                :rules="[rules.required('Password'), rules.length('Password', 8), rules.password]"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="password"
                label="Password"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-card-text class="text-right text-body-1 px-0">
                Forgot password?
                <!-- <v-btn text small to="/signup">Click Here</v-btn> -->
                <!-- <a to="/signup">Click Here</a> -->
                <nuxt-link to="/auth/forgotpassword">Click Here</nuxt-link>
              </v-card-text>

              <v-btn
                :disabled="!valid"
                color="primary"
                x-large
                class="w-100"
                @click="loginUser"
                @keyup.enter="loginUser"
                depressed
                >
                Sign In
              </v-btn>
              <v-card-text class="text-center text-body-1 px-0">
                Not Registered with us?
                <!-- <v-btn text small to="/signup">Click Here</v-btn> -->
                <!-- <a to="/signup">Click Here</a> -->
                <nuxt-link to="/auth/signup">Click Here</nuxt-link>
              </v-card-text>

              <!-- <v-btn
                color="error"
                class="mr-4"
                @click="reset">
                Reset
              </v-btn> -->
            </v-form>
          </v-card>
        </div>
      </div>
    </v-container>
</template>

<script>
  // import { AmazonCognitoIdentity } from 'amazon-cognito-identity-js';
  import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
  import { CognitoAuth } from 'amazon-cognito-auth-js';
  export default {
    middleware: ['refreshToken','notAuthenticated'],
    head: {
      // title: process.env.npm_package_name || "",
      title: `SpotBrush | Sign In`,
      meta: [],
      link: [{
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico"
        },
      ],
      script: [
        // {src: '~assets/js/amazon-cognito-auth.min.js', crossorigin :'anonymous'},
        // { src: '../js/cognito_config.js', crossorigin: 'anonymous', body: true },
      ],
    },
    data: () => ({
        valid: false,
        email: '',
        show1: false,
        password: '',
        error: '',
        rules: {
            required(propName){
                return v => !!v || `${propName} field is required`
            },
            length(propName, len){
                return v => (v || '').length >= len || `${propName} should be at least ${len} characters`
            },
            email: v => !!(v || '').match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i) || 'Please enter a valid email address',
            // length: len => v => (v || '').length >= len || `Password should be at least ${len} characters`,
            password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
            'Password must contain an upper case letter, a numeric character, and a special character',
        },
    }),
    computed: {
        confirmPasswordRule() {
            return this.password === this.confirmPassword || "Confirm Password must match with password";
        }
    },
    methods: {
      onReset() {
        this.signUp = {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        };

        this.$nextTick(() => {
          this.$v.$reset();
        });
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      SignIn() {
        var $vm = this
        var authenticationData = {
          Username: this.email,
          Password: this.password,
        };

        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
          authenticationData
        );

        var poolData = {
          UserPoolId: _config.cognito.userPoolId, // Your user pool id here
          ClientId: _config.cognito.clientId, // Your client id here
        };

        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        var userData = {
          Username: this.email,
          Pool: userPool,
        };

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            $vm.$toasted.show(
                `Hello..! Welcome to our SbotBrush. A Collabarative Whiteboard...`,
                {duration: 3000}
            )

            $vm.$router.push({
              path: '/'
            })
            // debugger
            return;
          },

          onFailure: function (err) {
            return alert(err.message || JSON.stringify(err));
          },
        });
      },
      loginUser() {
          // debugger
          const { email, password } = this
          const data = { email, password }
          this.$axios.$post('/auth/login', {
              headers: {
                  Accept: 'application/json',
                  Content: 'application/json'
              },
              data: data
          }).then(res => {
              // debugger
              const auth = res
              this.$store.commit('setAuth', auth)
              this.$store.commit('setWhiteboard', false)
              this.$toasted.show(
                `Hello <stron>${auth.given_name}</stron>! Welcome to our SbotBrush. A Collabarative Whiteboard...`,
                {duration: 3000}
              )
              this.$router.push('/dashboard')
          }).catch((err) => {
              // debugger
              this.error = err.response.data.error.message
              this.$store.commit('setAuth', null)
              if (err.response.data.error.code == 'UserNotConfirmedException') {
                this.$toasted.show(
                    `Hello..! <br>You've not confirmed email verification. Please check your email and confirm registration.`,
                    {duration: 3000}
                )
                this.$router.push('/auth/confirm/' + email)
              } else if (err.response.data.error.code == 'NotAuthorizedException') {
                this.$toasted.show(
                    `${err.response.data.error.message}<br>Please try again with correct username and password or try Forgot password.`,
                    {duration: 3000}
                )
            }
          })
      }
    },
  };

</script>

<style lang="scss" scoped>
.form-promo {
  transform: rotate(-28deg);
  opacity: 0.25;
}
</style>
