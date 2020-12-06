<template>
  <div
    class="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-25 z-50 flex items-center justify-center"
    :class="{ hidden: !open }"
    @click="close"
  >
    <dialog
      class="bg-white p-0 w-4/5 sm:w-auto sm:max-w-lg text-gray-600 rounded"
      :open="open"
      @click.stop
    >
      <div
        class="bg-primary w-full py-1 px-2 rounded-t flex items-center justify-start text-white"
      >
        <fa :icon="['fa', 'check-circle']" class="mr-2" />
        <h5 class="text-xl font-bold">Confirm Vote</h5>
        <button
          class="ml-auto hover:text-gray-300"
          aria-label="Close"
          @click="close"
        >
          <fa :icon="['fa', 'times-circle']" />
        </button>
      </div>
      <div class="text-sm mt-2 px-2">
        <p class="">This poll requires an email for vote validation</p>
        <div class="mt-2 mx-auto flex justify-center items-center">
          <TextInput
            v-model="email"
            label="Validate with email"
            ariaDescribedby="email"
            width="full"
            bgColor="white"
            outline
            :rules="[emailInputValidate]"
            :error.sync="emailError"
            validate-on-blur
          />
        </div>
        <!-- <hr class="mx-5" /> -->
      </div>
      <div class="mt-3 flex p-2">
        <BasicButton
          @click="close"
          class="ml-auto"
          color="red"
          textSize="sm"
          rounded="md"
        >
          cancel
        </BasicButton>
        <BasicButton
          @click="handleConfirm"
          class="ml-3"
          textSize="sm"
          rounded="md"
        >
          confirm
        </BasicButton>
      </div>
    </dialog>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { pollOptions } from '@/utils/types'
import BasicButton from '../BasicButton.vue'
import MultiSelectVue from './AnswerSelect/MultiSelect.vue'

export default Vue.extend({
  components: { BasicButton },
  name: 'ValidationDialog',
  data() {
    return {
      email: '',
      emailError: '',
    }
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    pollOptions: {
      type: Object,
      required: true,
    } as PropOptions<pollOptions>,
  },
  methods: {
    close() {
      this.$emit('close')
    },
    emailInputValidate(email) {
      if (!email) {
        return ''
      }
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase()) ? '' : 'Please enter an email'
    },
    handleConfirm(): any {
      const { email } = this
      if (!email) {
        this.emailError = 'Cannot be empty'
      }
      this.emailInputValidate(email)
      if (this.emailError) {
        return
      }
      this.$emit('confirm', email)
      this.$emit('close')
    },
  },
})
</script>

<style scoped>
</style>