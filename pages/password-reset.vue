<template>
  <div>
    <h1 class="text-2xl text-gray-700 mb-8 mt-3 text-center">Password Reset</h1>
    <form class="flex flex-col items-center justify-between">
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
      <BasicButton
        rounded="md"
        class="w-full mt-5"
        :loading="loading"
        @click="logIn"
      >
        confirm
      </BasicButton>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { checkPassword } from '@/utils/helpers'

export default Vue.extend({
  data() {
    return {
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
    }
  },
  methods: {
    handelSubmit() {},
  },
})
</script>

<style scoped>
</style>