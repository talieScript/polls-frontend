<template>
  <button
    v-if="!ended"
    class="button focus:shadow-outline uppercase"
    :class="{ active: selectedAnswersNo >= requiredAnswers }"
    @click="$emit('click')"
  >
    <LoadingSpinner v-if="loading" />
    <span v-else-if="selectedAnswersNo >= requiredAnswers">Submit Answers</span>
    <span v-else-if="ended"> Poll Ended </span>
    <span v-else> Choose {{ requiredAnswers - selectedAnswersNo }} More </span>
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
    loading: {
      type: Boolean,
      required: true,
    },
    ended: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<style scoped>
.button {
  @apply w-40 h-10 rounded bg-gray-200 border-2 pointer-events-none transition-all duration-200;
}
.active {
  @apply bg-green-400 rounded text-white outline-none border-none cursor-pointer pointer-events-auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>