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
          class="shadow-sm"
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
      <Answers v-model="pollData.answers" ref="answers" />
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
      <div class="mt-16">
        <div class="flex items-center">
          <input id="account" type="checkbox" class="h-4 w-4" />
          <label for="account" class="ml-2"
            >Create a
            <button
              @click.prevent
              class="font-semibold text-primary hover:underline cursor-pointer outline-none"
            >
              Free Account
            </button>
            on the next page</label
          >
        </div>
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
      <button
        class="absolute right-0 px-5 py-2 bg-secondary rounded hover:bg-green-400 hover:text-white transition-colors duration-150 text-lg outline-none"
      >
        Next <fa class="ml-1" :icon="['fa', 'long-arrow-alt-right']" />
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
export default {
  data(): any {
    return {
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
        answerError: false,
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
      return this.$store.state.poll.activePoll
    },
  } as any,
  watch: {
    answers(answers: any[]): void {
      ;(this as any).answerError = !answers.length
    },
    endDate(val) {
      console.log(val)
    },
  },
  created() {
    this.pollData = this.activePoll
    ;(this as any).pollData.endDate = dayjs().add(1, 'week').toISOString()
  },
  methods: {
    submit(): void | null {
      const {
        title,
        question,
        answers,
        voteValidation,
        pollVisibility,
        terms,
      } = this as any
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
      if (!terms) {
        this.termsError = true
      }
      if (!answers.length || !question) {
        return
      }
    },
  } as any,
}
</script>

<style lang="scss" scoped>
</style>