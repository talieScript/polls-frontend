<template>
  <Dialog v-model="open" title="">
    <div class="p-3">
      <h4 class="text-primary text-lg mb-3 -mt-8">
        Posible reasons why we have counted your vote
      </h4>
      <p>
        If the poll has validate by ip then someone has already voted on your
        network.
      </p>
      <br />
      <p>
        If the poll has validate by email then we have already counted a vote
        with this email you are signed in with.
      </p>
    </div>
  </Dialog>
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