<template>
  <div>
    <button
      @click.prevent
      class="rounded border px-2 py-1 flex justify-between items-center cursor-pointer w-full outline-none"
    >
      <span>{{ selected }}</span
      ><fa :icon="['fa', 'chevron-down']" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'Select',
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    } as PropOptions<{ text: string; value: string }[]>,
  },
  computed: {
    selected: {
      get(): string {
        return this.options.find((o) => o.value === this.value).text
      },
      set(value: string) {
        this.$emit('input', value)
      },
    },
  },
})
</script>

<style scoped>
</style>