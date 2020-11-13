<template>
  <div class="container relative bg-white p-2">
      <div class="flex justify-between align-middle">
        <p>{{ name }}</p>
        <ToggleButton v-model="active" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {
      active: false,
    }
  },
})
</script>


<style lang="scss" scoped>
.container {
  // min-width: 8rem;
  @apply rounded;
  min-height: 5rem;
}
</style>