<template>
  <div>
    <component
      v-model="chosen"
      :is="answerCompoent"
      :answers="answers"
      :answerNumber="answerNumber"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { Answer } from '@/utils/types'
import SingleSelect from './SingleSelect.vue'
import MultiSelect from './MultiSelect.vue'

export default Vue.extend({
  name: 'AnswerSelect',
  components: {
    SingleSelect,
    MultiSelect,
  },
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
    value: {
      type: Array,
      required: true,
    },
  },
  computed: {
    answerCompoent() {
      return this.answerNumber > 1 ? 'MultiSelect' : 'SingleSelect'
    },
    chosen: {
      get(): string[] {
        return this.value
      },
      set(value: string[]) {
        this.$emit('input', value)
      },
    } as any,
  },
})
</script>

<style scoped>
</style>