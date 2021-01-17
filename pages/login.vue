<template>
  <div class="flex justify-center w-full">
    <div class="flex flex-col items-center max-w-sm w-full">
      <h1 class="text-2xl text-gray-700 mb-8 mt-3 text-center">Sign In</h1>
      <GoogleSignIn />
      <DiscordSignIn class="mt-2" />
      <FacebookSignIn class="mt-2" />
      <div class="flex items-center mt-8 w-full">
        <hr class="w-full" />
        <span class="mx-5">OR</span>
        <hr class="w-full" />
      </div>
      <div class="mt-8 w-full">
        <h4 class="text-center">Sign in with your email</h4>
        <TextInput label="email" outline width="full" :rules="emailRules" />
        <TextInput label="password" outline width="full" :rules="emailRules" />
        <button @click="newUser = !newUser" class="underline text-xs">
          {{ !newUser ? 'New user?' : 'Existing user?' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      emailRules: [],
      newUser: false,
    }
  },
})
</script>

<style scoped>
</style>