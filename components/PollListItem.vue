<template>
  <NuxtLink :to="`/poll/${poll.id}`">
    <article
      class="article bg-white p-2 rounded shadow transition-all duration-300 transform hover:-translate-y-2 hover:shadow-md"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-lg">{{ poll.title || poll.question }}</h2>
        <p v-if="poll.title" class="text-right text-sm">{{ poll.question }}</p>
      </div>
      <div class="flex items-center justify-between mt-2">
        <div class="text-sm text-gray-500 self-end">
          Created {{ dayjs(poll.created).from(dayjs()) }}
        </div>
        <CountDown
          class="max-w-xs w-20 sm:w-1/5 text-right text-sm"
          compact
          :endDate="poll.end_date || ''"
        />
      </div>
    </article>
  </NuxtLink>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
interface ListItemData {
  id: string
  title: string
  question: string
  end_date: string
  created: string
}
export default Vue.extend({
  name: 'PollListItem',
  data() {
    return {
      dayjs,
    }
  },
  props: {
    poll: {
      type: Object,
      required: true,
    } as PropOptions<ListItemData>,
  },
})
</script>

<style lang="scss" scoped>
</style>