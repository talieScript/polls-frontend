<template>
  <div class="w-full relative">
    <h1 class="font-semibold text-2xl text-gray-700 mb-8 mt-3">New Poll</h1>
    <form class="w-full mt-3 px-2" @submit.prevent="submit">
      <div>
        <TextInput
          v-model="pollData.title"
          label="Title"
          bgColor="white"
          outline
          :rules="[
            (input) => {
              return input ? '' : 'Required'
            },
          ]"
          :error.sync="errors['title']"
          class="shadow-sm mb-8"
        />
        <TextArea
          v-model="pollData.question"
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
          ref="question"
        />
      </div>
      <hr class="my-8" />
      <Answers
        @updated="checkAnswers"
        v-model="pollData.answers"
        ref="answers"
      />
      <p v-if="answerError" class="text-red font-light text-sm">
        Must have at least 1 answer
      </p>
      <hr class="my-8" />
      <h2 class="text-lg">Vote Validation</h2>
      <RadioGroup
        v-model="pollData.voteValidation"
        groupName="voteValidation"
        :choices="voteValidationChoices"
        class="mt-8"
      />
      <hr class="my-8" />
      <h2 class="text-lg">Results Visibility</h2>
      <RadioGroup
        v-model="pollData.results"
        groupName="results"
        :choices="resultsOptions"
        class="mt-8"
      />
      <hr class="my-8" />
      <h2 class="text-lg">Poll Visibility</h2>
      <RadioGroup
        v-model="pollData.pollVisibility"
        groupName="visibility"
        :choices="visibilityOptions"
        class="mt-8"
      />
      <hr class="my-8" />
      <h2 class="text-lg">Additional Options</h2>
      <div class="card-container mt-8 flex flex-col sm:flex-row items-center">
        <SwitchCard
          name="End Date"
          v-model="pollData.options.endDate"
          class="sm:mr-3"
        >
          <DateTimePicker
            v-model="pollData.endDate"
            :disabled="!pollData.options.endDate"
          />
        </SwitchCard>
        <SwitchCard
          name="Multiple Choice"
          v-model="pollData.options.multipleChoice"
          class="mt-3 sm:mt-0"
        >
          <div class="flex items-center justify-between">
            <Select
              v-model="pollData.multipleChoice.option"
              :options="choiceOptions"
              :disabled="!pollData.options.multipleChoice"
            />
            <NumberInput
              v-model="pollData.multipleChoice.number"
              :max="pollData.answers.length - 1"
              :disabled="!pollData.options.multipleChoice"
            />
          </div>
        </SwitchCard>
      </div>
      <div class="mt-12">
        <div class="flex items-center mt-2">
          <input v-model="terms" id="terms" type="checkbox" class="h-4 w-4" />
          <label for="terms" class="ml-2"
            >I agree to the
            <button
              @click.prevent
              class="font-semibold text-primary hover:underline cursor-pointer outline-none"
            >
              Terms and conditions
            </button>
          </label>
        </div>
        <p v-if="termsError" class="text-red font-light text-sm">
          Please accept terms and conditions to continue
        </p>
      </div>
      <BasicButton>
        Next <fa class="ml-1" :icon="['fa', 'long-arrow-alt-right']" />
      </BasicButton>
    </form>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
export default {
  data(): any {
    return {
      answerError: false,
      errors: {
        title: '',
        question: '',
      },
      voteValidation: '',
      voteValidationChoices: [
        {
          text: 'Validate By Email',
          value: 'validateEmail',
        },
        {
          text: 'Verify by IP Address',
          value: 'validateIp',
        },
        {
          text: 'Verify by IP Address & Email',
          value: 'validateBoth',
        },
      ],
      resultsOptions: [
        {
          text: 'Can Always Be viewed',
          value: 'alwaysShow',
        },
        {
          text: 'Only After Voting',
          value: 'afterVote',
        },
        {
          text: 'After Poll Has Ended',
          value: 'pollEnd',
        },
      ],
      visibilityOptions: [
        {
          text: 'public',
          value: 'public',
        },
        {
          text: 'Private',
          value: 'private',
        },
      ],
      choiceOptions: [
        {
          text: 'exact number',
          value: 'exact',
        },
        {
          text: 'up too',
          value: 'upToo',
        },
      ],
      account: false,
      terms: false,
      termsError: false,
      pollData: {
        title: '',
        question: '',
        answers: [],
        results: '',
        pollVisibility: '',
        options: {},
        endDate: '',
        multipleChoice: {},
      },
    }
  },
  computed: {
    activePoll(): object {
      return this.$store.state.newPoll.active
    },
  } as any,
  created() {
    const self = this as any
    if (!this.activePoll.endDate) {
      self.$store.commit('newPoll/updatePoll', {
        ...this.activePoll,
        endDate: dayjs().add(1, 'week').toISOString(),
      })
    }
    self.pollData = {
      ...self.activePoll,
      answers: [...self.activePoll.answers],
      options: { ...self.activePoll.options },
      multipleChoice: { ...self.activePoll.multipleChoice },
    }
  },
  methods: {
    checkAnswers() {
      ;(this as any).answerError = !this.pollData.answers.length
    },
    submit(): void | null {
      const { question, answers } = this.pollData
      if (!question) {
        this.errors.question = 'Required'
        this.$refs.question.$el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
      if (!answers.length) {
        this.answerError = true
        this.$refs.answers.$el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
      if (!this.terms) {
        this.termsError = true
      }
      if (!answers.length || !question || !this.terms) {
        return
      }

      this.$store.commit('newPoll/updatePoll', this.pollData)
      this.$router.push('/new/finish')
    },
  } as any,
}
</script>

<style lang="scss" scoped>
</style>