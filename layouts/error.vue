<template>
    <div class="container pa-0 align-center d-flex h-100">
        <ErrorView :title="`Ooooops, the page you are trying to access doesn't exist.`" :status="'404'" :navigateToPage="userIsAuthenticated ? '/dashboard' : '/'" :navigateToText="userIsAuthenticated ? 'Navigate back to Dashboard' : 'Navigate back to Home Page'"
        />
    </div>
</template>

<script>
import ErrorView from '@/components/shared/ErrorView'
export default {
    components: {
        ErrorView
    },
    computed: {
        userIsAuthenticated() {
            return this.$store.state.auth != null ? true : false
        },
    }
}
</script>

<style scoped>

</style>
