<template>
    <div>
        <h2>Notifications</h2>
    </div>
</template>

<script>
    export default {
        middleware: ['refreshToken','authenticated'],
    }
</script>

<style lang="scss" scoped>

</style>
