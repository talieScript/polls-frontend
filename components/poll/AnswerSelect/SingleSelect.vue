<template>
  <div class="">
    <div
      :class="[
        'bg-white px-2 py-3 rounded-md text-right cursor-pointer transition-all duration-150 answer',
        { active: selected === answer.id },
      ]"
      v-for="answer in answers"
      :key="answer.id"
      @click="selected = answer.id"
    >
      <input
        v-model="selected"
        type="radio"
        :value="answer.id"
        :id="answer.id"
        name="answers"
        class="hidden"
      />
      <label class="label w-full cursor-pointer" :for="answer.id">
        <span>{{ answer.answer_string }}</span>
        <span class="circle"></span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'SingleSelect',
  props: {
    answers: {
      type: Array,
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
  computed: {
    selected: {
      get(): string[] {
        return this.value[0]
      },
      set(value: string) {
        this.$emit('input', [value])
      },
    },
  },
})
</script>

<style lang="scss" scoped>
.label {
  @apply flex justify-between items-center transition-all duration-150;
}

.circle {
  @apply border-gray-500 border-solid border-2 rounded-3xl w-5 h-5 relative transition-all duration-150;
  &::before {
    content: '\00a0 ';
    @apply w-3 h-3 inline-block absolute rounded-3xl transition-colors duration-150;
    top: 0.1rem;
    left: 0.15rem;
  }
}

.active {
  @apply text-primary;
  box-shadow: 0 5px 17px -2px rgba(125, 131, 255, 0.2),
    0 8px 3px -1px rgba(125, 131, 255, 0.1);

  .circle {
    @apply border-primary;
  }

  .circle {
    &::before {
      @apply bg-primary;
    }
  }
}
.answer:not(:first-of-type) {
  @apply mt-5;
}
</style>