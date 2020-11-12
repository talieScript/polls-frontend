<template>
  <div>
    <div
      class="mt-3 bg-white px-2 py-3 rounded text-right"
      v-for="choice in choices"
      :key="choice.value"
      @click="selected = choice.value"
    >
      <input
        v-model="selected"
        type="radio"
        :value="choice.value"
        :id="choice.value"
        :name="groupName"
        class="hidden"
      />
      <label class="label w-full" :for="choice.value">
        {{ choice.text }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

interface Choice {
  text: string
  value: string
}

export default Vue.extend({
  name: 'CheckBox',
  props: {
    choices: {
      type: Array,
      required: true,
    } as PropOptions<Choice[]>,
    groupName: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
  },
  computed: {
    selected: {
      get(): String {
        return this.value
      },
      set(value: string) {
        this.$emit('input', value)
      },
    },
  },
})
</script>

<style scoped>
.label {
  @apply flex justify-between items-center;

  &::before {
    content: '\00a0 ';
    @apply border-gray-500 border-solid border-2 rounded-3xl w-5 h-5 relative;

    &::after {
      content: '\00a0 ';
      @apply bg-red w-5 h-5;
    }
  }
}
</style>