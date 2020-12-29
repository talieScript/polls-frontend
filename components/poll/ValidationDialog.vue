<template>
  <Dialog
    v-model="open"
    buttonText="confirm"
    title="Confoirm Vote"
    @submit="handleConfirm"
  >
    <template slot="icon">
      <fa :icon="['fa', 'check-circle']" class="mr-2 text-lg" />
    </template>
    <p class="">This poll requires an email for vote validation</p>
    <GoogleSignIn />
    or
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
  </Dialog>
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
    value: {
      type: Boolean,
      required: true,
    },
    pollOptions: {
      type: Object,
      required: true,
    } as PropOptions<pollOptions>,
    chosen: {
      type: Array,
      required: true,
    },
  },
  computed: {
    open: {
      get(): boolean {
        return this.value
      },
      set(value: boolean) {
        this.$emit('input', value)
      },
    },
  },
  mounted() {
    // set the redirct page to this poll incase the user decides to log in
    localStorage.setItem('redirect', this.$route.path)
  },
  watch: {
    open(value) {
      if (value) {
        // Save the users answers incase they log in
        localStorage.setItem('userAnswers', this.chosen.join(','))
      }
    },
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