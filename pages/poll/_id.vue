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
      <div
        class="flex flex-col sm:flex-row-reverse sm:justify-between sm:items-basline"
      >
        <div
          class="order-2 sm:w-1/5 flex flex-row-reverse sm:flex-col justify-between sm:justify-start w-full mt-4 mb-4 sm:mb-0 items-center sm:items-baseline"
        >
          <CountDown :endDate="poll.end_date" />
          <div class="sm:ml-0 mb-3 sm:mt-3">
            <p class="text-xs">Total Votes</p>
            <span class="text-xl text-black">{{ totalVotes }}</span>
          </div>
        </div>
        <AnswerSelect
          v-model="chosen"
          class="sm:mr-2 sm:w-4/5 order-3"
          :answerNumber="pollConfig.choiceNo"
          :exact="pollConfig.choiceNoStrict"
          :answers="poll.Answer"
        />
        <div class="bg-white order-3">Share</div>
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
  mounted() {
    console.log(this.poll.end_date)
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