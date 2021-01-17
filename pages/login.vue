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
        <TextInput
          v-model="email"
          label="email"
          outline
          width="full"
          :rules="emailRules"
          :error.sync="emailError"
          required
          validateOnBlur
        />
        <TextInput
          class="mt-8"
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
        <transition name="slide">
          <TextInput
            class="mt-8"
            v-model="pass2"
            v-if="newUser"
            label="confirm password"
            outline
            width="full"
            :rules="emailRules"
            validateOnBlur
            required
            password
          />
        </transition>
        <button @click="newUser = !newUser" class="underline text-xs">
          {{ !newUser ? 'New user?' : 'Existing user?' }}
        </button>
        <BasicButton rounded="md" class="w-full mt-2" :loading="loading">
          Sign {{ !newUser ? 'In' : 'Up' }}
        </BasicButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data(): any {
    return {
      loading: false,
      email: '',
      pass1: '',
      pass2: '',
      emailError: '',
      pass1Error: '',
      emailRules: [
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
            ? ''
            : 'Must be a valid email',
        (input) => {
          return input ? '' : 'Required'
        },
      ],
      passRules: [
        (input): string => {
          return this.checkPassword(input)
        },
        (input) => {
          return input ? '' : 'Required'
        },
      ],
      newUser: false,
    }
  },
  methods: {
    checkPassword(password: string): string {
      if (!password) {
        return 'Cannot be empty'
      }
      if (password.length < 8) {
        return 'Must be more the 8 charentors'
      }
      if (password.length > 20) {
        return 'Cannot be over 20 charentors'
      }
      return ''
    },
  },
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>