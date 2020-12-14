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
    setTimeout(() => {
      this.$router.push(localStorage.getItem('redirect'))
    }, 1000)
  },
})
</script>

<style scoped>
</style>