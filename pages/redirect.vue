/**
* This page is only for redirecting the user after log in
*/
<template>
  <div class="flex items-center w-full h-full justify-center">
    <LoadingSpinner size="10" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async mounted() {
    if (!this.$auth.user) {
      const code = this.$route.query.code
      const strat = this.$route.query.strat
      const authRes = await this.$axios.get(
        `${process.env.VUE_APP_POLLS_API}/auth/${strat}?code=${code}`
      )
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
  methods: {
    getUser(auth) {},
  },
})
</script>

<style scoped>
</style>