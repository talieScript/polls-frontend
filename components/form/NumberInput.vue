<template>
  <div :class="['relative disabled flex items-center justify-center']">
    <label class="absolute top-0 left-0 z-0 label" for="number-select"
      >Number Select</label
    >
    <input
      v-model="localValue"
      id="number-select"
      type="number"
      @keypress.prevent
      :class="[
        'input rounded outline-none h-19 appearance-none inline-block m-0 text-right pr-3',
        { disabled },
      ]"
    />
    <div class="flex flex-col">
      <button
        class="flex items-center text-gray-600 hover:text-primary outline-none focus:shadow-xs rounded"
        aria-label="subtract one"
        @click.prevent="add"
      >
        <fa :icon="['fa', 'angle-up']" />
      </button>
      <button
        class="flex items-center text-gray-600 hover:text-primary outline-none focus:shadow-xs rounded"
        aria-label="add one"
        @click.prevent="subtract"
      >
        <fa :icon="['fa', 'angle-down']" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NumberInput',
  props: {
    value: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      required: false,
    },
  },
  computed: {
    localValue: {
      get(): number {
        return this.value
      },
      set(value: number) {
        // validation
        this.$emit('input', Number(value))
      },
    },
  },
  watch: {
    max(value) {
      if (value < this.localValue && !(value < 1)) {
        this.localValue = this.max
      }
    },
  },
  methods: {
    add() {
      console.log(this.max)
      if (this.value >= this.max) {
        return
      }
      this.localValue = this.localValue + 1
    },
    subtract() {
      if (this.value === 1) {
        return
      }
      this.localValue = this.localValue - 1
    },
  },
})
</script>

<style scoped>
.input {
  max-width: 3.5rem;
  text-shadow: 0 0 0 gray;
  -moz-appearance: textfield; /* Firefox */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @apply text-transparent;
}
.label {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.disabled {
  @apply text-gray-400;
}
</style>