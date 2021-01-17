<template>
  <a
    :href="url"
    class="text-center text-white bg-blue-500 py-1 leading-8 w-full"
  >
    <fa class="mr-2 text-lg" :icon="['fab', 'facebook']" />
    Sign in with Facebook
  </a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FacebookSignIn',
  computed: {
    url() {
      return `${process.env.VUE_APP_POLLS_API}/auth/facebook`
    },
  },
})
</script>

<style scoped>
</style>