<template>
  <div class="bg-white p-1 px-2 pb-2 rounded text-sm w-full">
    Share
    <ul class="text-xs link-list px-2">
      <li class="text-blue-600">
        <a
          target="_blank"
          rel="noreferrer"
          :href="`https://www.facebook.com/sharer/sharer.php?u=${url}`"
          class="
            outline-none
            flex
            items-center
            justify-between
            rounded-sm
            focus:shadow-outline
          "
        >
          <span class="w-8">
            <fa class="mr-3 text-lg" :icon="['fab', 'facebook']" />
          </span>
          <span>Facebook</span>
        </a>
      </li>
      <li class="text-green-500">
        <a
          target="_blank"
          rel="noreferrer"
          :href="`https://api.whatsapp.com/send?text=${question} - ${url}`"
          class="
            outline-none
            flex
            items-center
            justify-between
            rounded-sm
            focus:shadow-outline
          "
        >
          <span class="w-8">
            <fa class="mr-3 text-lg" :icon="['fab', 'whatsapp']" />
          </span>
          <span>Whatsapp</span>
        </a>
      </li>
      <li class="text-blue-400">
        <a
          target="_blank"
          rel="noreferrer"
          :href="`https://twitter.com/intent/tweet?url=${url}`"
          class="
            outline-none
            flex
            items-center
            justify-between
            rounded-sm
            focus:shadow-outline
          "
        >
          <span class="w-8">
            <fa class="mr-3 text-lg" :icon="['fab', 'twitter']" />
          </span>
          <span>Twitter</span>
        </a>
      </li>
      <li class="text-green-300">
        <a
          target="_blank"
          rel="noreferrer"
          :href="`https://access.line.me/oauth2/v2.1/login?loginState=PqORalVGHiT5jReCaJkJyh&loginChannelId=1446101138&returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fscope%3Dopenid%2Bprofile%2Bfriends%2Bgroups%2Btimeline.post%2Bmessage.write%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fsocial-plugins.line.me%252Flineit%252FloginCallback%253FreturnUrl%253Dhttps%25253A%25252F%25252Fsocial-plugins.line.me%25252Flineit%25252Fshare%25253Furl%25253Dhttp%2525253A%2525252F%2525252F${url}%26state%3Df4284b46d7c4d572854c9b4a64a579%26client_id%3D1446101138#/`"
          class="
            outline-none
            flex
            items-center
            justify-between
            rounded-sm
            focus:shadow-outline
          "
        >
          <span class="w-8">
            <fa class="mr-3 text-lg" :icon="['fab', 'line']" />
          </span>
          <span>Line</span>
        </a>
      </li>
      <li class="">
        <button
          @click="copyLink"
          class="
            outline-none
            flex
            items-center
            justify-between
            rounded-sm
            focus:shadow-outline
          "
          content="Copied!"
          aria-label="Copy link to clipboard"
          v-tippy="{
            trigger: 'click',
            arrowType: 'sharp',
            arrow: true,
            placement: 'top',
          }"
        >
          <span class="w-8">
            <fa class="mr-3 text-lg" :icon="['fa', 'link']" />
          </span>
          <span>Copy Link</span>
        </button>
      </li>
      <li class="text-primary">
        <button
          class="
            outline-none
            flex
            items-center
            justify-between
            rounded-sm
            focus:shadow-outline
          "
          aria-label="show qr code"
          @click="showQr = true"
        >
          <span class="w-8">
            <fa class="text-lg mr-2" :icon="['fa', 'qrcode']" />
          </span>
          <span>QR Code</span>
        </button>
      </li>
    </ul>
    <QrDialog v-model="showQr" />
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
      url: '',
      showQr: false,
    }
  },
  created() {
    this.url = `${process.env.BROWSER_BASE_URL}${this.$nuxt.$route.fullPath}`
  },
  methods: {
    copyLink(): void {
      const el = document.createElement('textarea')
      el.value = (this as any).url
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
    },
  },
})
</script>

<style lang="scss" scoped>
.link-list {
  li {
    @apply flex items-center justify-between mt-1;
  }
}
</style>