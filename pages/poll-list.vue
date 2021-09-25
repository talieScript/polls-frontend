<template>
  <div class="">
    <div>
      <h1 class="text-2xl mt-5 font-bold">Polls List</h1>
      <p>These are all the polls that have been shared publically</p>
    </div>
    <div class="flex mt-8">
      <div class="flex items-center">
        <Select v-model="order" :options="orderOptions" class="mr-2" />
        <div
          v-if="order !== 'end_date'"
          class="flex flex-col items-center justify-center"
        >
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
    <!-- Might want to make this a recycle scroller when whe get lots of polls :D -->
    <transition-group name="list" mode="in-out" class="mt-2 relative" tag="ul">
      <li v-for="poll in list" :key="poll.id" class="list-item w-full">
        <PollListItem :poll="poll" />
      </li>
    </transition-group>
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
    <CornerLoadingSpinner v-model="loading" />
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
    console.log({
      env: process.env,
    })
    const listRes = await fetch(
      `${process.env.vueAppPollsApi}/polls/list?page=${this.pages}&order=${this.order}&searchTerm=${this.searchTerm}&ended=${this.showEnded}`
    ).then((res) => res.json())
    this.loading = false
    if (listRes.length < 10) {
      this.loadedAllPolls = true
    } else {
      this.loadedAllPolls = false
    }
    this.list = listRes
  },
  created() {
    this.reload = debounce(this.reload, 300)
    this.search = debounce(this.search, 500)
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
    searchTerm() {
      this.search()
    },
    showEnded() {
      this.search()
    },
  },
  methods: {
    async loadNextPage() {
      this.pages += 1
      this.moreLoading = true
      const nextPageData = await this.$axios.get(
        `${process.env.vueAppPollsApi}/polls/list?page=${this.pages}&order=${this.order}&searchTerm=${this.searchTerm}&ended=${this.showEnded}`
      )
      this.list.push(...nextPageData.data)
      if (nextPageData.data.length < 10) {
        this.loadedAllPolls = true
      }
      this.moreLoading = false
    },
    reload() {
      this.loading = true
      this.pages = 1
      this.list = []
      // This will give the animation time to happen
      setTimeout(() => {
        this.$fetch()
      }, 300)
    },
    async search() {
      this.loading = true
      this.pages = 1
      const searchRes = await this.$axios.get(
        `${process.env.vueAppPollsApi}/polls/list?page=${this.pages}&order=${this.order}&searchTerm=${this.searchTerm}&ended=${this.showEnded}`
      )
      if (searchRes.data.length < 10) {
        this.loadedAllPolls = true
      } else {
        this.loadedAllPolls = false
      }
      this.list = searchRes.data
      this.loading = false
    },
  },
})
</script>

<style lang="scss" scoped>
.list-item:not(:first-of-type) {
  @apply mt-6 #{!important};
}

.list-move {
  transition: transform 0.5s;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-leave-active {
  position: absolute;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-2rem);
}
</style>