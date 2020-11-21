<template>
  <div
    :class="[
      'container relative bg-white p-2 transition-colors duration-300',
      { 'shadow-sm': active },
    ]"
  >
    <div v-if="!active" class="absolute top-0 left-0 h-full w-full z-10"></div>
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <p class="transition duration-200" :class="{ 'text-gray-400': !value }">
          {{ name }}
        </p>
        <InfoToolTip
          text="here super long tool tip that takes up more space then before and is really annoying"
          class="ml-3"
          :disabled="!active"
        />
      </div>
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