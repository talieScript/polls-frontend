<template>
  <button
    @click.prevent="localValue = !localValue"
    aria-label="Toggle button"
    :class="[
      'switch relative h-5 w-10 rounded-xl border cursor-pointer outline-none',
      { on: localValue },
      { 'pointer-events-none': disabled },
    ]"
  ></button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ToggleButton',
  props: {
    value: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    localValue: {
      get(): boolean {
        return this.value
      },
      set(value: boolean) {
        this.$emit('input', value)
      },
    },
  },
})
</script>

<style scoped>
.switch {
  @apply bg-red transition-colors duration-200;
  &::before {
    content: '\00a0';
    @apply inline-block rounded-full bg-white h-4 w-4 absolute transition-transform duration-200;
    top: 0.05rem;
    left: 0.05rem;
  }
}

.on {
  @apply bg-green-600;

  &::before {
    @apply transform translate-x-5;
  }
}
</style>