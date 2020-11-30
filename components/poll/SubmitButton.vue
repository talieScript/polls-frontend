<template>
  <button
    class="button focus:shadow-outline uppercase"
    :class="{ active: selectedAnswersNo >= requiredAnswers }"
    @click="$emit('click')"
  >
    <span v-if="selectedAnswersNo >= requiredAnswers">Submit Answers</span>
    <span v-else>Choose {{ requiredAnswers - selectedAnswersNo }} More</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SubmitButton',
  props: {
    requiredAnswers: {
      type: Number,
      required: true,
    },
    selectedAnswersNo: {
      type: Number,
      required: true,
    },
  },
})
</script>

<style scoped>
.button {
  @apply w-40 h-10 rounded bg-gray-200 border-2 pointer-events-none;
}
.active {
  @apply bg-green-400 rounded text-white outline-none border-none cursor-pointer pointer-events-auto;
}
</style>