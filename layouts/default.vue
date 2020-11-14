<template>
  <div class="font-sans bg-secondary h-screen text-gray-600 overflow-auto">
    <AppHeader />
    <div class="flex align-center max-w-lg w-full mx-auto pb-16">
      <Nuxt class="pt-16 sm:pt-16" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped>
html {
  height: 100%;
}
</style>