<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="7" class="mx-auto">
        <v-card class="w-100 rounded-xl pa-5">
          <v-card-title class="justify-center text-center text-primary text-h5">Please confirm your email</v-card-title>
          <v-card-text class="text-center">
            We've sent a confirmation email to <strong class="text-primary">{{ email }}</strong>.<br>
            Please check and confirm your registration.
          </v-card-text>
          <v-card-text class="text-center text-body-1 px-0">
            Already confirmed? <NuxtLink to="/auth/signin">Click Here</NuxtLink>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['refresh-token', 'not-authenticated'] })

const route = useRoute()
const email = computed(() => route.params.email as string)
</script>
