<template>
  <div
    class="ralative"
    v-click-outside="
      () => {
        openDropdown = false
      }
    "
  >
    <NuxtLink
      v-if="!user"
      to="/login"
      class="outline-none focus:shadow-outline rounded"
      @click="$emit('openModal')"
    >
      login | signup
    </NuxtLink>
    <button
      v-else
      class="outline-none focus:shadow-outline rounded flex justify-center items-center ml-1"
      to="/dashboard"
      @click="openDropdown = true"
    >
      <div class="flex justify-center items-center">
        <img
          class="h-10 w-10 rounded-full mr-3 sm:mr-0"
          :src="user.picture"
          :alt="`Profile picture for ${user.given_name}`"
        />
        <fa :icon="['fa', 'angle-down']" class="mx-1 text-2xl" />
      </div>
    </button>
    <transition name="fade">
      <div
        v-if="openDropdown && user"
        class="w-64 bg-white absolute right-0 mt-5 rounded p-4"
      >
        <h5>{{ user.name }}</h5>
        <h6 class="border-b pb-4 mb-4 border-gray-300 text-sm text-gray-400">
          {{ user.email }}
        </h6>
        <div class="flex flex-col items-start">
          <NuxtLink to="/dashboard" class="hover:text-primary">
            <button @click="openDropdown = false">My Dashboard</button>
          </NuxtLink>
          <button @click="$auth.logout()" class="mt-2 hover:text-red">
            Logout
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import login from '~/pages/login.vue'
import ClickOutside from 'vue-click-outside'

export default Vue.extend({
  name: 'User',
  data() {
    return {
      openDropdown: false,
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
  directives: {
    ClickOutside,
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-3rem);
}
</style>