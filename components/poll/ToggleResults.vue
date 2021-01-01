<template>
  <button
    class="border-2 text-center rounded px-2 py-1 text-sm leading-4 outline-none"
    :class="[
      `text-${disabled ? 'gray-300' : 'primary'}`,
      `border-${disabled ? 'gray-300' : 'primary'}`,
      { 'cursor-default': disabled },
      { 'focus:shadow-outline': !disabled },
    ]"
    @click="toggleValue"
    :content="tipContent"
    aria-label="toggle results"
    v-tippy="{
      arrowType: 'sharp',
      arrow: true,
      placement: 'top',
      // hide the tip if active or no content
      zIndex: disabled && tipContent ? 99999 : -1,
    }"
  >
    <span v-if="toggle">hide</span>
    <span v-else>show</span>
    <br />
    results
  </button>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { PollOptions } from '@/utils/types'
import VueTippy from 'vue-tippy/dist/vue-tippy.esm'
Vue.use(VueTippy)

export default Vue.extend({
  name: 'ToggleResults',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
    pollOptions: {
      type: Object,
      required: true,
    } as PropOptions<PollOptions>,
  },
  computed: {
    toggle: {
      get(): boolean {
        return this.value
      },
      set(value: boolean) {
        this.$emit('input', value)
      },
    },
    tipContent(): string {
      const { pollOptions } = this
      if (pollOptions.resultsVisibility === 'alwaysShow') {
        return
      }
      if (pollOptions.resultsVisibility === 'afterVote') {
        return 'This poll requires that you to have voted before you can see the results'
      }
      if (pollOptions.resultsVisibility === 'pollEnd') {
        return 'Results will be visible after the poll has finished'
      }
    },
  },
  methods: {
    toggleValue() {
      if (this.disabled) {
        return
      }
      this.toggle = !this.toggle
    },
  },
})
</script>

<style scoped>
</style>