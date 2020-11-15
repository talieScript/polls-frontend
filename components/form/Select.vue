<template>
  <div>here</div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'Select',
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    } as PropOptions<{ text: string; value: string }[]>,
  },
})
</script>

<style scoped>
</style>