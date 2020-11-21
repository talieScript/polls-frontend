<template>
  <div>
    <button
      @click.prevent
      :content="text"
      tabindex="-1"
      v-tippy="{
        trigger: 'mouseenter focus',
        hideOnClick: false,
        arrowType: 'sharp',
        arrow: true,
        placement: 'top',
      }"
      class="focus:text-primary hover:text-primary transition-colors duration-200"
    >
      <slot name="deafult">
        <fa
          :icon="['fa', 'question-circle']"
          class="transition-colors duration-200"
        />
      </slot>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueTippy from 'vue-tippy/dist/vue-tippy.esm'
Vue.use(VueTippy)
export default Vue.extend({
  name: 'InfoToolTip',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
</style>