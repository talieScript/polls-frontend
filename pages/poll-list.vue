<template>
  <div class="">
    <div class="flex justify-between items-end">
      <div class="">
        <h1 class="text-2xl mt-5 font-bold">Polls List</h1>
        <p>These are all the polls that are shared publically</p>
      </div>
      <div class="">
        <Select v-model="order" :options="orderOptions" class="" />
        <div class="flex items-center justify-end">
          <ToggleButton v-model="showEnded" :disabled="loading" class="z-20" />
          <label for="endedCheck" class="ml-2">Ended</label>
        </div>
      </div>
    </div>
    <ul class="mt-6">
      <li v-if="loading" class="text-center mt-12">
        <LoadingSpinner size="8" />
      </li>
      <li v-else v-for="poll in filteredPolls" :key="poll.id" class="list-item">
        <PollListItem :poll="poll" />
      </li>
    </ul>
    <BasicButton
      v-if="!loadedAllPolls && !loading"
      @click="loadNextPage"
      ariaLabel="load more"
      rounded="md"
      class="mx-auto mt-2"
    >
      <fa v-if="!moreLoading" :icon="['fa', 'arrow-down']" />
      <LoadingSpinner v-else />
      Load More
    </BasicButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from '@/utils/helpers'
import dayjs from 'dayjs'

export default Vue.extend({
  loading: true,
  data(): any {
    return {
      list: [],
      pages: 1,
      loadedAllPolls: false,
      order: 'created',
      loading: true,
      orderOptions: [
        {
          text: 'Newest',
          value: 'created',
        },
        {
          text: 'Ending Soon',
          value: 'end_date',
        },
      ],
      moreLoading: false,
      showEnded: false,
    }
  },
  async fetch() {
    const listRes = await fetch(
      `${process.env.VUE_APP_POLLS_API}/polls/list?page=${this.pages}&order=${this.order}`
    ).then((res) => res.json())
    this.loading = false
    if (listRes.length < 10) {
      this.loadedAllPolls = true
    } else {
      this.loadedAllPolls = false
    }
    this.list.push(...listRes)
  },
  created() {
    this.reload = debounce(this.reload, 300)
  },
  watch: {
    '$route.query': '$fetch',
    async order() {
      this.loading = true
      this.reload()
    },
    filteredPolls(value) {
      console.log(value)
      if (value.length < 10) {
        this.loadNextPage()
      }
    },
  },
  computed: {
    filteredPolls(): any[] {
      if (this.showEnded) {
        return this.list
      }
      return this.list.filter((poll) => {
        return dayjs(poll.end_date).isAfter(dayjs()) || !poll.end_date
      })
    },
  },
  methods: {
    async loadNextPage() {
      this.pages += 1
      this.moreLoading = true
      await this.$fetch()
      this.moreLoading = false
    },
    reload() {
      this.pages = 1
      this.list = []
      this.$fetch()
    },
  },
})
</script>

<style lang="scss" scoped>
.list-item:not(:first-of-type) {
  @apply mt-6 #{!important};
}
</style>