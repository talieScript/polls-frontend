<template>
  <div>
    <button
      @click.prevent
      :content="text"
      tabindex="-1"
      v-tippy="{
        trigger: 'focus',
        hideOnClick: false,
        arrowType: 'sharp',
        arrow: true,
        placement: 'top',
      }"
    >
      <fa
        :icon="['fa', 'question-circle']"
        class="hover:text-primary focus:text-primary transition-colors duration-200"
      />
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