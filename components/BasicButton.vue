<template>
  <button
    class="block px-2 py-1 border outline-none focus:shadow-outline w-auto uppercase"
    :class="[
      `text-${color}`,
      `border-${color}`,
      `text-${textSize}`,
      `rounded-${rounded}`,
    ]"
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
    color: {
      type: String,
      default: 'primary',
    },
    textSize: {
      type: String,
      default: 'base',
    },
    rounded: {
      type: String,
      default: '2xl',
    },
  },
})
</script>

<style scoped>
</style>