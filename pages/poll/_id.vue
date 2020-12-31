<template>
  <div class="pb-20">
    <div class="w-full" v-if="!Object.keys(poll).length">
      <div
        class="h-screen flex w-full items-center justify-center text-center text-lg flex-col"
      >
        Poll not found 😬
        <nuxt-link class="block" to="/">
          <!-- <fa
            class="transform rotate-180"
            :icon="['fa', 'long-arrow-alt-right']"
          /> -->
          <span class="underline"> Home </span>
        </nuxt-link>
      </div>
    </div>
    <div class="sm:pt-10" v-else-if="poll">
      <h1 class="text-2xl">{{ poll.question }}</h1>
      <div class="text-sm">Created {{ dayjs(poll.created).from(dayjs()) }}</div>
      <div class="flex flex-col sm:flex-row sm:flex-wrap justify-between">
        <div class="sm:w-3/4 order-1 flex items-end flex-col">
          <AnswerSelect
            v-model="chosen"
            class="w-full"
            :answerNumber="pollOptions.choiceNo"
            :exact="pollOptions.choiceNoStrict"
            :answers="poll.Answers"
            :disabled="hasVoted || ended || voteLoading"
          />
          <div class="hidden sm:inline-block">
            <SubmitButton
              v-if="!hasVoted && !ended"
              class="mt-2"
              :requiredAnswers="requiredAnswersNo"
              :selectedAnswersNo="chosen.length"
              :loading="voteLoading"
              :ended="ended"
              @click="handleSubmitClick"
            />
            <div
              v-else-if="submitRes.voteStatus === 'pendingEmail'"
              class="mt-2"
            >
              Your vote is pending email validation
              <button
                class="block ml-auto text-xs underline"
                @click="voteInfoDialogOpen = true"
              >
                Didnt recive an email?
              </button>
            </div>
            <div class="mt-2" v-else>
              Your vote has been counted! 👌
              <button
                class="block ml-auto text-xs underline"
                @click="voteInfoDialogOpen = true"
              >
                I haven't voted
              </button>
            </div>
          </div>
        </div>
        <div
          class="sm:order-2 sm:w-32 w- flex flex-row-reverse sm:flex-col justify-between sm:justify-start w-full mt-4 mb-4 sm:mb-0 items-center sm:items-baseline h-full"
        >
          <CountDown
            v-if="poll.end_date"
            class="max-w-xs w-2/5 sm:w-full"
            :endDate="poll.end_date || ''"
          />
          <div class="sm:ml-0 mb-3 sm:mt-3">
            <p class="text-xs">Total Votes</p>
            <span class="text-xl text-black">{{ totalVotes }}</span>
          </div>
          <SharePoll
            class="hidden sm:block"
            :poll-id="poll.id"
            :question="poll.question"
          />
        </div>
      </div>
      <div
        class="bg-gray-200 fixed w-screen sm:hidden bottom-0 left-0 pt-1 flex flex-col items-center"
      >
        <SmallShare class="mb-2" :poll-id="poll.id" :question="poll.question" />
        <SubmitButton
          v-if="!hasVoted && !ended"
          class="mx-auto my-2 w-4/5 border-none"
          :requiredAnswers="requiredAnswersNo"
          :selectedAnswersNo="chosen.length"
          :loading="voteLoading"
          :ended="ended"
          @click="handleSubmitClick"
        />
      </div>
      <ValidationDialog
        v-model="validationDialogOpen"
        :poll-options="pollOptions"
        :chosen="chosen"
        @close="validationDialogOpen = false"
        @confirm="sendVote($event)"
      />
      <VoteInfoDialog
        v-model="voteInfoDialogOpen"
        :voteStatus="submitRes.voteStatus"
      />
    </div>
    <ResponseSnack :response="submitRes" :userEmail="userEmail" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { PollOptions, VoteStatusRes } from '@/utils/types'
import { getVoterAnswers } from '@/utils/helpers'

dayjs.extend(relativeTime)

