<template>
  <div class="w-full">
    <h1
      class="font-semibold text-2xl text-gray-700 mb-8 mt-3 text-center mx-auto"
    >
      Finally
    </h1>
    <p>
      In order to allow you to edit and delete your poll, we need you to create
      a password.
    </p>
    <TextInput
      v-model="passOne"
      placeholder="enter a password"
      title="enter a password"
      outline
      bgColor="white"
      :rules="passRules"
      :error.sync="passOneError"
      password
    />
    <TextInput
      v-model="passTwo"
      placeholder="confirm password"
      title="confirm password"
      outline
      bgColor="white"
      :rules="passRules"
      :error.sync="passTwoError"
      password
    />
    <BasicButton
      class="ml-auto"
      text="Create with password"
      @click="submitWithPassword"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  transition: 'slide-left',
  data() {
    return {
      passOne: '',
      passTwo: '',
      passOneError: '',
      passTwoError: '',
      passRules: [
        (input) => {
          return input.length < 20 ? '' : 'Max 20 characters, sorry'
        },
      ],
    }
  },
  computed: {
    poll() {
      return this.$store.state.newPoll.active
    },
  },
  mounted() {
    // check user has updated poll
    if (this.$store.state.newPoll.initEdit) {
      this.$router.replace('/new')
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
      return ''
    },
    async submitWithPassword() {
      const { passOne, passTwo } = this
      this.passOneError = this.checkPassword(passOne)
      this.passTwoError = this.checkPassword(passTwo)
      if (this.passOneError || this.passTwoError) {
        return
      }
      if (this.passOne !== this.passTwo) {
        this.passTwoError = 'Passwords do not match'
        return
      }

      this.$store.dispatch('newPoll/submit', passOne)
    },
  },
})
</script>

<style scoped>
</style>