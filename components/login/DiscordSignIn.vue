<template>
  <a
    :href="url"
    class="text-center text-white bg-purple-500 py-2 leading-8 px-5"
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
      return `${process.env.VUE_APP_POLLS_API}/auth/discord`
    },
  },
})
</script>

<style scoped>
</style>