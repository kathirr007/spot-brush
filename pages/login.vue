<template>
    <div>
        <div class="row">
            <div class="col-12 d-flex align-items-center justify-content-center mt-5">
                <div class="col-7 sign-form">
                    <!-- <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-sign-in-tab" data-toggle="tab" href="#nav-sign-in" role="tab" aria-controls="nav-sign-in" aria-selected="true">Sign-in</a>
                        <a class="nav-item nav-link" id="nav-sign-up-tab" data-toggle="tab" href="#nav-sign-up" role="tab" aria-controls="nav-sign-up" aria-selected="false">Sign-up</a>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane p-3 fade show active" id="nav-sign-in" role="tabpanel" aria-labelledby="nav-sign-in-tab">
                        <form action="" name="signin">
                            <div class="form-group">
                            <label for="">Email Address</label>
                            <input type="email" class="form-control" name="email" id="emailSignin" placeholder="Enter email" required>
                            </div>
                            <div class="form-group">
                            <label for="">Password</label>
                            <input type="password" class="form-control" name="password" id="password" placeholder="Password" required>
                            </div>
                            <button type="button" class="btn btn-primary" id="signin_form">Sign In</button>
                        </form>
                        </div>
                        <div class="tab-pane p-3 fade" id="nav-sign-up" role="tabpanel" aria-labelledby="nav-sign-up-tab">
                        <label for="" id="titleheader" style="color: RED;"></label>
                        <form action="" name="signup">
                            <div class="form-group">
                            <label for="">First Name</label>
                            <input type="text" class="form-control" name="firstname" id="firstname" placeholder="Enter your first name" required>
                            </div>
                            <div class="form-group">
                            <label for="">Last Name</label>
                            <input type="text" class="form-control" name="lastname" id="lastname" placeholder="Enter your last name" required>
                            </div>
                            <div class="form-group">
                            <label for="">Email Address</label>
                            <input type="email" class="form-control" name="email" id="email" placeholder="Enter your email" required>
                            </div>
                            <div class="form-group">
                            <label for="">New Password</label>
                            <input type="password" class="form-control" name="new_password" id="new_password" placeholder="Enter new Password" required>
                            </div>
                            <div class="form-group">
                            <label for="">Confirm Password</label>
                            <input type="password" class="form-control" name="confirm_password" id="confirm_password" placeholder="Confirm new Password" required>
                            </div>
                            <button type="button" class="btn btn-primary" id="signup_form">Sign Up</button>
                        </form>
                        </div>
                    </div> -->
                    <b-card no-body>
                        <b-tabs pills card align="center">
                            <b-tab title="Sign-in" active>
                                <b-form @submit.prevent="SignIn" v-if="show">
                                    <b-form-group
                                        id="input-group-1"
                                        label="Email address"
                                        label-for="email"
                                        description=""
                                    >
                                        <b-form-input
                                        id="email"
                                        name="email"
                                        v-model.trim="$v.signIn.email.$model"
                                        type="email"
                                        required
                                        placeholder="Enter email"
                                        :state="validateSignIn('email')"
                                        :class="{ 'is-invalid': formValid && $v.signIn.email.$error }"
                                        aria-describedby="email-live-feedback"
                                        ></b-form-input>
                                        <b-form-invalid-feedback id="email-live-feedback">
                                            <span v-if="!$v.signIn.email.required">Email is required</span>
                                            <span v-if="!$v.signIn.email.email">Please Enter valid email address</span>
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <b-form-group id="input-group-2" label="Password" label-for="userPassword" description="">
                                        <b-form-input
                                        id="userPassword"
                                        name="userPassword"
                                        v-model="$v.signIn.password.$model"
                                        required
                                        type="password"
                                        :state="validateSignIn('password')"
                                        :class="{ 'is-invalid': formValid && $v.signIn.password.$error }"
                                        aria-describedby="userPassword-live-feedback"
                                        ></b-form-input>
                                        <b-form-invalid-feedback id="userPassword-live-feedback">
                                            <span class="error-feedback" v-if="!$v.signIn.password.required">Password is required</span>
                                            <span class="error-feedback" v-if="!$v.signIn.password.minLength">Password must be at least 8 characters</span>

                                            <!-- <transition name="slide-left" mode="out-in">
                                                <span class="error-feedback" v-if="!$v.signIn.password.required">Password is required</span>
                                            </transition>
                                            <transition name="slide-right" mode="in-out">
                                                <span class="error-feedback" v-if="!$v.signIn.password.minLength">Password must be at least 8 characters</span>
                                            </transition> -->
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <b-button type="submit" variant="primary">Sign In</b-button>
                                    <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
                                </b-form>
                            </b-tab>
                            <b-tab title="Sign-up" lazy>
                                <b-form @submit.prevent="SignUp" @reset="onReset" v-if="show">
                                    <b-form-group
                                        id="input-group-3"
                                        label="First Name"
                                        label-for="firstName"
                                        description=""
                                    >
                                        <b-form-input
                                        id="firstName"
                                        name="firstName"
                                        required
                                        v-model="$v.signUp.firstName.$model"
                                        type="text"
                                        placeholder="Enter your first name"
                                        :state="validateSignup('firstName')"
                                        :class="{ 'is-invalid': formValid && $v.signUp.firstName.$error }"
                                        aria-describedby="firstName-live-feedback"
                                        ></b-form-input>
                                        <b-form-invalid-feedback id="firstName-live-feedback">
                                            <span v-if="!$v.signUp.firstName.required">First Name is required</span>
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group
                                        id="input-group-4"
                                        label="Last Name"
                                        label-for="lastName"
                                        description=""
                                    >
                                        <b-form-input
                                        id="lastName"
                                        name="lastName"
                                        required
                                        v-model="$v.signUp.lastName.$model"
                                        type="text"
                                        placeholder="Enter your last name"
                                        :state="validateSignup('lastName')"
                                        :class="{ 'is-invalid': formValid && $v.signUp.lastName.$error }"
                                        aria-describedby="lastName-live-feedback"
                                        ></b-form-input>
                                        <b-form-invalid-feedback id="lastName-live-feedback">
                                            <span v-if="!$v.signUp.lastName.required">Last Name is required</span>
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group
                                        id="input-group-5"
                                        label="Email address"
                                        label-for="userEmail"
                                        description="We'll never share your email with anyone else."
                                    >
                                        <b-form-input
                                        id="userEmail"
                                        name="userEmail"
                                        v-model.trim="$v.signUp.email.$model"
                                        type="email"
                                        required
                                        placeholder="Enter email"
                                        :state="validateSignup('email')"
                                        :class="{ 'is-invalid': formValid && $v.signUp.email.$error }"
                                        aria-describedby="userEmail-live-feedback"
                                        ></b-form-input>
                                        <b-form-invalid-feedback id="userEmail-live-feedback">
                                            <span v-if="!$v.signUp.email.required">Email is required</span>
                                            <span v-if="!$v.signUp.email.email">Please Enter valid email address</span>
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <b-form-group id="input-group-26" label="Password" label-for="userPassword" description="">
                                        <b-form-input
                                        id="userPassword"
                                        name="userPassword"
                                        v-model="$v.signUp.password.$model"
                                        required
                                        type="password"
                                        :state="validateSignup('password')"
                                        :class="{ 'is-invalid': formValid && $v.signUp.password.$error }"
                                        aria-describedby="userPassword-live-feedback"
                                        ></b-form-input>
                                        <b-form-invalid-feedback id="userPassword-live-feedback">
                                            <span v-if="!$v.signUp.password.required">Password is required. <br></span>
                                            <span v-if="!$v.signUp.password.minLength">Password must be at least 8 characters.<br></span>
                                            <span v-if="!$v.signUp.password.isPasswordStrong && $v.signUp.password.required && $v.signUp.password.minLength">Password must contain at least one alphabetic character and one numeric and one special character.</span>
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                    <b-form-group id="input-group-57" label="Confirm Password" label-for="userConfirmPassword">
                                        <b-form-input
                                        id="userConfirmPassword"
                                        name="userConfirmPassword"
                                        v-model="$v.signUp.confirmPassword.$model"
                                        required
                                        type="password"
                                        :state="validateSignup('confirmPassword')"
                                        :class="{ 'is-invalid': formValid && $v.signUp.confirmPassword.$error }"
                                        aria-describedby="userConfirmPassword-live-feedback"
                                        ></b-form-input>
                                        <b-form-invalid-feedback id="userConfirmPassword-live-feedback">
                                            <span v-if="!$v.signUp.confirmPassword.required">Confirm Password is required</span>
                                            <span v-else-if="!$v.signUp.confirmPassword.sameAsPassword">Passwords must match</span>
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <b-button type="submit" variant="primary">Sign Up</b-button>
                                    <b-button type="reset" variant="danger">Reset</b-button>
                                </b-form>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </div>
        </div>
        <b-toast id="my-toast" variant="warning" solid>
            <template v-slot:toast-title>
                <div class="d-flex flex-grow-1 align-items-baseline">
                    <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
                    <strong class="mr-auto">Notice!</strong>
                    <small class="text-muted mr-2">42 seconds ago</small>
                </div>
            </template> This is the content of the toast. It is short and to the point.
        </b-toast>
    </div>
