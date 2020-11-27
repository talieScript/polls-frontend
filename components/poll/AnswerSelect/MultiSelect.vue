<template>
  <fieldset>
    <div v-for="answer in answers" :key="answer.id" class="flex mt-5">
      <input
        v-model="checkedAnswers"
        :id="answer.id"
        type="checkbox"
        class="w-0 h-0"
        :value="answer.id"
        :checked="checkedAnswers.includes(answer.id)"
      />
      <div
        class="box transition-all duration-200"
        @click="toggleCheck(answer.id)"
      >
        <label :for="answer.id" class="label mr-auto pointer-events-none">
          {{ answer.answer_string }}
          {{ checkedAnswers.includes(answer.id) ? 'here' : 'no' }}
        </label>
        <span class="w-6 h-6 border rounded bg-gray-100"></span>
      </div>
    </div>
  </fieldset>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ApiAnswer } from '@/utils/types'

export default Vue.extend({
  name: 'MultiSelect',
  data(): any {
    return {}
  },
  props: {
    answers: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    } as PropOptions<string[]>,
    answerNumber: {
      type: Number,
      required: true,
    },
  },
  computed: {
    checkedAnswers: {
      get(): string[] {
        return this.value
      },
      set(value: ApiAnswer) {
        this.$emit('input', value)
      },
    } as any,
  },
  methods: {
    toggleCheck(id): void {
      const answerIndex = this.checkedAnswers.indexOf(id)
      if (answerIndex + 1) {
        this.checkedAnswers.splice(answerIndex, 1)
      } else {
        this.checkedAnswers.push(id)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.box {
  @apply px-3 py-3 bg-white w-full rounded flex justify-between align-middle cursor-pointer;
  &:not(:first-of-type) {
    @apply mt-6;
  }
}

input:focus + .box {
  @apply shadow-outline;
}
</style>