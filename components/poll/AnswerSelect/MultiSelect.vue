<template>
  <fieldset>
    <div v-for="answer in answers" :key="answer.id" class="answer">
      <input v-model="chosen" :id="answer.id" type="checkbox" class="hidden" />
      <label :for="answer.id" class="label">
        {{ answer.answer_string }}
      </label>
      <span class="w-6 h-6 border rounded bg-gray-100"></span>
    </div>
  </fieldset>
</template>

<script lang="ts">
import Vue from 'vue'
import { ApiAnswer } from '@/utils/types'

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
  created() {
    console.log(this.answers)
  },
  computed: {
    chosen: {
      get(): string[] {
        return this.value
      },
      set(value: ApiAnswer) {
        this.$emit('input', value.id)
      },
    } as any,
  },
})
</script>

<style lang="scss" scoped>
div {
  @apply px-3 py-3 bg-white w-full rounded flex justify-between align-middle cursor-pointer;
  &:not(:first-of-type) {
    @apply mt-6;
  }
}
</style>