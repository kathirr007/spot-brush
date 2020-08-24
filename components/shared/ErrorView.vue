<template>
  <div class="notFoundContainer text-center w-100">
    <div class="m-b-xxl">
      <h1 class="title" v-html="title"></h1>
      <nuxt-link :to="navigateToPage" class="button is-primary">{{navigateToText}}</nuxt-link>
    </div>
    <h2 class="subtitle"><span class='d-block mdi mdi-emoticon-sad-outline'></span>{{status}}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    status: {
      required: true,
      type: String
    },
    navigateToPage: {
      required: true,
      type: String
    },
    navigateToText: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped>
  .title {
    font-size: 40px;
  }
  .subtitle {
    font-size: 7rem;
    text-align: center;
  }
  .notFoundContainer {
    /* margin-top: 80px; */
  }
</style>
