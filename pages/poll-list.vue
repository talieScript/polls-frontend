<template>
  <div class="">
    <h1 class="text-2xl mt-5">Polls List</h1>
    <p>These are all the polls that are shared Publicly</p>
    <ul class="mt-6">
      <li v-for="poll in list" :key="poll.id" class="list-item">
        <PollListItem :poll="poll" />
      </li>
    </ul>
    <BasicButton
      v-if="!loadedAllPolls"
      @click="loadNextPage"
      ariaLabel="load more"
      rounded="md"
      class="mx-auto mt-2"
    >
      <fa :icon="['fa', 'arrow-down']" /> Load More
    </BasicButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  loading: true,
  data(): any {
    return {
      list: [],
      pages: 1,
      loadedAllPolls: false,
    }
  },
  async fetch() {
    const listRes = await fetch(
      `${process.env.VUE_APP_POLLS_API}/polls/list?page=${this.pages}`
    ).then((res) => res.json())
    if (listRes.length < 10) {
      this.loadedAllPolls = true
    }
    this.list.push(...listRes)
  },
  watch: {
    '$route.query': '$fetch',
  },
  methods: {
    loadNextPage() {
      this.pages += 1
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