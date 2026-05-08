<template>
  <div class="container pa-0 align-center d-flex h-100">
    <ErrorView
      :title="`Ooooops, the page you are trying to access doesn't exist.`"
      status="404"
      :navigate-to-page="auth.isAuthenticated ? '/dashboard' : '/'"
      :navigate-to-text="auth.isAuthenticated ? 'Navigate back to Dashboard' : 'Navigate back to Home Page'"
    />
  </div>
</template>

<script setup lang="ts">
import ErrorView from '@/components/shared/ErrorView.vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
</script>
