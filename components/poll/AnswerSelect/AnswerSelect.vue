<template>
  <div>
    <SingleSelect
      v-for="answer in answers"
      :key="answer.text"
      :answer-text="answer.answer_string"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AnswerSelect',
  props: {
    answers: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style scoped>
</style>