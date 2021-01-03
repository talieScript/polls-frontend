<template>
  <div class="">
    <div>
      <h1 class="text-2xl mt-5 font-bold">Polls List</h1>
      <p>These are all the polls that are shared publically</p>
    </div>
    <div class="flex mt-8">
      <div class="flex items-center">
        <Select v-model="order" :options="orderOptions" class="mr-2" />
        <div class="flex flex-col items-center justify-center">
          <label for="endedCheck" class="text-xs">Ended</label>
          <ToggleButton
            v-model="showEnded"
            :disabled="cannotShowEnded"
            class="z-20"
          />
        </div>
      </div>
      <TextInput
        class="ml-auto w-1/3"
        v-model="searchTerm"
        label="Search"
        :rules="[]"
      />
    </div>
    <ul class="mt-2">
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
  scrollToTop: true,
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
      searchTerm: '',
      cannotShowEnded: false,
    }
  },
  async fetch() {
    const listRes = await fetch(
      `${process.env.VUE_APP_POLLS_API}/polls/list?page=${this.pages}&order=${this.order}&searchTerm=${this.searchTerm}&ended=${this.showEnded}`
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
    async order(value) {
      if (value === 'end_date') {
        this.showEnded = false
        this.cannotShowEnded = true
      } else {
        this.cannotShowEnded = false
      }
      this.loading = true
      this.reload()
    },
    filteredPolls(value) {
      if (value.length < 10) {
        this.loadNextPage()
      }
    },
    searchTerm() {
      this.reload()
    },
    showEnded() {
      this.reload()
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
      console.log('here')
      this.loading = true
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