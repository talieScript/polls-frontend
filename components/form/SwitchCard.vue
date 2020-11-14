<template>
  <div :class="['container relative bg-white p-2', { 'shadow-sm': active }]">
    <div v-if="!active" class="absolute top-0 left-0 h-full w-full z-10"></div>
    <div class="flex justify-between items-center">
      <p :class="{ 'text-gray-400': !value }">{{ name }}</p>
      <ToggleButton v-model="active" class="z-20" />
    </div>
    <div class="absolute bottom-0 mb-2 w-full pr-4">
      <slot name="default"> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
    },
    name: {
      type: String,
    },
  },
  computed: {
    active: {
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


<style lang="scss" scoped>
.container {
  @apply rounded h-24;
}
</style>