<template>
  <a
    :href="url"
    class="text-center text-white bg-purple-500 py-1 leading-8 w-full"
  >
    <fa :icon="['fab', 'discord']" class="mr-2 text-lg" />
    <span>Sign in with Discord</span>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DiscordSignIn',
  computed: {
    url() {
      return `${process.env.vueAppPollsApi}/auth/discord`
    },
  },
})
</script>

<style scoped>
</style>