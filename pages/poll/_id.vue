<template>
  <div>{{ this.id }}</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ params }) {
    const id = params.id
    return {
      id,
    }
  },
  data() {
    return {
      poll: {},
    }
  },
})
</script>

<style scoped>
</style>