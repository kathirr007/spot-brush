<template>
    <v-container :class="[$vuetify.breakpoint.lgAndUp ? 'container--fluid pa-8' : '']">
        <v-row>
            <v-col cols="12">
                <h2 class="grey--text text--darken-3 text-h4">Dashboard</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="4" lg="3">
                <v-card class="rounded-lg h-100 info-card d-flex flex-column" min-height="130">
                    <v-card-title class="grey--text text--darken-3 text-h5">
                        Storage
                    </v-card-title>
                    <v-card-text class="text-center text-h5 grey--text">
                        <span class="text-h3 primary--text">10</span> / 100 GB
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
                <v-card class="rounded-lg h-100 info-card d-flex flex-column" min-height="130">
                    <v-card-title class="grey--text text--darken-3 text-h5">
                        Shared
                    </v-card-title>
                    <v-card-text class="text-h6 grey--text d-flex font-weight-regular justify-space-between">
                        <span><span class="text-h4 primary--text">100</span> Files</span>
                        <span><span class="text-h4 primary--text">60</span> Folders</span>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col offset="3" offset-sm="0" cols="6" sm="4" md="3" lg="2">
                <div class="dashboard-actions">
                    <v-btn class="w-100 text-capitalize text-body-1 mb-5" outlined color="primary" @click="createBoard">+ Create</v-btn>
                    <v-btn class="w-100 text-capitalize text-body-1 mb-5" outlined color="primary">+ Folder</v-btn>
                    <v-btn class="w-100 text-capitalize text-body-1" outlined color="primary">Shared</v-btn>
                </div>
            </v-col>
            <v-col cols="12" sm="8" md="9" lg="10">
                <h3>Folders and files here..</h3>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        middleware: ['refreshToken', 'authenticated'],
        methods: {
            createBoard() {
                // debugger
                const { email } = this.$store.state.auth
                const data = { email }
                const accessToken = this.$store.state.auth.jwt
                console.log('checking create...')
                this.$axios('/auth/createboard', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        Content: 'application/json',
                        Authorization: `Bearer ${accessToken}`
                    },
                    data: data
                }).then(res => {
                    // debugger
                    const authToken = res.data
                    //   this.$store.commit('setAuth', auth)
                    console.log(authToken)
                    this.$toasted.show(
                        `Hello..! Welcome to our SbotBrush. A Collabarative Whiteboard...`, { duration: 6000 }
                    )
                    this.$router.push('/dashboard')
                }).catch((err) => {
                    console.log(err.message)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dashboard-actions{
        button {
            // margin-bottom: 30px;
            background-color: rgba($primary, 0.23);
            border-radius: 5px;
            border-width: 2px;
            &:last-child {
                // margin-bottom: 0;
            }
        }
    }
    .info-card {
        justify-content: space-between;
    }
</style>
