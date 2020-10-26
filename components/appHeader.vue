<template>
  <nav
    class="flex items-center justify-between flex-wrap bg-teal p-3 sm:p-4 bg-white h-14 fixed w-full"
  >
    <a
      href="/"
      class="w-30 w-xp font-bold text-xl justify-self-start text-black mr-6"
    >
      <h1>Poll <span class="text-primary">Simply</span></h1>
    </a>

    <div class="block sm:hidden">
      <button
        @click="toggle"
        class="flex items-center px-3 py-2 border rounded text-teal-lighter"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>

    <!-- nav items -->
    <div
      :class="[
        'small-nav',
        { 'small-nav--open': open },
        'w-full',
        'flex-grow',
        'sm:flex',
        'sm:items-center',
        'sm:w-auto',
        'sm:opacity-100',
      ]"
    >
      <div class="sm:flex-grow">
        <a
          class="mr-3 hover:text-gray-500 transition-colors duration-200 block mt-4 sm:inline-block sm:mt-0"
          href="/poll-list"
        >
          Poll List
        </a>
        <a
          href="/new"
          class="text-green-400 hover:text-green-300 transition-colors duration-200 inline-block mt-2 sm:mt-0"
        >
          Create New
        </a>
      </div>
      <div
        class="border-t border-gray-300 sm:border-none mt-2 sm:mt-0 pt-2 sm:pt-0"
      >
        <button class="mr-2 hover:text-gray-500 transition-colors duration-200">
          Login
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-400 rounded p-1 px-2 text-white transition-colors duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      open: false,
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
  },
}
</script>

<style lang="scss" scoped>
.small-nav {
  height: 0;
  opacity: 0;
  transition-duration: 0.5s, 0.3s;
  transition-property: height, opacity;

  &--open {
    transform: translateY(0);
    opacity: 1;
    height: 120px;
  }
  // transform: translateY(-100px);
}
</style>