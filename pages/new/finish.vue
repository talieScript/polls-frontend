<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    poll() {
      return this.$store.state.newPoll.active
    },
  },
})
</script>

<style scoped>
</style>