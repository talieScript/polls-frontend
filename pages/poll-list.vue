<template>
  <div class="">
    <h1 class="text-2xl mt-5">Polls List</h1>
    <p>These are all the polls that are shared Publicly</p>
    <ul class="mt-6">
      <li v-for="poll in list" :key="poll.id" class="list-item">
        <PollListItem :poll="poll" />
      </li>
    </ul>
    <BasicButton @click="() => $fetch()"> fetch </BasicButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  loading: true,
  data(): any {
    return {
      list: [],
    }
  },
  async fetch() {
    const listRes = await fetch(
      `${process.env.VUE_APP_POLLS_API}/polls/list`
    ).then((res) => res.json())
    this.list = listRes
  },
  watch: {
    '$route.query': '$fetch',
  },
})
</script>

<style lang="scss" scoped>
.list-item:not(:first-of-type) {
  @apply mt-6 #{!important};
}
</style>