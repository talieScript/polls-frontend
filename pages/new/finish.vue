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
    <button @click="finish">finish</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      passOne: '',
      passTwo: '',
      passOneError: '',
      passTwoError: '',
      passRules: [
        (input) => {
          console.log(input.length < 20)
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
  methods: {
    finish() {
      if (this.passOne !== this.passTwo) {
        this.passTwoError = 'Passwords do not match'
      }
    },
  },
})
</script>

<style scoped>
</style>