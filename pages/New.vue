<template>
  <div class="w-full relative">
    <h1 class="font-semibold text-2xl text-gray-700 mb-8 mt-3">New Poll</h1>
    <form class="w-full mt-3 px-2" @submit.prevent="submit">
      <div>
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
          ref="question"
        />
      </div>
      <hr class="my-8" />
      <Answers v-model="answers" ref="answers" />
      <p v-if="answerError" class="text-red font-light text-sm">
        Must have at least 1 answer
      </p>
      <hr class="my-8" />
      <h3 class="text-lg">Vote Validation</h3>
      <RadioGroup
        v-model="voteValidation"
        groupName="voteValidation"
        :choices="voteValidationChoices"
        class="mt-8"
      />
      <hr class="my-8" />
      <h3 class="text-lg">Visibility</h3>
      <RadioGroup
        v-model="pollVisibility"
        groupName="visibility"
        :choices="visibilityOptions"
        class="mt-8"
      />
      <hr class="my-8" />
      <h3 class="text-lg">Additional Options</h3>
      <div class="card-container mt-8 flex flex-col sm:flex-row items-center">
        <SwitchCard name="End Date" v-model="options.endDate" class="sm:mr-3">
          <DateTimePicker v-model="endDate" :disabled="!options.endDate" />
        </SwitchCard>
        <SwitchCard
          name="Multiple Choice"
          v-model="options.hideResults"
          class="mt-3 sm:mt-0"
        >
          <Select v-model="multipleChoice" :options="choiceOptions" />
        </SwitchCard>
      </div>
      <div class="mt-16">
        <div class="flex items-center">
          <input id="account" type="checkbox" class="h-4 w-4" />
          <label for="account" class="ml-2"
            >Create a
            <button
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
        Create <fa class="ml-1" :icon="['fa', 'long-arrow-alt-right']" />
      </button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  data(): any {
    return {
      title: '',
      question: '',
      errors: {
        title: '',
        question: '',
      },
      answers: [],
      answerError: false,
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
      options: {
        endDate: true,
        hideResults: false,
      },
      account: false,
      terms: false,
      termsError: false,
      endDate: new Date().toISOString(),
      multipleChoice: 'upToo',
      choiceOptions: [
        {
          text: 'Exact Number',
          value: 'exact',
        },
        {
          text: 'Up Too',
          value: 'upToo',
        },
      ],
    } as any
  },
  watch: {
    answers(answers: any[]): void {
      ;(this as any).answerError = !answers.length
    },
    endDate(val) {
      console.log(val)
    },
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
      // validation
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