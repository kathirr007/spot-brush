<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" sm="4"><h2 class="text-h4">Settings</h2></v-col>
      <v-spacer />
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="search" hide-details variant="solo" prepend-inner-icon="mdi-magnify" label="Search" clearable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['refresh-token', 'authenticated'] })
const search = ref('')
</script>
