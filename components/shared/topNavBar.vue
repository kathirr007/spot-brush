<template>
  <div>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      disable-resize-watcher
      color="white"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact

        >
          <v-list-item-action>
            <v-icon class="grey--text text-lighten-1">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content class="grey--text text-lighten-1">
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-navigation-drawer
      v-model="drawer"
      color="white"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      mini-variant-width="70"
      :right="right"
      :src="bg"
      app
      disable-resize-watcher
      dark>
      <v-list
        class="py-0">
        <v-list-item two-line :class="miniVariant && ''">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg">
          </v-list-item-avatar>
          <!-- <v-list-item-avatar size="40" color="primary">
            <span class="white--text headline text-h6">LK</span>
          </v-list-item-avatar> -->

          <v-list-item-content>
            <v-list-item-title class="primary--text">User Name</v-list-item-title>
            <v-list-item-subtitle class="grey--text text-lighten-1">Subtitle</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          router
          exact
          >
          <v-list-item-action>
            <v-icon class="primary--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="primary--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-btn text v-if="$store.state.auth" class="text-capitalize grey--text text-lighten-1" @click="onLogout">
              <v-icon left dark class="hidden-sm-and-down">mdi-logout</v-icon> Logout
          </v-btn> -->
        <v-list-item v-if="$store.state.auth" @click="onLogout">
            <v-list-item-action>
                <v-icon class="primary--text">mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title class="primary--text">Logout</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- <div class="primary--text text-center">Test</div> -->
      <v-footer color="white" class="primary--text justify-center">
        <img class="" src="~assets/images/sb-logo.svg" />
        <span class="ml-2">{{ title }}</span>
      </v-footer>

    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="white"
    >
      <v-app-bar-nav-icon class="d-flex d-sm-none grey--text text-lighten-1" @click.stop="drawer = !drawer" />
      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title class="  pl-2 pl-sm-0">
        <nuxt-link to="/" class="primary--text text-decoration-none font-weight-bold text-h4">{{ title }}</nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="d-none d-sm-flex">
          <v-btn text v-for="item in menuItems" :key="item.title" class="text-capitalize grey--text text-lighten-1" :to="item.link">
              <v-icon left dark class="d-none d-md-flex">{{item.icon}}</v-icon>
              {{item.title}}
          </v-btn>
          <v-btn text v-if="$store.state.auth" class="text-capitalize grey--text text-lighten-1" @click="onLogout">
              <v-icon left dark class="hidden-sm-and-down">mdi-logout</v-icon> Logout
          </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    data () {
        return {
        clipped: false,
        drawer: false,
        background: false,
        miniVariant: true,
        rightDrawer: false,
        title: 'spotbrush',
        expandOnHover: true,
        permanent: true,
        right: false
      }
    },
    computed: {
      menuItems() {
          let menuItems = [
            { icon: "mdi-home", title: "Home", link: "/" },
            { icon: "mdi-information", title: "About", link: "/about" },
            { icon: "mdi-server", title: "Service", link: "/service" },
            { icon: "mdi-lock-open", title: "Sign in", link: "/auth/signin" }
          ];

          if (this.$store.state.auth) {
            menuItems = [
                { icon: "mdi-home", title: "Home", link: "/" },
                { icon: "mdi-information", title: "About", link: "/about" },
                { icon: "mdi-server", title: "Service", link: "/service" },
            ];
          }

          return menuItems;
        },
      userIsAuthenticated() {
        /* return (
          this.$store.getters.user !== null
          && this.$store.getters.user !== undefined
        ); */
      },
      bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      },
    },
    methods: {
        onLogout() {
            this.$axios('/auth/logout', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    Content: 'application/json'
                }
            }).then(res => {
                this.$store.commit('setAuth', null)
                this.$router.push('/')
            }).catch(err => {
                console.log(err)
                this.$store.commit('setAuth', null)
                this.$router.push('/')
            })
        },
    }
  }
</script>

<style lang="scss" scoped>
  .v-application {
    /* [class*='--active'] {
      color: $primary !important;
      font-weight: bold;
      &:before {
        background-color: inherit;
      }
    } */
    .v-app-bar, .v-navigation-drawer {
      .v-btn, .v-list-item {
        font-family: 'Josefin Sans', sans-serif;
        font-weight: 600;
        font-size: 16px;
        &--active {
          font-weight: 700;
          color: $primary !important;
          &:before {
            background-color: inherit;
          }
        }
      }
    }
    .v-navigation-drawer {
      .v-list-item {
          &--active {
            &:after {
              width: 5px;
              background-color: $primary;
              position: absolute;
              right: 0;
            }
          }
          &:hover::before {
            background-color: $primary;
          }
          &__action {
            &:first-child {
              margin-right: 12px;
            }
          }
      }
      .v-footer {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
        img {
          display: inline-flex;
          width: 20px;
        }
        span {
          display: none;
        }
      }
      &.v-navigation-drawer {
        &--is-mouseover {
          .v-footer {
            span {
              display: inline-flex;
            }
          }
        }
      }
    }
  }
</style>
