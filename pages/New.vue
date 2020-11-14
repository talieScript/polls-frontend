<template>
  <div class="w-full">
    <h1 class="font-semibold text-2xl text-gray-700 mb-8 mt-3">New Poll</h1>
    <form class="w-full mt-3 px-2" @submit.prevent="submit">
      <div>
        <h3 class="text-lg">Details</h3>
        <TextInput
          v-model="title"
          label="Title"
          bgColor="white"
          outline
          :rules="[
            (input) => {
              return input ? '' : 'Required'
            },
          ]"
          :error.sync="errors['title']"
          class="shadow-sm"
        />
        <TextArea
          v-model="question"
          label="Question*"
          bgColor="white"
          outline
          :rules="[
            (input) => {
              return input ? '' : 'Required'
            },
          ]"
          :error.sync="errors['question']"
          class="shadow-sm rounded"
        />
      </div>
      <hr class="my-8" />
      <Answers v-model="answers" />
      <hr class="my-8" />
      <h3 class="text-lg">Vote Validation</h3>
      <RadioGroup
        v-model="voteValidation"
        groupName="voteValidation"
        :choices="voteValidationChoices"
        class="mt-8"
      />
      <hr class="my-8" />
      <h3 class="text-lg">Vote Validation</h3>
      <RadioGroup
        v-model="pollVisibility"
        groupName="visibility"
        :choices="visibilityOptions"
        class="mt-8"
      />
      <!-- <SwitchCard name="End Date" v-model="card" /> -->
      <!-- <button>submit</button> -->
    </form>
  </div>
</template>

<script lang="ts">
import RadioGroup from '~/components/form/RadioGroup.vue'
export default {
  components: { RadioGroup },
  data() {
    return {
      title: '',
      question: '',
      errors: {},
      answers: [],
      voteValidation: 'validateEmail',
      voteValidationChoices: [
        {
          text: 'Validate By Email',
          value: 'validateEmail',
        },
        {
          text: 'Varify by IP Address',
          value: 'validateIp',
        },
        {
          text: 'Varify by IP Address & Email',
          value: 'validateBoth',
        },
      ],
      pollVisibility: 'public',
      visibilityOptions: [
        {
          text: 'Public',
          value: 'public',
        },
        {
          text: 'Private',
          value: 'private',
        },
      ],
      card: false,
    }
  },
  watch: {
    card(alie) {
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