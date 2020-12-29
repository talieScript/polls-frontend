<template>
  <SnackBar v-model="snackOpen" :text="snackText">
    <BasicButton
      v-if="resStatus === 'emailPending'"
      color="white"
      textSize="sm"
      rounded="md"
      class="ml-auto mt-1"
      @click="resendEmail"
    >
      resend email
    </BasicButton>
  </SnackBar>
</template>

<script lang="ts">
import Vue from 'vue'
import snackText from '@/utils/snackText'

export default Vue.extend({
  name: 'ResponseSnack',
  data() {
    return {
      snackOpen: false,
      snackText: '',
      resStatus: '',
    }
  },
  props: {
    response: {
      type: Object,
      required: true,
    },
    userEmail: {
      type: String,
      required: false,
    },
  },
  watch: {
    response() {
      const { response, resStatus } = this
      this.resStatus = response.voteStatus
      if (resStatus === 'emailPending') {
        // show snack informing user they have voted
        this.snackText = snackText.poll.pendingEmail
        this.snackOpen = true
      }
    },
  },
  methods: {
    resendEmail() {
      this.$axios.post(`${process.env.VUE_APP_POLLS_API}/resendEmail`, {
        email: this.userEmail,
      })
    },
  },
})
</script>

<style scoped>
</style>