<template>
  <button
    class="border-primary border-2 text-center text-primary rounded px-2 py-1 text-sm leading-4"
    @click="toggleValue"
  >
    <span v-if="toggle">hide</span>
    <span v-else>show</span>
    <br />
    results
  </button>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { PollOptions } from '@/utils/types'

export default Vue.extend({
  name: 'ToggleResults',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
    pollOptions: {
      type: Object,
      required: true,
    } as PropOptions<PollOptions>,
  },
  computed: {
    toggle: {
      get(): boolean {
        return this.value
      },
      set(value: boolean) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    toggleValue() {
      if (this.disabled) {
        return
      }
      this.toggle = !this.toggle
    },
  },
})
</script>

<style scoped>
</style>