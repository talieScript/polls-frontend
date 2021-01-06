<template>
  <div
    class="bg-opacity-25 bg-black h-screen w-screen fixed top-0 left-0 z-50 flex items-center justify-center transition-opacity duration-200"
    :class="{ 'opacity-0 pointer-events-none': !show }"
    @click="show = false"
  >
    <dialog
      @click.stop
      class="dialog bg-white rounded p-5 w-4/5 sm:w-auto flex flex-col items-center relative scale-0 transition-transform duration-200"
      :class="{ show }"
    >
      <button
        class="absolute top-0 right-0 mt-2 ml-1 text-gray-400 hover:text-gray-500 flex"
        aria-label="Close"
        @click="show = false"
      >
        <fa class="text-lg mr-2" :icon="['fa', 'times']" />
      </button>
      <p class="text-lg">QR Code</p>
      <p class="mt-2">
        This can be printed and posted IRL (in real life).<br />
        If scanned they will be taken to this page.
      </p>
      <canvas class="mx-8" ref="qrCode"></canvas>
      <a href="#" ref="qrDownload">
        <BasicButton @click="show = false" class="mt-3"> Download </BasicButton>
      </a>
    </dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import qrcode from 'qrcode'

export default Vue.extend({
  name: 'qrDialog',
  data() {
    return {
      URL: '',
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    show: {
      get(): boolean {
        return this.value
      },
      set(value: boolean) {
        this.$emit('input', value)
      },
    },
  },
  watch: {
    value(value) {
      if (value) {
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
      }
    },
  },
})
</script>

<style scoped>
.dialog {
  transform: scale(0);
}
.show {
  transform: scale(1);
}
</style>