export default Vue.extend({
  loading: true,
  async asyncData({ params, $axios, store, $auth }) {
    const id = params.id
    let error
    await store.dispatch('getIP')
    const ip = store.state.userIp

    const pollAndAnswers = await $axios
      .get(
        `${process.env.VUE_APP_POLLS_API}/polls/${id}?ip=${ip}email=${$auth.user?.email}`
      )
      .then((response) => {
        error = false
        return response.data
      })
      .catch((error) => {
        error = true
        return null
      })

    if (!pollAndAnswers) {
      return {
        poll: {},
        userAnswers: [],
        error,
        hasVoted: false,
      }
    }

    let { userAnswers = [], poll } = pollAndAnswers

    const hasVoted = !!userAnswers.length

    if (process.browser) {
      // check if user answers are in the local storage as they may have just logged in
      const localStorageAnswers = localStorage.getItem('userAnswers')
      if (localStorageAnswers && !hasVoted) {
        userAnswers = localStorageAnswers.split(',')
      }
      localStorage.setItem('userAnswers', '')
    }

    return {
      poll: poll || pollAndAnswers,
      chosen: userAnswers,
      error,
      hasVoted,
    }
  },
  data(): any {
    return {
      dayjs,
      validationDialogOpen: false,
      voteInfoDialogOpen: false,
      voteLoading: false,
      submitRes: {
        voteStatus: 'alreadyVoted',
        voterId: '',
      } as VoteStatusRes,
      enteredEmail: '',
    }
  },
  computed: {
    ipAddress() {
      return this.$store.state.userIp
    },
    userEmail() {
      if (this.$auth.user) {
        return this.$auth.user.email
      }
      return ''
    },
    ended(): boolean {
      if (!this.poll.end_date) {
        return false
      }
      return dayjs(this.poll.end_date).isBefore(dayjs())
    },
    pollOptions(): PollOptions {
      return JSON.parse(this.poll.options)
    },
    totalVotes(): number {
      return this.poll.Answers.map((a) => a.votes).reduce(
        (total, votes) => total + votes
      )
    },
    requiredAnswersNo() {
      const { pollOptions } = this as any
      return pollOptions.choiceNoStrict ? pollOptions.choiceNo : 1
    },
  },
  async mounted() {
    console.log(this.pollOptions)
    if (
      (this.$auth.loggedIn || this.pollOptions.validateIp) &&
      !this.hasVoted
    ) {
      this.voteLoading = true
      const voterAnswers = await this.getVoterAnswers()
      if (voterAnswers.length) {
        this.chosen = voterAnswers
        this.hasVoted = true
      }
      this.voteLoading = false
    }
  },
  methods: {
    handleSubmitClick() {
      if (this.pollOptions.validateEmail) {
        if (this.$auth.user) {
          this.sendVote(this.$auth.user.email)
          return
        }
        this.validationDialogOpen = true
      } else {
        this.sendVote()
      }
    },
    async sendVote(email?) {
      this.enteredEmail = email
      this.voteLoading = true
      const { chosen } = this
      await this.$store.dispatch('getIP')
      const ipAddress = this.$store.state.userIp
      this.$axios
        .post(`${process.env.VUE_APP_POLLS_API}/polls/${this.poll.id}`, {
          answers: chosen,
          email: email || '',
          ipAddress,
        })
        .then((res) => {
          this.submitRes = res.data
          this.handleVoteRes()
        })
        .catch((error) => {
          // TODO: better error handeling
          console.log(error)
          this.voteLoading = false
        })
    },
    openAlert(alert) {
      this.activeAlert = alert
      this.alertOpen = true
    },
    async handleVoteRes() {
      const { submitRes } = this
      if (submitRes.voteStatus === 'alreadyVoted') {
        const voterAnswers = await this.getVoterAnswers()
        this.chosen = voterAnswers
        this.hasVoted = true
      } else if (submitRes.voteStatus === 'votePassed') {
        this.hasVoted = true
      }
      this.voteLoading = false
    },
    async getVoterAnswers() {
      await this.$store.dispatch('getIP')
      return await getVoterAnswers({
        userEmail: this.userEmail || this.enteredEmail,
        ipAdress: this.ipAddress,
        pollId: this.poll.id,
      })
    },
  },
})
</script>

<style scoped>
</style>