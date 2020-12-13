<template>
  <div>home</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    console.log((this as any).$auth.user)
  },
})
</script>

<style>
</style>
