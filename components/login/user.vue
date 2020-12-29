<template>
  <client-only>
    <div
      class="ralative"
      v-click-outside="closeDropdown"
      @click="$emit('click')"
    >
      <NuxtLink v-if="!user" to="/login">
        <button
          @click="setUrl"
          class="outline-none focus:shadow-outline rounded p-1"
        >
          Login/Sign Up
        </button>
      </NuxtLink>
      <div v-else>
        <div class="hidden sm:block">
          <button
            class="outline-none focus:shadow-outline rounded flex justify-center items-center ml-1 p-1"
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
        </div>
        <div class="sm:hidden flex-col flex items-start">
          <NuxtLink to="/dashboard" class="hover:text-primary">
            My Dashboard
          </NuxtLink>
          <button @click="$auth.logout()" class="mt-2 hover:text-red">
            Logout
          </button>
        </div>
      </div>
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
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import login from '~/pages/login.vue'
import ClickOutside from 'vue-click-outside'

export default Vue.extend({
  name: 'User',
  data(): any {
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
    logout(): void {
      this.$auth.logout()
    },
    closeDropdown(): void {
      ;(this as any).openDropdown = false
    },
    setUrl() {
      if (!localStorage.getItem('redirect')) {
        localStorage.setItem('redirect', this.$route.path)
      }
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