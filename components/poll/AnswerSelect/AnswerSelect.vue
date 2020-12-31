<template>
  <div>
    <div class="text-right text-xs mb-1 h-5">
      <span v-if="!disabled">{{ choiceNoHelp }}</span>
    </div>
    <component
      v-model="chosen"
      :is="answerCompoent"
      :answers="answers"
      :answerNumber="answerNumber"
      :disabled="disabled"
      :showResults="show"
    />
    <BasicButton @click="show = !show"> toggle results </BasicButton>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ApiAnswer } from '@/utils/types'
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
    } as PropOptions<ApiAnswer[]>,
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
    disabled: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      show: true,
    }
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
    choiceNoHelp() {
      if (this.answerNumber < 2) {
        return 'Choose 1 answer'
      }
      const exactText = this.exact ? 'Must choose' : 'Choose up to'
      return `${exactText} ${this.answerNumber} answers`
    },
  },
})
</script>

<style scoped>
</style>