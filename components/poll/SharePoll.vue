<template>
  <div class="bg-white p-1 px-2 pb-2 rounded text-sm w-full">
    Share
    <ul class="text-xs link-list px-2">
      <li class="text-blue-600">
        <a
          target="_blank"
          :href="`https://www.facebook.com/sharer/sharer.php?u=${URL}`"
          class="outline-none rounded-sm focus:shadow-outline"
        >
          <fa class="mr-3 text-sm" :icon="['fab', 'facebook']" />
          <span>Facebook</span>
        </a>
      </li>
      <li class="text-green-500">
        <a
          target="_blank"
          :href="`https://api.whatsapp.com/send?text=${question} - Vote now at: ${URL}`"
          class="outline-none rounded-sm focus:shadow-outline"
        >
          <fa class="mr-3 text-sm" :icon="['fab', 'whatsapp']" />
          <span>Whatsapp</span>
        </a>
      </li>
      <li class="text-blue-400">
        <a
          target="_blank"
          :href="`https://twitter.com/intent/tweet?url=${URL}`"
          class="outline-none rounded-sm focus:shadow-outline"
        >
          <fa class="mr-3 text-sm" :icon="['fab', 'twitter']" />
          <span>Twitter</span>
        </a>
      </li>
      <li class="text-green-300">
        <a
          target="_blank"
          :href="`https://access.line.me/oauth2/v2.1/login?loginState=PqORalVGHiT5jReCaJkJyh&loginChannelId=1446101138&returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fscope%3Dopenid%2Bprofile%2Bfriends%2Bgroups%2Btimeline.post%2Bmessage.write%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fsocial-plugins.line.me%252Flineit%252FloginCallback%253FreturnUrl%253Dhttps%25253A%25252F%25252Fsocial-plugins.line.me%25252Flineit%25252Fshare%25253Furl%25253Dhttp%2525253A%2525252F%2525252F${URL}%26state%3Df4284b46d7c4d572854c9b4a64a579%26client_id%3D1446101138#/`"
          class="outline-none rounded-sm focus:shadow-outline"
        >
          <fa class="mr-3 text-sm" :icon="['fab', 'line']" />
          <span>Line</span>
        </a>
      </li>
      <li class="">
        <button
          @click="copyLink"
          class="outline-none rounded-sm focus:shadow-outline"
          content="Copied!"
          v-tippy="{
            trigger: 'click',
            arrowType: 'sharp',
            arrow: true,
            placement: 'top',
          }"
        >
          <fa class="mr-3 text-sm" :icon="['fa', 'link']" />
          <span>Copy Link</span>
        </button>
      </li>
      <li class="text-primary">
        <button class="outline-none rounded-sm focus:shadow-outline">
          <fa class="mr-3 text-sm" :icon="['fa', 'qrcode']" />
          <span>QR Code</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueTippy from 'vue-tippy/dist/vue-tippy.esm'
Vue.use(VueTippy)

export default Vue.extend({
  name: 'SharePoll',
  props: {
    pollId: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      URL: '',
    }
  },
  mounted() {
    this.URL = document.URL
  },
  methods: {
    copyLink(): void {
      const URL = this.$refs.linkCopy
      const el = document.createElement('textarea')
      el.value = this.URL
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
      }
      this.showCopied()
    },
    showCopied() {},
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