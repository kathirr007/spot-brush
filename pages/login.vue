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
                                <b-form @submit="SignIn" v-if="show">
                                    <b-form-group
                                        id="input-group-1"
                                        label="Email address"
                                        label-for="input-1"
                                        description=""
                                    >
                                        <b-form-input
                                        id="input-1"
                                        v-model="form.email"
                                        type="email"
                                        required
                                        placeholder="Enter email"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="input-group-2" label="Password" label-for="input-2" description="">
                                        <b-form-input
                                        id="input-2"
                                        v-model="form.password"
                                        required
                                        type="password"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-button type="submit" variant="primary">Sign In</b-button>
                                    <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
                                </b-form>
                            </b-tab>
                            <b-tab title="Sign-up" lazy>
                                <b-form @submit="onSignUp" v-if="show">
                                    <b-form-group
                                        id="input-group-1"
                                        label="First Name"
                                        label-for="input-1"
                                        description=""
                                    >
                                        <b-form-input
                                        id="input-1"
                                        v-model="form.firstName"
                                        type="text"
                                        placeholder="Enter your first name"
                                        ></b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                        id="input-group-2"
                                        label="First Name"
                                        label-for="input-2"
                                        description=""
                                    >
                                        <b-form-input
                                        id="input-2"
                                        v-model="form.lastName"
                                        type="text"
                                        placeholder="Enter your last name"
                                        ></b-form-input>
                                    </b-form-group>
                                    <b-form-group
                                        id="input-group-3"
                                        label="Email address"
                                        label-for="input-3"
                                        description="We'll never share your email with anyone else."
                                    >
                                        <b-form-input
                                        id="input-3"
                                        v-model="form.email"
                                        type="email"
                                        required
                                        placeholder="Enter email"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="input-group-4" label="New Password" label-for="input-4" description="Please choose strong password.">
                                        <b-form-input
                                        id="input-4"
                                        v-model="form.password"
                                        required
                                        type="password"
                                        ></b-form-input>
                                    </b-form-group>
                                    <b-form-group id="input-group-5" label="Confirm Password" label-for="input-5" description="It should match new password.">
                                        <b-form-input
                                        id="input-5"
                                        v-model="form.confirmPassword"
                                        required
                                        type="password"
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-button type="submit" variant="primary">Sign Up</b-button>
                                    <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
                                </b-form>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { AmazonCognitoIdentity } from 'amazon-cognito-identity-js';
    export default {
        data() {
            return {
                form: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                show: true
            }
        },
        methods: {
            SignIn() {
                var authenticationData = {
                    Username : this.form.email,
                    Password : this.form.password
                };

                var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

                var poolData = {
                    UserPoolId : _config.cognito.userPoolId, // Your user pool id here
                    ClientId : _config.cognito.clientId, // Your client id here
                };

                var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

                var userData = {
                    Username : this.form.email,
                    Pool : userPool,
                };

                var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function (result) {
                        // window.location.href = '/index-old.html';
                        this.$router.push('/login')
                        return;
                    },

                    onFailure: function(err) {
                        return alert(err.message || JSON.stringify(err));
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
