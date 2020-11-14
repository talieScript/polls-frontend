<template>
  <div class="container relative bg-white p-2">
    <div class="flex justify-between items-center">
      <p :class="{ 'text-gray-400': !value }">{{ name }}</p>
      <ToggleButton v-model="active" />
    </div>
    <slot name="default"> </slot>
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
  @apply rounded;
  min-height: 5rem;
}
</style>