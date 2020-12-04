<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ValidationDialog',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<style scoped>
</style>