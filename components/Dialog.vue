<template>
  <div
    class="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-25 z-50 flex items-center justify-center"
    :class="{ hidden: !open }"
    @click="open = false"
  >
    <dialog
      class="bg-white p-0 w-4/5 sm:w-auto text-gray-600 rounded"
      :class="`sm:max-w-${maxWidth}`"
      :open="open"
      @click.stop
    >
      <div
        class="w-full py-1 px-2 rounded-t flex items-center justify-start text-primary"
      >
        <slot class="mr-2 text-lg" name="icon" />
        <h5 class="text-xl">{{ title }}</h5>
        <button
          class="ml-auto mr-1 text-gray-500 hover:text-gray-300 transition-colors duration-100"
          aria-label="Close"
          @click="open = false"
        >
          <fa :icon="['fa', 'times']" />
        </button>
      </div>
      <div class="text-sm mt-2 px-3">
        <slot name="default" />
      </div>
      <div v-if="buttonText" class="mt-3 flex p-2">
        <BasicButton
          @click="open = false"
          class="ml-auto"
          color="red"
          textSize="sm"
          rounded="md"
        >
          cancel
        </BasicButton>
        <BasicButton
          v-if="buttonText"
          @click="$emit('submit')"
          class="ml-3"
          textSize="sm"
          rounded="md"
        >
          {{ buttonText }}
        </BasicButton>
      </div>
    </dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Dialog',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: false,
    },
    maxWidth: {
      type: String,
      default: 'lg',
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
</style>