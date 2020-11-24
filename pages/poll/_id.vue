<template>
  <div>
    <div class="w-full" v-if="poll.name === 'Error'">
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
    <div class="pt-10" v-else-if="poll">
      <h1 class="text-2xl">{{ poll.question }}</h1>
      <div class="text-sm">Created {{ dayjs(poll.created).from(dayjs()) }}</div>
      <AnswerSelect :answers="poll.answers" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default Vue.extend({
  async asyncData({ params, $axios }) {
    const id = params.id
    let poll = null
    await $axios
      .get(`${process.env.VUE_APP_POLLS_API}/polls/${id}`)
      .then((response) => {
        poll = response.data
      })
      .catch((error) => {
        poll = error
      })
    poll = {
      ...poll,
      answers: poll.Answer,
    }
    delete poll.Answer
    return {
      id,
      poll,
    }
  },
  data(): any {
    return {
      loading: false,
      dayjs,
    }
  },
  computed: {} as any,
})
</script>

<style scoped>
</style>