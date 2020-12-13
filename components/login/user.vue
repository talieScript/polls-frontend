<template>
  <div>
    <transition name="fade">
      <button
        v-if="!user"
        class="outline-none focus:shadow-outline rounded"
        @click="$emit('openModal')"
      >
        login | signup
      </button>
      <button
        v-else
        class="outline-none focus:shadow-outline rounded flex sm:flex-col justify-center items-center ml-1"
        @click="logout"
      >
        <img
          class="h-8 w-8 rounded-full mr-3 sm:mr-0"
          :src="user.picture"
          :alt="`Profile picture for ${user.given_name}`"
        />
        <span>{{ user.given_name }}</span>
      </button>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import login from '~/pages/login.vue'

export default Vue.extend({
  name: 'User',
  data() {
    return {
      openLoginModel: false,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>