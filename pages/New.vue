<template>
  <form @submit.prevent="submit">
    <div>
      <TextInput
        v-model="input"
        label="Title"
        bgColor="secondary"
        required
        outline
        :rules="[
          (input) => {
            return input ? '' : 'Required'
          },
        ]"
        :error.sync="errors['title']"
      />
      <TextArea
        v-model="input"
        label="Question"
        bgColor="white"
        outline
        :rules="[
          (input) => {
            return input ? '' : 'Required'
          },
        ]"
        :error.sync="errors['question']"
      />
    </div>
    <button>submit</button>
  </form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      input: '',
      errors: {},
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