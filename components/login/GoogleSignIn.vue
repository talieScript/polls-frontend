<template>
  <a
    :href="url"
    class="bg-blue-500 w-full text-center text-white py-1 leading-8"
  >
    <fa :icon="['fab', 'google']" class="mr-2 text-lg" />
    <span class="mr-3 py-1">Sign in with Google</span>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'GoogleSignIn',
  computed: {
    url() {
      return `${process.env.VUE_APP_POLLS_API}/auth/google`
    },
  },
})
</script>

<style scoped>
</style>