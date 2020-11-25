<template>
  <div>single</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SingleSelect',
  props: {
    answers: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
</style>