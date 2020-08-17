<template>
  <div class="row">
    <div class="d-none d-sm-flex col-sm-5">
      <img class="w-75 form-promo" src="~assets/images/sb-logo.svg" alt="">
    </div>
    <div class="col-12 col-sm-7 d-flex align-center justify-center">
      <v-card
        color="" class="px-5 pb-5 w-100 rounded-xl">
        <v-card-title class="headline justify-center text-center primary--text break-word text-h4 font-weight-bold">Sign Up with us </v-card-title>
        <!-- <v-card-actions>
          <v-btn text>Listen Now</v-btn>
        </v-card-actions> -->
        <v-form
          ref="form"
          v-model="valid"
          class="w-100"
          lazy-validation>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Firstname"
            required></v-text-field>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Lastname"
            required></v-text-field>
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Organisation"
            required></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail Address"
            required></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            name="input-10-1"
            label="Confirm Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="primary"
            x-large
            class="w-100"
            @click="validate">
            Sign Up
          </v-btn>
          <v-card-text class="text-center text-body-1 px-0">
            Already have an account?
            <!-- <v-btn text small to="/signup">Click Here</v-btn> -->
            <!-- <a to="/signup">Click Here</a> -->
            <nuxt-link to="/signin">Click Here</nuxt-link>
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
  import isPasswordStrong from "@/customvalidators/passwordComplexity";
  // import _config from "@/assets/js/cognito_config";
  import {
    required,
    email,
    minLength,
    sameAs,
    alphaNum,
  } from "vuelidate/lib/validators";
  export default {
    head: {
      // title: process.env.npm_package_name || "",
      title: `SpotBrush | Sign In`,
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
        {
          src: 'js/cognito_config.js',
          crossorigin: 'anonymous',
          body: true
        },
        // {src: 'https://unpkg.com/bulma-modal-fx/dist/js/modal-fx.min.js', crossorigin :'anonymous'}
      ],
    },
    data() {
      return {
        valid: false,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        signIn: {
          email: "",
          password: "",
        },
        signUp: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
        show: true,
        formValid: false,
        show1: false,
        password: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
      };
    },
    validations: {
      signUp: {
        firstName: {
          required
        },
        lastName: {
          required
        },
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(8),
          isPasswordStrong
        },
        confirmPassword: {
          required,
          sameAsPassword: sameAs("password")
        },
      },
      signIn: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(8)
        },
      },
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
      validateSignup(name) {
        const {
          $dirty,
          $error
        } = this.$v.signUp[name];
        return $dirty ? !$error : null;
      },
      validateSignIn(name) {
        const {
          $dirty,
          $error
        } = this.$v.signIn[name];
        return $dirty ? !$error : null;
      },
      SignIn() {
        var $vm = this
        var authenticationData = {
          Username: this.signIn.email,
          Password: this.signIn.password,
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
          Username: this.signIn.email,
          Pool: userPool,
        };

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            // window.location.href = '/index-old.html';
            //   this.$router.push("/login");
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
      SignUp() {
        /* Signup codes here */
        var firstname = this.signUp.firstName,
          lastname = this.signUp.lastName,
          email = this.signUp.email,
          password = this.signUp.password,
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
        var attributeFirstname = new AmazonCognitoIdentity.CognitoUserAttribute(attrFirstname);
        var attributeLastname = new AmazonCognitoIdentity.CognitoUserAttribute(attrLastname);
        attributeList.push(attributeFirstname);
        attributeList.push(attributeLastname);
        userPool.signUp(email, password, attributeList, null, function (err, result) {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          cognitoUser = result.user;
          // document.getElementById("titleheader").innerHTML = "<strong>Check your email for a verification link</strong>";
          $bvToast.show('my-toast')
          //change elements of page
          // alert('success');
        });
      },
    },
  };

</script>

<style lang="scss" scoped>
.form-promo {
  transform: rotate(-28deg);
  opacity: 0.25;
}
</style>
