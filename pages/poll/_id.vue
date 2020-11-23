<template>
  <div>
    <div class="w-full" v-if="res.name === 'Error'">
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
    <div v-else>found</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ params, $axios }) {
    const id = params.id
    let res = null
    await $axios
      .get(`${process.env.VUE_APP_POLLS_API}/polls/${id}`)
      .then((response) => {
        res = response.data
      })
      .catch((error) => {
        res = error
      })
    console.log(res)
    return {
      id,
      res,
    }
  },
  data(): any {
    return {
      loading: false,
    }
  },
})
</script>

<style scoped>
</style>