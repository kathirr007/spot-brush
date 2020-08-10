<template>
    <div>
        <v-navigation-drawer dark temporary v-model="sideNav" class="teal" app>
            <v-list>
                <v-list-item v-for="item in menuItems" :key="item.title" :to="item.link">
                    <v-list-item-action>
                        <v-icon>mdi-{{item.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>{{item.title}}</v-list-item-content>
                </v-list-item>
                <v-list-item v-if="userIsAuthenticated">
                    <v-list-item-action>
                        <v-icon>mdi-exit_to_app</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>Logout</v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar dark color="teal darken-4">
            <v-app-bar-nav-icon class="d-md-none d-sm-flex" @click.stop="sideNav = !sideNav" />
            <!-- <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon> -->
            <v-toolbar-title class="pl-md-0 pl-sm-2">
                <nuxt-link to="/" tag="span" class="navbar-brand" style="cursor: pointer"><img src="/spotbrush-logo.svg" alt="Spotbrush"></nuxt-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="d-none d-sm-flex">
                <v-btn text v-for="item in menuItems" :key="item.title" class="text-capitalize" :to="item.link">
                    <v-icon left dark class="hidden-sm-and-down">{{item.icon}}</v-icon>
                    {{item.title}}
                </v-btn>
                <v-btn v-if="userIsAuthenticated" class="text-capitalize" text @click="onLogout">
                    <v-icon left dark class="hidden-sm-and-down">exit_to_app</v-icon> Logout
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <!-- <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand to="/"><img src="/spotbrush-logo.svg" alt="Spotbrush"></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

                <b-navbar-nav class="ml-auto">
                    <b-button class="mr-2" to="/">Home</b-button>
                    <b-button variant="success" class="mr-2" to="/login">Login</b-button>
                    <b-button to="/index copy">Signup</b-button>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar> -->
    </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        sideNav: false
      };
    },
    computed: {
      menuItems() {
        let menuItems = [
          { icon: "mdi-face", title: "Sign up", link: "/signup" }, { icon: "mdi-lock-open", title: "Sign in", link: "/signin" }
        ];

        if (this.userIsAuthenticated) {
          menuItems = [
            {
              icon: "supervisor_account",
              title: "View Meetups",
              link: "/meetups"
            },
            { icon: "room", title: "Organize Meetup", link: "/meetup/new" },
            { icon: "person", title: "Profile", link: "/profile" }
          ];
        }

        return menuItems;
      },
      userIsAuthenticated() {
        /* return (
          this.$store.getters.user !== null
          && this.$store.getters.user !== undefined
        ); */
      }
    },
    methods: {
      /* onLogout() {
        this.$store.dispatch('logout');
      } */
    }
  };
</script>

<style lang="scss" scoped>
.nuxt-link-exact-active {
    color: #fff;
}
.navbar-brand img {
    width: 150px;
}
</style>
