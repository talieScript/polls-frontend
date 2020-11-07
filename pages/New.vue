<template>
  <form class="w-full" @submit.prevent="submit">
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
      <Answers v-model="answers" />
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
      answers: [],
    }
  },
  watch: {
    answers(alie) {
      console.log(alie)
    },
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