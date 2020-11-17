<template>
  <div class="relative disabled">
    <label class="absolute top-0 left-0 z-0 label" for="number-select"
      >Number Select</label
    >
    <input
      v-model="localValue"
      id="number-select"
      type="number"
      class="input rounded outline-none h-19 appearance-none inline-block m-0"
    />
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
        this.$emit('input', value)
      },
    },
  },
})
</script>

<style scoped>
.input {
  max-width: 3.5rem;
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
</style>