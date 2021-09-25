<template>
  <div>
    <h1 class="text-2xl text-gray-700 mb-8 mt-3 text-center">Password Reset</h1>
    <form
      @submit.prevent="submit"
      class="flex flex-col items-center justify-between"
    >
      <TextInput
        v-model="pass1"
        label="password"
        outline
        width="full"
        :rules="passRules"
        :error.sync="pass1Error"
        required
        password
        validateOnBlur
      />
      <TextInput
        v-model="pass2"
        label="confim password"
        outline
        width="full"
        :rules="[
          ...passRules,
          (value) => (value === pass1 ? '' : 'Passwords do not match'),
        ]"
        :error.sync="pass2Error"
        required
        password
        validateOnBlur
      />
      <BasicButton class="w-full mt-5" :loading="loading">
        confirm
      </BasicButton>
    </form>
    <SnackBar
      v-model="showSnack"
      :text="snackText.password.error"
      colour="red"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { checkPassword } from '@/utils/helpers'
import snackText from '@/utils/snackText'

export default Vue.extend({
  data() {
    return {
      snackText,
      passRules: [
        (input): string => {
          return checkPassword(input)
        },
        (input): string => {
          return input ? '' : 'Required'
        },
      ],
      pass1: '',
      pass2: '',
      pass1Error: '',
      pass2Error: '',
      loading: false,
      showSnack: false,
    }
  },
  methods: {
    async submit() {
      if (!this.$route.query.id) {
        console.log('no code silly!')
        this.showSnack = true
      }
      this.loading = true
      await this.$axios
        .post(`${process.env.vueAppPollsApi}/auth/forgotten-password`, {
          password: this.pass1,
          id: this.$route.query.id,
        })
        .then(() => {
          this.$router.push('/login?passwordChanged=true')
        })
        .catch((error) => {
          console.error(error)
          this.showSnack = true
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