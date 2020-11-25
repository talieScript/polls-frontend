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
    <div class="pt-10" v-else-if="poll">
      <h1 class="text-2xl">{{ poll.question }}</h1>
      <div class="text-sm">Created {{ dayjs(poll.created).from(dayjs()) }}</div>
      <AnswerSelect :answers="poll.Answer" />
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
      loading: false,
      dayjs,
    }
  },
  computed: {} as any,
})
</script>

<style scoped>
</style>