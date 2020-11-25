<template>
  <div>multi {{ answers }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MultiSelect',
  props: {
    answers: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chosen: {
      get(): string[] {
        return this.value
      },
      set(value: string[] | string) {
        this.$emit('input', value)
      },
    } as any,
  },
})
</script>

<style scoped>
</style>