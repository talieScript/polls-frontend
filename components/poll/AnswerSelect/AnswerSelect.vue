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
import Vue, { PropOptions } from 'vue'
import { Answer } from '@/utils/types'

export default Vue.extend({
  name: 'AnswerSelect',
  props: {
    answers: {
      type: Array,
      required: true,
    } as PropOptions<Answer[]>,
    answerNumber: {
      type: Number,
      required: true,
    },
    exact: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<style scoped>
</style>