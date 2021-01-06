<template>
  <NuxtLink
    v-if="!user"
    to="/login"
    class="rounded p-px"
    :class="[{ 'border-secondary': outline }, { border: outline }]"
  >
    <button
      @click="setUrl"
      class="outline-none focus:shadow-outline rounded p-1 bg-primary text-white h-full w-full"
      :class="{ 'py-3': !compact }"
    >
      Log in or Sign Up
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
    compact: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    user() {
      return (this as any).$auth.user
    },
  },
  methods: {
    setUrl() {
      this.$emit('click')
      // set the current page to the redirct variable in the local storage
      if (!localStorage.getItem('redirect')) {
        localStorage.setItem('redirect', this.$route.path)
      }
    },
  },
})
</script>

<style scoped>
</style>