<template>
    <v-container :class="[$vuetify.breakpoint.lgAndUp ? 'container--fluid pa-8' : '']">
        <v-row align="center">
            <v-col cols="12" sm="4" class="align-center">
                <h2 class="grey--text text--darken-3 text-h4">Settings</h2>
                <!-- <v-spacer></v-spacer> -->
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="4" class="">
                <v-text-field v-model="searchDash" hide-details solo prepend-inner-icon="mdi-magnify" label="Search" clearable></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        middleware: ['refreshToken', 'authenticated'],
        data() {
            return {
                dialog: false,
                boardName: null,
                searchDash: '',
                error: '',
                valid: false,
                showMenu: false,
                x: 0,
                y: 0,
                rules: {
                    required(propName){
                        return v => !!v || `${propName} field is required`
                    },
                    length(propName, len){
                        return v => (v || '').length >= len || `${propName} should be at least ${len} characters`
                    }
                },
            }
        },
        methods: {
            /* show(e) {
                e.preventDefault()
                this.showMenu = false
                this.x = e.clientX
                this.y = e.clientY
                this.$nextTick(() => {
                    this.showMenu = true
                })
            }, */
            createBoard() {
                // debugger
                this.dialog = false
                const { email } = this.$store.state.auth
                const data = { email, boradName: this.boardName }
                const accessToken = this.$store.state.auth.jwt
                // console.log('checking create...')
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
    .dashboard-contents-list {
        .v-card {
            .v-btn--icon {
                position: absolute;
                top: 0;
                right: 0;
            }
        }
    }
</style>
