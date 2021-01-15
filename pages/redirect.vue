/**
* This page is only for redirecting the user after log in
*/
<template>
  <div class="flex items-center"><LoadingSpinner /></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async mounted() {
    const code = this.$route.query.code
    if (code) {
      const authRes = await this.$axios.get(
        `${process.env.VUE_APP_POLLS_API}/auth/discord/${code}`
      )

      this.$auth.strategy('local')
      this.$auth.setUser(authRes.data.user)
      this.$auth.setUserToken(authRes.data.access_token)
    }
    if (!localStorage.getItem('redirect')) {
      this.$router.back()
      return
    }
    this.$router.push(localStorage.getItem('redirect'))
    localStorage.removeItem('redirect')
  },
})
</script>

<style scoped>
</style>