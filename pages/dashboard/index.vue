<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" sm="4"><h2 class="text-h4">Dashboard</h2></v-col>
      <v-spacer />
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="searchDash" hide-details variant="solo" prepend-inner-icon="mdi-magnify" label="Search" clearable />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="rounded-lg" min-height="130">
          <v-card-title class="text-h5">Storage</v-card-title>
          <v-card-text class="text-center text-h5"><span class="text-h3 text-primary">10</span> / 100 GB</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="rounded-lg" min-height="130">
          <v-card-title class="text-h5">Shared</v-card-title>
          <v-card-text class="d-flex justify-space-between">
            <span><span class="text-h4 text-primary">100</span> Files</span>
            <span><span class="text-h4 text-primary">60</span> Folders</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col offset="3" offset-sm="0" cols="6" sm="4" md="3" lg="2">
        <v-btn class="w-100 text-capitalize mb-5" variant="outlined" color="primary" @click.stop="dialog = true">+ Create</v-btn>
      </v-col>
      <v-col cols="12" sm="8" md="9" lg="10" class="py-0">
        <v-row>
          <v-col v-for="item in contentItems" :key="item.id" cols="12" sm="6" md="4" lg="3" xl="2">
            <v-card class="text-center" style="position:relative">
              <v-menu>
                <template #activator="{ props }">
                  <v-btn icon v-bind="props" variant="text" style="position:absolute;top:0;right:0">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item title="Option 1" /><v-list-item title="Option 2" disabled /><v-list-item title="Option 3" />
                </v-list>
              </v-menu>
              <v-card-title class="justify-center">
                <v-icon class="text-primary" size="64">{{ item.icon }}</v-icon>
              </v-card-title>
              <v-card-text class="px-2 pb-2">
                {{ item.name }}<small class="d-block text-grey">{{ item.meta }}</small>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>Create whiteboard</v-card-title>
        <v-container class="py-0">
          <v-form v-model="valid">
            <v-col cols="12">
              <v-text-field v-model="boardName" :rules="[rules.required('Board Name'), rules.length('Board Name', 3)]" label="Board name" required @keyup.enter="createBoard" />
            </v-col>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-spacer /><v-btn @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" :disabled="!valid" @click="createBoard">Create Board</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useAuthStore } from '~/stores/auth'

definePageMeta({ middleware: ['refresh-token', 'authenticated'] })

const auth = useAuthStore()
const router = useRouter()
const { $axios } = useNuxtApp()
const toast = useToast()

const dialog = ref(false)
const boardName = ref('')
const searchDash = ref('')
const valid = ref(false)

const rules = {
  required: (name: string) => (v: string) => !!v || `${name} field is required`,
  length: (name: string, len: number) => (v: string) => (v || '').length >= len || `${name} should be at least ${len} characters`,
}

const contentItems = [
  { id: 1, icon: 'mdi-folder', name: 'Folder Name', meta: '136MB | 6 months ago' },
  { id: 2, icon: 'mdi-folder', name: 'Folder Name', meta: '136MB | 6 months ago' },
  { id: 3, icon: 'mdi-file', name: 'File Name', meta: '136MB | 6 months ago' },
  { id: 4, icon: 'mdi-folder', name: 'Folder Name', meta: '136MB | 6 months ago' },
]

async function createBoard() {
  dialog.value = false
  try {
    const res = await $axios.post('/auth/createboard',
      { data: { email: auth.auth?.email, given_name: auth.auth?.given_name, boardName: boardName.value } },
      { headers: { Authorization: `Bearer ${auth.auth?.jwt}` } }
    )
    toast.success('Board created!')
    router.push(`/whiteboard?whiteboardid=${res.data.boardName}&username=${auth.auth?.given_name}`)
  } catch (err: any) {
    console.error(err.message)
  }
}
</script>
