/**
* This page is only for redirecting the user after log in
*/
<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
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