<template>
  <div class="">
    <div
      :class="[
        'mt-3 bg-white px-2 py-3 rounded-md text-right cursor-pointer transition-all duration-150',
        { active: selected === choice.value },
      ]"
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
      <label class="label w-full cursor-pointer" :for="choice.value">
        <span class="circle"></span>
        <span>{{ choice.text }}</span>
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
  name: 'RadioGroup',
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
</style>