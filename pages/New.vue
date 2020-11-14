<template>
  <form class="w-full mt-3" @submit.prevent="submit">
    <div>
      <!-- <TextInput
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
      <Answers v-model="answers" /> -->
      <!-- <RadioGroup
        v-model="voteValidation"
        groupName="VoteValidation"
        :choices="voteValidationChoices"
      /> -->
      <SwitchCard name="End Date" v-model="card" />
    </div>
    <!-- <button>submit</button> -->
  </form>
</template>

<script lang="ts">
import RadioGroup from '~/components/form/RadioGroup.vue'
export default {
  components: { RadioGroup },
  data() {
    return {
      input: '',
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