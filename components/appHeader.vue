<template>
  <header class="bg-white flex-auto flex flex-row p-3 items-center justify-center shadow-xs">
    <a href="/" class="w-30 w-xp font-bold text-xl justify-self-start mr-auto text-black">
      <h1>Poll <span class="text-primary">Simply</span></h1>
    </a>
    <nav class="font-semibold justify-self-center">
      <a class="mr-3 hover:text-gray-500 transition-colors duration-200" href="/poll-list">Poll List</a>
      <a href="/new" class=" text-green-400 hover:text-green-300 transition-colors duration-200">Create New</a>
    </nav>
    <div class="justify-end ml-auto">
      <button class="mr-2 hover:text-gray-500 transition-colors duration-200">
        Login
      </button>
      <button class="bg-blue-500 hover:bg-blue-400 rounded p-1 px-2 text-white transition-colors duration-200">
        Sign Up
      </button>
    </div>
  </header>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>

</style>