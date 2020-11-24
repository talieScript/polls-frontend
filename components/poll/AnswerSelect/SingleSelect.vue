<template>
  <div>{{ answerText }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SingleSelect',
  props: {
    answerText: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
</style>