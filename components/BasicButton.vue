<template>
  <button
    class="block px-2 py-1 rounded-2xl border outline-none focus:shadow-outline ml-auto w-auto text-primary uppercase border-primary"
    @click="$emit('click')"
  >
    {{ text }}
    <slot name="default"></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Button',
  props: {
    text: {
      type: String,
    },
  },
})
</script>

<style scoped>
</style>