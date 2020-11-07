<template>
  <form @submit.prevent="submit">
    <div>
      <Answers v-model="answers" />
    </div>
    <!-- <button>submit</button> -->
  </form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      input: '',
      errors: {},
      answers: [],
    }
  },
  methods: {
    submit(poll: object) {
      console.log(poll)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>