<template>
  <div>
    <Dialog v-model="open" title="Login" maxWidth="sm"> here </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Dialog from '../Dialog.vue'

export default Vue.extend({
  name: 'LoginModal',
  props: {
    value: {
      type: Boolean,
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
</style>