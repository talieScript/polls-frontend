<template>
  <fieldset>
    <div v-for="answer in answers" :key="answer.id" class="flex mt-5">
      <input v-model="chosen" :id="answer.id" type="checkbox" class="w-0 h-0" />
      <div class="box transition-all duration-200">
        <label :for="answer.id" class="label mr-auto">
          {{ answer.answer_string }}
        </label>
        <span class="w-6 h-6 border rounded bg-gray-100"></span>
      </div>
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