</template>

<script>
// import { AmazonCognitoIdentity } from 'amazon-cognito-identity-js';
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { CognitoAuth } from 'amazon-cognito-auth-js';
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
    title: process.env.npm_package_name || "",
    meta: [
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      // { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css' }
      // { rel: 'stylesheet', type: 'text/css', href: 'https://unpkg.com/bulma-modal-fx/dist/css/modal-fx.min.css' }
    ],
    script: [
        // {src: '~assets/js/amazon-cognito-auth.min.js', crossorigin :'anonymous'},
        {src: 'js/cognito_config.js', crossorigin :'anonymous', body: true},
      // {src: 'https://unpkg.com/bulma-modal-fx/dist/js/modal-fx.min.js', crossorigin :'anonymous'}
    ],
  },
  data() {
    return {
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
    };
  },
  validations: {
    signUp: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required, minLength: minLength(8), isPasswordStrong },
      confirmPassword: { required, sameAsPassword: sameAs("password") },
    },
    signIn: {
      email: { required, email },
      password: { required, minLength: minLength(8) },
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
    validateSignup(name) {
      const { $dirty, $error } = this.$v.signUp[name];
      return $dirty ? !$error : null;
    },
    validateSignIn(name) {
      const { $dirty, $error } = this.$v.signIn[name];
      return $dirty ? !$error : null;
    },
    SignIn() {
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
          debugger
        //   this.$router.push("/login");
          this.$router.push({
                path: '/'
            })
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
        userPool.signUp(email, password, attributeList, null, function(err, result) {
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
</style>
