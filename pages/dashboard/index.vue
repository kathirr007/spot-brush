<template>
    <v-container :class="[$vuetify.breakpoint.lgAndUp ? 'container--fluid pa-8' : '']">
        <v-row align="center">
            <v-col cols="12" sm="4" class="align-center">
                <h2 class="grey--text text--darken-3 text-h4">Dashboard</h2>
                <!-- <v-spacer></v-spacer> -->
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="4" class="">
                <v-text-field v-model="searchDash" hide-details solo prepend-inner-icon="mdi-magnify" label="Search" clearable></v-text-field>
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
                    <v-btn class="w-100 text-capitalize text-body-1 mb-5" outlined color="primary" @click.stop="dialog = true">+ Create</v-btn>
                    <v-btn class="w-100 text-capitalize text-body-1 mb-5" outlined color="primary">+ Folder</v-btn>
                    <v-btn class="w-100 text-capitalize text-body-1 mb-5" outlined color="primary">Shared</v-btn>
                    <v-btn class="w-100 text-capitalize text-body-1 mb-5" outlined color="primary">Archived</v-btn>
                    <v-btn class="w-100 text-capitalize text-body-1" outlined color="primary">Trash</v-btn>
                </div>
            </v-col>
            <v-col cols="12" sm="8" md="9" lg="10" class="py-0">
                <v-container fluid class="py-0">
                    <v-row class="dashboard-contents-list">
                        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                            <v-card class="text-center">
                                <v-menu v-model="showMenu" absolute :position-x="x" :position-y="y" offset-y origin="center center" transition="scale-transition">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon class="grey--text text--lighten-1">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 1</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item disabled>
                                            <v-list-item-title>Option 2</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 3</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-card-title class="justify-center">
                                    <v-icon class="primary--text text-h1">mdi-folder</v-icon>
                                    <span class="white--text position-absolute text-body-1 mt-2 font-weight-bold">10</span>
                                </v-card-title>
                                <v-card-text class="grey--text text--darken-3 px-2 pb-2">
                                    Folder Name
                                    <small class="grey--text d-block">136MB | 6 months ago</small>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                            <v-card class="text-center">
                                <v-menu origin="center center" transition="scale-transition">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon class="grey--text text--lighten-1">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 1</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item disabled>
                                            <v-list-item-title>Option 2</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 3</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-card-title class="justify-center">
                                    <v-icon class="primary--text text-h1">mdi-folder</v-icon>
                                    <span class="white--text position-absolute text-body-1 mt-2 font-weight-bold">9</span>
                                </v-card-title>
                                <v-card-text class="grey--text text--darken-3 px-2 pb-2">
                                    Folder Name
                                    <small class="grey--text d-block">136MB | 6 months ago</small>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                            <v-card class="text-center">
                                <v-menu origin="center center" transition="scale-transition">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon class="grey--text text--lighten-1">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 1</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item disabled>
                                            <v-list-item-title>Option 2</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 3</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-card-title class="justify-center">
                                    <v-icon class="primary--text text-h1">mdi-file</v-icon>
                                </v-card-title>
                                <v-card-text class="grey--text text--darken-3 px-2 pb-2">
                                    File Name
                                    <small class="grey--text d-block">136MB | 6 months ago</small>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                            <v-card class="text-center">
                                <v-menu origin="center center" transition="scale-transition">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon class="grey--text text--lighten-1">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 1</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item disabled>
                                            <v-list-item-title>Option 2</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 3</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-card-title class="justify-center">
                                    <v-icon class="primary--text text-h1">mdi-folder</v-icon>
                                    <span class="white--text position-absolute text-body-1 mt-2 font-weight-bold">150</span>
                                </v-card-title>
                                <v-card-text class="grey--text text--darken-3 px-2 pb-2">
                                    Folder Name
                                    <small class="grey--text d-block">136MB | 6 months ago</small>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                            <v-card class="text-center">
                                <v-menu origin="center center" transition="scale-transition">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon class="grey--text text--lighten-1">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 1</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item disabled>
                                            <v-list-item-title>Option 2</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 3</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-card-title class="justify-center">
                                    <v-icon class="primary--text text-h1">mdi-folder</v-icon>
                                    <span class="white--text position-absolute text-body-1 mt-2 font-weight-bold">30</span>
                                </v-card-title>
                                <v-card-text class="grey--text text--darken-3 px-2 pb-2">
                                    Folder Name
                                    <small class="grey--text d-block">136MB | 6 months ago</small>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                            <v-card class="text-center">
                                <v-menu origin="center center" transition="scale-transition">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon class="grey--text text--lighten-1">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 1</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item disabled>
                                            <v-list-item-title>Option 2</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 3</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-card-title class="justify-center">
                                    <v-icon class="primary--text text-h1">mdi-folder</v-icon>
                                    <span class="white--text position-absolute text-body-1 mt-2 font-weight-bold">7</span>
                                </v-card-title>
                                <v-card-text class="grey--text text--darken-3 px-2 pb-2">
                                    Folder Name
                                    <small class="grey--text d-block">136MB | 6 months ago</small>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                            <v-card class="text-center">
                                <v-menu origin="center center" transition="scale-transition">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon class="grey--text text--lighten-1">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 1</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item disabled>
                                            <v-list-item-title>Option 2</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 3</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-card-title class="justify-center">
                                    <v-icon class="primary--text text-h1">mdi-file</v-icon>
                                </v-card-title>
                                <v-card-text class="grey--text text--darken-3 px-2 pb-2">
                                    File Name
                                    <small class="grey--text d-block">136MB | 6 months ago</small>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                            <v-card class="text-center">
                                <v-menu origin="center center" transition="scale-transition">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon class="grey--text text--lighten-1">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 1</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item disabled>
                                            <v-list-item-title>Option 2</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 3</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-card-title class="justify-center">
                                    <v-icon class="primary--text text-h1">mdi-folder</v-icon>
                                    <span class="white--text position-absolute text-body-1 mt-2 font-weight-bold">30</span>
                                </v-card-title>
                                <v-card-text class="grey--text text--darken-3 px-2 pb-2">
                                    Folder Name
                                    <small class="grey--text d-block">136MB | 6 months ago</small>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                            <v-card class="text-center">
                                <v-menu origin="center center" transition="scale-transition">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon class="grey--text text--lighten-1">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 1</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item disabled>
                                            <v-list-item-title>Option 2</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 3</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-card-title class="justify-center">
                                    <v-icon class="primary--text text-h1">mdi-folder</v-icon>
                                    <span class="white--text position-absolute text-body-1 mt-2 font-weight-bold">7</span>
                                </v-card-title>
                                <v-card-text class="grey--text text--darken-3 px-2 pb-2">
                                    Folder Name
                                    <small class="grey--text d-block">136MB | 6 months ago</small>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                            <v-card class="text-center">
                                <v-menu origin="center center" transition="scale-transition">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon class="grey--text text--lighten-1">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 1</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item disabled>
                                            <v-list-item-title>Option 2</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 3</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-card-title class="justify-center">
                                    <v-icon class="primary--text text-h1">mdi-file</v-icon>
                                </v-card-title>
                                <v-card-text class="grey--text text--darken-3 px-2 pb-2">
                                    File Name
                                    <small class="grey--text d-block">136MB | 6 months ago</small>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                            <v-card class="text-center">
                                <v-menu origin="center center" transition="scale-transition">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon class="grey--text text--lighten-1">mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 1</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item disabled>
                                            <v-list-item-title>Option 2</v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-title @click.prevent="">Option 3</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-card-title class="justify-center">
                                    <v-icon class="primary--text text-h1">mdi-folder</v-icon>
                                    <span class="white--text position-absolute text-body-1 mt-2 font-weight-bold">30</span>
                                </v-card-title>
                                <v-card-text class="grey--text text--darken-3 px-2 pb-2">
                                    Folder Name
                                    <small class="grey--text d-block">136MB | 6 months ago</small>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <h3 class="headline">Create whiteboard</h3>
                </v-card-title>
                <v-container class="py-0">
                    <v-form v-model="valid">
                            <v-col cols="12">
                                <v-text-field :rules="[rules.required('Board Name'), rules.length('Board Name', 10)]" v-model="boardName" label="Please provide name for your whiteboard" required></v-text-field>
                            </v-col>
                    </v-form>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false">Cancel</v-btn>
                    <v-btn color="primary darken-1" :disabled="!valid" @click="createBoard">Create Board</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                this.$axios.get('http://localhost:3000/loadwhiteboard', {
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
                    // debugger
                    window.open(`http://localhost:8080/?whiteboardid=myNewWhiteboard&accesstoken=${authToken.token}`, '_blank')
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
