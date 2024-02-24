<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="7" class="mx-auto">
                <v-card color="" class="w-100 rounded-xl pa-5">
                    <v-progress-linear v-if="isLoading" indeterminate rounded color="primary"></v-progress-linear>
                    <v-card-title v-if="codeSent" class="headline justify-center text-center primary--text break-word text-h5">Reset Password</v-card-title>
                    <v-card-title v-else class="headline justify-center text-center primary--text break-word text-h5">Get Verification Code</v-card-title>
                    <v-card-text v-if="error" class="error--text text-center text-body-1 px-0">
                        {{ error }}
                    </v-card-text>
                    <v-form ref="form" v-model="valid" class="w-100" @submit.prevent>
                        <template v-if="codeSent">
                            <v-text-field v-model="verificationCode" :rules="[rules.required('Verification Code')]" name="verificationCode" label="Verification Code" required></v-text-field>
                            <v-text-field v-model="newPassword" :rules="[rules.required('New Password'), rules.length('Password', 8), rules.password]" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="newPassword" label="New Password" counter @click:append="show1 = !show1"></v-text-field>
                            <v-text-field v-model="confirmPassword" :rules="[rules.required('Confirm Password'), rules.length('Password', 8), rules.password, confirmPasswordRule]" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="confirmPassword" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                            <v-card-text class="text-right text-body-1 px-0">
                                Not recieved verification code?
                                <!-- <v-btn @click.prevent="resetPassword" text small>Resend code</v-btn> -->
                                <a @click.prevent="resetPassword">Resend code</a>
                            </v-card-text>
                            <v-btn :disabled="!valid" color="primary" x-large class="w-100" @click="confirmNewPassword" @keyup.enter="confirmNewPassword" depressed>
                                Reset Password
                            </v-btn>
                        </template>
                        <template v-else>
                            <v-text-field v-model="email" :rules="[rules.required('Email'), rules.email]" name="email" label="E-mail" required></v-text-field>
                            <v-btn :disabled="!valid" color="primary" x-large class="w-100" @click="resetPassword" @keyup.enter="resetPassword" depressed>
                                Get Code
                            </v-btn>
                        </template>
                        <v-card-text class="text-center text-body-1 px-0">
                            Remember old password?
                            <nuxt-link to="/auth/signin">Click Here</nuxt-link>
                        </v-card-text>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

export default {
    head: {
        script: [
            // {src: '~assets/js/amazon-cognito-auth.min.js', crossorigin :'anonymous'},
            // {
            //     src: '../js/cognito_config.js',
            //     crossorigin: 'anonymous',
            //     body: true
            // },
            // {src: 'https://unpkg.com/bulma-modal-fx/dist/js/modal-fx.min.js', crossorigin :'anonymous'}
        ],
    },
    data: () => ({
        valid: false,
        codeSent: false,
        verificationCode: '',
        show1: false,
        email: '',
        newPassword: '',
        confirmPassword: '',
        error: '',
        isLoading: false,
        rules: {
            required(propName) {
                return v => !!v || `${propName} field is required`
            },
            length(propName, len) {
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
            this.isLoading = true;
            const { email } = this
            const data = { email }
            debugger
            this.$axios('/auth/forgotpassword', {
                method: 'post',
                data: data
            }).then(res => {
                debugger
                this.isLoading = false
                const data = res.data.message
                if (data.code == 'LimitExceededException') {
                    this.error = data.message
                } else {
                    this.$toasted.show(
                        `Verification code has been sent to <strong>${email}</strong>. Please check your email.`, {
                            duration: 6000
                        }
                    )
                    this.error = ''
                    this.codeSent = true
                }
            }).catch((err) => {
                // debugger
                this.isLoading = false
                this.error = err.message
                console.log(err)
            })
        },
        confirmNewPassword() {
            // debugger
            this.isLoading = true
            const {
                email,
                verificationCode,
                newPassword
            } = this
            const data = {
                email,
                verificationCode,
                newPassword
            }
            this.$axios('/auth/confirmPasswordChange', {
                method: 'post',
                data: data
            }).then(res => {
                // debugger
                this.isLoading = false
                const data = res.data
                this.$toasted.show(
                    `${data.message}`, {
                        duration: 6000
                    }
                )
                this.$router.push('/auth/signin')
            }).catch((err) => {
                // debugger
                this.isLoading = false
                this.error = err.message
                console.log(err)
            })
        },
        forgotPassword() {
            var $vm = this,
                email = $vm.email;
            var poolData = {
                UserPoolId: _config.cognito.userPoolId, // Your user pool id here
                ClientId: _config.cognito.clientId, // Your client id here
            };
            var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
            var userData = {
                // Username: document.getElementById("inputUsername").value,
                Username: email,
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
                    debugger
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
