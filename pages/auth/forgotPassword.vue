<template>
  <v-row>
      <v-col cols="12" sm="7" class="mx-auto">
          <v-card
            color=""
            class="w-100 rounded-xl pa-5"
          >
            <v-card-title class="headline justify-center text-center primary--text break-word text-h5">Reset Password</v-card-title>

            <v-form ref="form" v-model="valid" class="w-100" @submit.prevent>
                <template v-if="codeSent">
                    <v-text-field v-model="verificationCode" :rules="[rules.required('Verification Code')]" name="verificationCode" label="Verification Code" required></v-text-field>
                    <v-text-field v-model="newPassword" :rules="[rules.required('New Password'), rules.length('Password', 8), rules.password]" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="newPassword" label="New Password" counter @click:append="show1 = !show1"></v-text-field>
                    <v-text-field v-model="confirmPassword" :rules="[rules.required('Confirm Password'), rules.length('Password', 8), rules.password, confirmPasswordRule]" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="confirmPassword" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                    <v-btn :disabled="!valid" color="primary" x-large class="w-100" @click="confirmNewPassword" @keyup.enter="confirmNewPassword" depressed> Reset Password </v-btn>
                </template>
                <template v-else>
                    <v-text-field
                    v-model="email"
                    :rules="[rules.required('Email'), rules.email]"
                    name="email"
                    label="E-mail"
                    required></v-text-field>
                    <v-btn :disabled="!valid" color="primary" x-large class="w-100" @click="resetPassword" @keyup.enter="resetPassword" depressed> Get Code </v-btn>
                </template>
                <v-card-text class="text-center text-body-1 px-0">
                    Remember old password?
                    <nuxt-link to="/auth/signin">Click Here</nuxt-link>
                </v-card-text>
            </v-form>
          </v-card>
      </v-col>
  </v-row>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            codeSent: false,
            verificationCode: '',
            show1: false,
            email: '',
            newPassword: '',
            confirmPassword: '',
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
                return this.newPassword === this.confirmPassword || "Confirm Password must match with password";
            }
        },
        methods: {
            resetPassword() {
                const { email } = this
                const data = { email }
                this.$axios('/auth/forgotpassword', {
                    method: 'post',
                    data: data
                }).then(res => {
                    debugger
                    const data = res.data
                    this.codeSent = true
                }).catch((err) => {
                    debugger
                    console.log(err)
                })
            },
            confirmNewPassword() {
                debugger
                const { email, verificationCode, newPassword } = this
                const data = { email, verificationCode, newPassword }
                this.$axios('/auth/confirmpassword', {
                    method: 'post',
                    data: data
                }).then(res => {
                    debugger
                    const data = res.data
                    // this.codeSent = true
                    this.$router.push('/auth/signin')
                }).catch((err) => {
                    debugger
                    console.log(err)
                })
            },
            forgotPassword() {
                var poolData = {
                    UserPoolId: _config.cognito.userPoolId, // Your user pool id here
                    ClientId: _config.cognito.clientId, // Your client id here
                };
                var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
                var userData = {
                    Username: document.getElementById("inputUsername").value,
                    Pool: userPool,
                };
                var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
                cognitoUser.forgotPassword({
                    onSuccess: function(result) {
                        console.log('call result: ' + result);
                    },
                    onFailure: function(err) {
                        alert(err);
                        console.log(err);
                    },
                    inputVerificationCode() {
                        var verificationCode = prompt('Please input verification code ', '');
                        var newPassword = prompt('Enter new password ', '');
                        cognitoUser.confirmPassword(verificationCode, newPassword, this);
                    }
                });
            }
        },

        mounted() {
            // this.resetPassword()
        }
    }
</script>

<style lang="scss" scoped>

</style>
