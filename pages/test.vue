<template>
  <v-card
    class="mx-auto w-75"
  >
    <v-form
      ref="form"
      v-model="valid"
      class="pa-4 pt-6"
    >
      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        color="deep-purple"
        counter="6"
        label="Password"
        style="min-height: 96px"
        type="password"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        color="deep-purple"
        label="Email address"
        type="email"
      ></v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        text
        @click="$refs.form.reset()"
      >
        Clear
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!valid"

        class="white--text"
        color="deep-purple accent-4"
        depressed
      >Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      email: undefined,
      valid: false,
    //   isLoading: false,
      password: undefined,
      rules: {
        email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required',
      },
    }),
  }
</script>
