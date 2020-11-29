<template>
  <div class="bg-white p-1 pb-2 rounded text-sm w-full">
    Share
    <ul class="text-xs link-list px-2">
      <li class="text-blue-600">
        <button class="outline-none rounded-sm focus:shadow-outline">
          <fa class="mr-3" :icon="['fab', 'facebook']" /> <span>Facebook</span>
        </button>
      </li>
      <li class="text-green-500">
        <button class="outline-none rounded-sm focus:shadow-outline">
          <fa class="mr-3" :icon="['fab', 'whatsapp']" /> <span>Whatsapp</span>
        </button>
      </li>
      <li class="text-blue-400">
        <button class="outline-none rounded-sm focus:shadow-outline">
          <fa class="mr-3" :icon="['fab', 'twitter']" /> <span>Twitter</span>
        </button>
      </li>
      <li class="text-green-300">
        <button class="outline-none rounded-sm focus:shadow-outline">
          <fa class="mr-3" :icon="['fab', 'line']" /> <span>Line</span>
        </button>
      </li>
      <li class="text-blue-600">
        <button class="outline-none rounded-sm focus:shadow-outline">
          <fa class="mr-3" :icon="['fab', 'facebook-messenger']" />
          <span>Messenger</span>
        </button>
      </li>
      <li class="">
        <button class="outline-none rounded-sm focus:shadow-outline">
          <fa class="mr-3" :icon="['fa', 'link']" /> <span>Copy Link</span>
        </button>
      </li>
      <li class="text-primary">
        <button class="outline-none rounded-sm focus:shadow-outline">
          <fa class="mr-3" :icon="['fa', 'qrcode']" /> <span>QR Code</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SharePoll',
  props: {
    pollId: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.link-list {
  li {
    @apply flex items-center mt-1;
  }
}
</style>