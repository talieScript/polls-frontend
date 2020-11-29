<template>
  <div>
    <div class="w-full" v-if="error">
      <div
        class="h-screen flex w-full items-center justify-center text-center text-lg flex-col"
      >
        Poll not found 😬
        <nuxt-link class="block" to="/">
          <fa
            class="transform rotate-180"
            :icon="['fa', 'long-arrow-alt-right']"
          />
          <span class="underline"> back </span>
        </nuxt-link>
      </div>
    </div>
    <div class="sm:pt-10" v-else-if="poll">
      <h1 class="text-2xl">{{ poll.question }}</h1>
      <div class="text-sm">Created {{ dayjs(poll.created).from(dayjs()) }}</div>
      <div class="flex flex-col sm:flex-row sm:flex-wrap justify-between">
        <AnswerSelect
          v-model="chosen"
          class="sm:w-3/4 order-1"
          :answerNumber="pollConfig.choiceNo"
          :exact="pollConfig.choiceNoStrict"
          :answers="poll.Answer"
        />
        <div
          class="sm:order-2 sm:w-32 w- flex flex-row-reverse sm:flex-col justify-between sm:justify-start w-full mt-4 mb-4 sm:mb-0 items-center sm:items-baseline h-full"
        >
          <CountDown
            class="max-w-xs w-2/5 sm:w-full"
            :endDate="poll.end_date"
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { PollOptions } from '@/utils/types'

dayjs.extend(relativeTime)

export default Vue.extend({
  async asyncData({ params, $axios }) {
    const id = params.id
    return await $axios
      .get(`${process.env.VUE_APP_POLLS_API}/polls/${id}`)
      .then((response) => ({
        error: false,
        poll: response.data,
      }))
      .catch((error) => ({
        error,
        poll: null,
      }))
  },
  data(): any {
    return {
      dayjs,
      chosen: [] as string[],
    }
  },
  computed: {
    pollConfig(): PollOptions {
      return JSON.parse(JSON.parse(this.poll.options))
    },
    totalVotes(): number {
      return this.poll.Answer.map((a) => a.votes).reduce(
        (total, votes) => total + votes
      )
    },
  },
})
</script>

<style scoped>
</style>