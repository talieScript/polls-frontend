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
      <h4 class="text-center mt-5">Sign in with your email</h4>
      <form class="mt-5 w-full" @submit.prevent="logIn">
        <div
          @submit.prevent="logIn"
          class="relative transition-all duration-500"
          :class="{ 'pb-20 pt-20': newUser }"
        >
          <transition name="slide">
            <div v-if="newUser" class="absolute top-0 w-full">
              <TextInput
                v-model="name"
                label="Name"
                outline
                width="full"
                :rules="[
                  (value) => (value > 25 ? 'Max 25 characters, sorry' : ''),
                  (value) => (!value ? 'Required' : ''),
                ]"
                :error.sync="nameError"
                validateOnBlur
                required
              />
            </div>
          </transition>
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
            class="mt-10"
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
            <div v-if="newUser" class="absolute bottom-0 w-full">
              <TextInput
                v-model="pass2"
                label="confirm password"
                outline
                width="full"
                :rules="[
                  ...passRules,
                  (value) => (value === pass1 ? '' : 'Passwords do not match'),
                ]"
                :error.sync="pass2Error"
                validateOnBlur
                required
                password
              />
            </div>
          </transition>
        </div>
        <div class="flex w-full items-center justify-between">
          <button
            type="button"
            @click.prevent="newUser = !newUser"
            class="underline text-xs"
          >
            {{ !newUser ? 'New user?' : 'Existing user?' }}
          </button>
          <nuxt-link
            to="/request-password-reset"
            v-if="!newUser"
            class="underline text-xs"
          >
            forgotten password
          </nuxt-link>
        </div>
        <BasicButton
          rounded="md"
          class="w-full mt-2"
          :loading="loading"
          @click="logIn"
        >
          Sign {{ !newUser ? 'In' : 'Up' }}
        </BasicButton>
      </form>
    </div>
    <SnackBar v-model="showSnack" :text="errorSnackText" colour="red" />
    <SnackBar
      v-model="showPasswordChange"
      :text="snackText.password.changed"
      colour="green-400"
      :timer="6000"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { checkPassword } from '@/utils/helpers'
import snackText from '@/utils/snackText'

export default Vue.extend({
  data(): any {
    return {
      loading: false,
      name: '',
      email: '',
      pass1: '',
      pass2: '',
      emailError: '',
      pass1Error: '',
      pass2Error: '',
      nameError: '',
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
          return checkPassword(input)
        },
        (input): string => {
          return input ? '' : 'Required'
        },
      ],
      newUser: false,
      errorSnackText: '',
      showSnack: false,
      snackText,
      showPasswordChange: false,
    }
  },
  mounted() {
    if (this.$route.query.passwordChanged) {
      this.showPasswordChange = true
    }
  },
  methods: {
    async logIn(): Promise<void> {
      this.showSnack = false
      const {
        pass2Error,
        pass1Error,
        emailError,
        email,
        pass1,
        pass2,
        name,
        newUser,
      } = this
      if (!email || !pass1) {
        this.emailError = !email ? 'Required' : ''
        this.pass1Error = !pass1 ? 'Required' : ''
        return
      }
      if (pass1Error || emailError) {
        return
      }
      if (newUser) {
        this.pass2Error = !pass2 ? 'Required' : ''
        this.pass2Error =
          pass2 && pass2 !== pass1 ? 'Passwords do not match' : ''
        if (this.pass2Error) {
          return
        }
      }
      this.loading = true
      await this.$axios
        .post(
          `${process.env.vueAppPollsApi}/auth/${newUser ? 'signup' : 'login'}`,
          {
            email,
            name,
            password: pass1,
          }
        )
        .then(({ data }) => {
          // set user
          this.$auth.setUser(data.user)
          this.$auth.setUserToken(data.access_token)
        })
        .catch((error) => {
          console.log(error.message)
          if (error.message === 'Request failed with status code 403') {
            this.errorSnackText = 'This email is already in use'
            this.showSnack = true
          }
          if (error.message === 'Request failed with status code 401') {
            this.errorSnackText = 'Incorect email or password'
            this.showSnack = true
          }
        })
      this.loading = false
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