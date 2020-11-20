<template>
  <button
    class="block px-2 py-1 rounded border outline-none focus:shadow-outline ml-auto w-auto"
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