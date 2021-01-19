<template>
  <div class="font-sans bg-secondary h-screen text-gray-600 overflow-auto">
    <AppHeader />
    <div
      class="flex align-center max-w-xl h-full w-full mx-auto pb-16 px-2 sm:px-0"
    >
      <Nuxt class="pt-16 sm:pt-16 w-full" />
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