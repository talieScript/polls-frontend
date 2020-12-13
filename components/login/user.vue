<template>
  <div>
    <button
      v-if="!user"
      class="outline-none focus:shadow-outline rounded"
      @click="openLoginModel = true"
    >
      login | signup
    </button>
    <button
      v-else
      class="outline-none focus:shadow-outline rounded flex flex-col justify-center items-center"
    >
      <img
        class="h-8 w-8 rounded-full"
        :src="user.picture"
        :alt="`Profile picture for ${user.given_name}`"
      />
      <span>{{ user.given_name }}</span>
    </button>
    <LoginModal v-model="openLoginModel" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import login from '~/pages/login.vue'

export default Vue.extend({
  name: 'User',
  data() {
    return {
      openLoginModel: true,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
})
</script>

<style scoped>
</style>