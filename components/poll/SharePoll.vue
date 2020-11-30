<template>
  <div class="bg-white p-1 px-2 pb-2 rounded text-sm w-full">
    Share
    <ul class="text-xs link-list px-2">
      <li class="text-blue-600">
        <a
          target="_blank"
          :href="`https://www.facebook.com/sharer/sharer.php?u=${URL}`"
          class="outline-none flex items-center justify-between rounded-sm focus:shadow-outline"
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
          :href="`https://api.whatsapp.com/send?text=${question} - Vote now at: ${URL}`"
          class="outline-none flex items-center justify-between rounded-sm focus:shadow-outline"
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
          :href="`https://twitter.com/intent/tweet?url=${URL}`"
          class="outline-none flex items-center justify-between rounded-sm focus:shadow-outline"
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
          :href="`https://access.line.me/oauth2/v2.1/login?loginState=PqORalVGHiT5jReCaJkJyh&loginChannelId=1446101138&returnUri=%2Foauth2%2Fv2.1%2Fauthorize%2Fconsent%3Fscope%3Dopenid%2Bprofile%2Bfriends%2Bgroups%2Btimeline.post%2Bmessage.write%26response_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fsocial-plugins.line.me%252Flineit%252FloginCallback%253FreturnUrl%253Dhttps%25253A%25252F%25252Fsocial-plugins.line.me%25252Flineit%25252Fshare%25253Furl%25253Dhttp%2525253A%2525252F%2525252F${URL}%26state%3Df4284b46d7c4d572854c9b4a64a579%26client_id%3D1446101138#/`"
          class="outline-none flex items-center justify-between rounded-sm focus:shadow-outline"
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
          class="outline-none flex items-center justify-between rounded-sm focus:shadow-outline"
          content="Copied!"
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
          class="outline-none flex items-center justify-between rounded-sm focus:shadow-outline"
          @click="showQr = true"
        >
          <span class="w-8">
            <fa class="text-lg mr-2" :icon="['fa', 'qrcode']" />
          </span>
          <span>QR Code</span>
        </button>
      </li>
    </ul>
    <div
      class="bg-opacity-25 bg-black h-screen w-screen fixed top-0 left-0 z-50 flex items-center justify-center"
      :class="{ hidden: !showQr }"
      @click="showQr = false"
    >
      <div
        @click.stop
        class="bg-white rounded p-5 w-4/5 sm:w-auto flex flex-col items-center relative"
      >
        <button
          class="absolute top-0 right-0 mt-2 ml-1 text-gray-400 hover:text-gray-500 flex"
          aria-label="Close"
          @click="showQr = false"
        >
          <fa class="text-lg mr-2" :icon="['fa', 'times-circle']" />
        </button>
        <p class="text-lg">QR Code</p>
        <p class="mt-2">
          This can be printed and posted IRL (in real life).<br />
          If scanned they will be taken to this page.
        </p>
        <canvas class="mx-8" ref="qrCode"></canvas>
        <a href="#" ref="qrDownload">
          <BasicButton class="mt-3"> Download </BasicButton>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueTippy from 'vue-tippy/dist/vue-tippy.esm'
import qrcode from 'qrcode'
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
      showQr: false,
    }
  },
  mounted() {
    this.URL = document.URL
    // create qr dowloader
    const canvas = this.$refs.qrCode as any
    qrcode.toCanvas(canvas, this.URL, (error) => {
      if (error) {
        console.log(error)
      }
    })
    const link = this.$refs.qrDownload as any
    var dataURL = canvas.toDataURL('png')
    link.download = 'image.png'
    link.addEventListener('click', () => {
      link.href = dataURL
    })
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