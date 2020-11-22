<template>
  <div>
    {{ id }}

    <div v-if="res.name === 'Error'">404</div>
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