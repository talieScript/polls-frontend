<template>
  <div>
    <fa
      :icon="['fa', 'question-circle']"
      class="hover:text-primary focus:text-primary transition-colors duration-200"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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