<template>
  <fieldset>
    <div v-for="answer in answers" :key="answer.id" class="">
      <input :id="answer.id" type="checkbox" />
      <label :for="answer.id">{{ answer.answer_string }}</label>
    </div>
  </fieldset>
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
    answerNumber: {
      type: Number,
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