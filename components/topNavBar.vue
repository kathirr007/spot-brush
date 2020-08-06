<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand to="/"><img src="/spotbrush-logo.svg" alt="Spotbrush"></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <!-- <b-navbar-nav>
                <b-nav-item href="#">Link</b-nav-item>
                <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav> -->

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <!-- <b-nav-item to="/" class="text-primary">Home</b-nav-item>
                <b-nav-item to="/test" class="text-primary">Login</b-nav-item> -->
                <b-button class="mr-2" to="/">Home</b-button>
                <b-button variant="success" class="mr-2" to="/login">Login</b-button>
                <b-button to="/index copy">Signup</b-button>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
.nuxt-link-exact-active {
    color: #fff;
}
.navbar-brand img {
    width: 150px;
}
</style>
