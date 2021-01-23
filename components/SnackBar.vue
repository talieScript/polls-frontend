<template>
  <div
    class="fixed bottom-0 left-0 flex items-end justify-center w-full h-10 pointer-events-none z-50"
  >
    <transition name="fade">
      <div
        v-if="open"
        :class="`bg-${colour}`"
        class="max-w-md w-full mx-5 min-h-full text-white text-sm rounded-t-sm p-3 relative pr-6 pointer-events-auto"
      >
        {{ text }}
        <slot> </slot>
        <button
          class="absolute top-0 right-0 mr-2 mt-1"
          aria-label="Close"
          @click="open = false"
        >
          <fa :icon="['fa', 'times']" />
        </button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SnackBar',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    colour: {
      type: String,
      default: 'blue-500',
    },
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    open: {
      get(): boolean {
        return this.value
      },
      set(value: boolean) {
        this.$emit('input', value)
      },
    },
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(50px);
}
</style>