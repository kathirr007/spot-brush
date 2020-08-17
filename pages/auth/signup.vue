<template>
  <div class="row">
    <div class="d-none d-sm-flex col-sm-5">
      <img class="w-75 form-promo" src="~assets/images/sb-logo.svg" alt="">
    </div>
    <div class="col-12 col-sm-7 d-flex align-center justify-center">
      <v-card
        color="" class="px-5 pb-5 w-100 rounded-xl">
        <v-card-title class="headline justify-center text-center primary--text break-word text-h5">Sign Up with us </v-card-title>
        <!-- <v-card-actions>
          <v-btn text>Listen Now</v-btn>
        </v-card-actions> -->
        <v-form
          ref="form"
          v-model="valid"
          class="w-100">
          <v-text-field
            v-model="firstName"
            counter
            :rules="[rules.required('First Name')]"
            name="firstName"
            label="Firstname"
            required></v-text-field>
          <v-text-field
            v-model="lastName"
            counter
            name="lastName"
            label="Lastname"
            ></v-text-field>
          <v-text-field
            v-model="organisation"
            counter
            name="organisation"
            label="Organisation"
            ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="[rules.required('Email'), rules.email]"
            name="email"
            label="E-mail Address"
            required></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required('Password'), rules.length('Password', 8), rules.password]"
            :type="show1 ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            :rules="[rules.required('Password'), rules.length('Password', 8), rules.password, confirmPasswordRule]"
            name="confirmPassword"
            label="Confirm Password"
            hint="Shout be same as the password"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="primary"
            x-large
            class="w-100 my-5"
            @click="registerUser">
            Sign Up
          </v-btn>
          <v-card-text class="text-center text-body-1 px-0">
            Already have an account?
            <!-- <v-btn text small to="/signup">Click Here</v-btn> -->
            <!-- <a to="/signup">Click Here</a> -->
            <nuxt-link to="/auth/signin">Click Here</nuxt-link>
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
</template>

<script>
  // import { AmazonCognitoIdentity } from 'amazon-cognito-identity-js';
  import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
  import {
    CognitoAuth
  } from 'amazon-cognito-auth-js';
  export default {
    head: {
      // title: process.env.npm_package_name || "",
      title: `SpotBrush | Sign Up`,
      meta: [],
      link: [{
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico"
        },
        // { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css' }
        // { rel: 'stylesheet', type: 'text/css', href: 'https://unpkg.com/bulma-modal-fx/dist/css/modal-fx.min.css' }
      ],
      script: [
        // {src: '~assets/js/amazon-cognito-auth.min.js', crossorigin :'anonymous'},
        { src: '../js/cognito_config.js', crossorigin: 'anonymous', body: true },
        // {src: 'https://unpkg.com/bulma-modal-fx/dist/js/modal-fx.min.js', crossorigin :'anonymous'}
      ],
    },
    data() {
      return {
        valid: false,
        firstName: '',
        lastName: '',
        organisation: '',
        email: '',
        password: '',
        confirmPassword: '',
        show: true,
        show1: false,
        rules: {
          required(propName) {
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
      };
    },
    computed: {
        confirmPasswordRule() {
            return this.password === this.confirmPassword || "Confirm Password must match with password";
        }
    },
    methods: {
        test() {
            /* let email = 'Test@test.com';
            this.$toast.show(`The user <strong> ${email} </strong> has been created successfully. <br> Please check your email <strong>${email}</strong> inbox for confirmation before sign in.`, {duration: 35000})
            this.$router.push('/') */
        },
      onReset() {
        this.firstName = ""
        this.lastName = ""
        this.email = ""
        this.password = ""
        this.confirmPassword = ""

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
      SignUp() {
        /* Signup codes here */
        var $vm = this
        var firstname = this.firstName,
          lastname = this.lastName,
          organisation = this.organisation,
          email = this.email,
          password = this.password,
          cognitoUser;

        var poolData = {
          UserPoolId: _config.cognito.userPoolId, // Your user pool id here
          ClientId: _config.cognito.clientId // Your client id here
        };
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var attributeList = [];
        var attrFirstname = {
          Name: 'given_name',
          Value: firstname, //get from form field
        };
        var attrLastname = {
          Name: 'family_name',
          Value: lastname, //get from form field
        };
        var attrOrganisation = {
          Name: 'organisation',
          Value: organisation, //get from form field
        };
        var attributeFirstname = new AmazonCognitoIdentity.CognitoUserAttribute(attrFirstname),
            attributeLastname = new AmazonCognitoIdentity.CognitoUserAttribute(attrLastname);
            // attributeOrganisation = new AmazonCognitoIdentity.CognitoUserAttribute(attrOrganisation);
        attributeList.push(attributeFirstname);
        attributeList.push(attributeLastname);
        // attributeList.push(attributeOrganisation);
        userPool.signUp(email, password, attributeList, null, function (err, result) {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          cognitoUser = result.user;
          // document.getElementById("titleheader").innerHTML = "<strong>Check your email for a verification link</strong>";
        //   $bvToast.show('my-toast')
            $vm.$toasted.show(`The user <strong> ${email} </strong> has been created successfully. <br>Please check your email <strong>${email}</strong> inbox for confirmation before sign in.`, {duration: 6000})
            $vm.$router.push('/auth/signin')
          //change elements of page
          // alert('success');
        });
      },
      registerUser() {
          const { email, password, firstName, lastName, organisation } = this
          const data = { email, password, firstName, lastName, organisation }
          this.$axios('/auth/register', {
              method: 'post',
              headers: {
                  Accept: 'application/json',
                  Content: 'application/json'
              },
              data: data
          }).then(res => {
              const auth = res.data
              this.$toasted.show(`The user <strong> ${email} </strong> has been created successfully. <br>Please check your email <strong>${email}</strong> inbox for confirmation before sign in.`, {duration: 6000})
              this.$router.push(`/auth/confirm/${email}`)
          }).catch((err) => {
              this.error = err.response.data.error.message
              if (err.response.data.error.code == 'UsernameExistsException') {
                  setTimeout(() => {
                      this.$router.push('/auth/signin')
                  }, 3000)
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
