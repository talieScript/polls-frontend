<template>
  <div class="w-full">
    <div class="max-w-sm mx-auto">
      <h1 class="text-2xl text-gray-700 mb-8 mt-3 text-center">
        Password Reset
      </h1>
      <p class="mb-1">
        To reset your password, enter the email address you use to sign in.
      </p>
      <form
        @submit.prevent="submit"
        class="flex flex-col items-center justify-between"
      >
        <TextInput
          v-model="email"
          label="Email"
          outline
          width="full"
          :rules="emailRules"
          :error.sync="emailError"
          required
          validateOnBlur
        />
        <BasicButton rounded="md" class="w-full mt-5" :loading="loading">
          confirm
        </BasicButton>
      </form>
    </div>
    <SnackBar :text="snackText.password.sent" v-model="showSnack" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import snackText from '@/utils/snackText'

export default Vue.extend({
  data() {
    return {
      snackText,
      loading: false,
      email: '',
      emailRules: [
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
            ? ''
            : 'Must be a valid email',
        (input) => {
          return input ? '' : 'Required'
        },
      ],
      emailError: '',
      showSnack: false,
    }
  },
  methods: {
    async submit() {
      if (!this.email) {
        this.emailError = 'Required'
      }
      if (this.emailError) {
        return
      }
      this.loading = true
      await this.$axios
        .get(
          `${process.env.VUE_APP_POLLS_API}/auth/forgotten-password?email=${this.email}`
        )
        .then(() => {
          this.showSnack = true
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>

<style scoped>
</style>