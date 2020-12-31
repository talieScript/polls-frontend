<template>
  <NuxtLink
    v-if="!user"
    to="/login"
    class="rounded p-px"
    :class="[{ 'border-secondary': outline }, { border: outline }]"
  >
    <button
      @click="setUrl"
      class="outline-none focus:shadow-outline rounded p-1"
    >
      Login/Sign Up
    </button>
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginLink',
  props: {
    outline: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
  methods: {
    setUrl() {
      if (!localStorage.getItem('redirect')) {
        localStorage.setItem('redirect', this.$route.path)
      }
    },
  },
})
</script>

<style scoped>
</style>