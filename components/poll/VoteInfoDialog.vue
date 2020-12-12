<template>
  <Dialog v-model="open" :title="title" buttonText="accept" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VoteInfoDialog',
  data(): any {
    return {}
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    voteStatus: {
      type: String,
      required: true,
    },
  },
  computed: {
    title(): string {
      return this.voteStatus
    },
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