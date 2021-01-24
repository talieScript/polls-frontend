<template>
  <SnackBar
    v-model="snackOpen"
    :text="snackText"
    :colour="colour"
    :timer="6000"
  >
    <br />
    <BasicButton
      v-if="resStatus === 'emailPending' || resStatus === 'emailSent'"
      color="white"
      textSize="sm"
      rounded="md"
      class="ml-auto mt-1"
      :loading="loadingEmail"
      @click="resendEmail"
    >
      resend email
    </BasicButton>
    <LoginLink v-if="resStatus === 'alreadyVoted'" outline />
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
      loadingEmail: false,
      colour: 'blue-500',
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
      const { response } = this
      this.resStatus = response.voteStatus
      if (this.resStatus === 'emailPending' || this.resStatus === 'emailSent') {
        // show snack informing user they have already voted
        this.snackText = snackText.poll.pendingEmail
        this.snackOpen = true
      } else if (this.resStatus === 'votePassed') {
        this.colour = 'green-500'
        this.snackText = snackText.poll.voteCounted
        this.snackOpen = true
      } else if (this.resStatus === 'alreadyVoted') {
        this.colour = 'yellow-500'
        this.snackText = snackText.poll.alreadyVoted
        this.snackOpen = true
      }
    },
  },
  methods: {
    async resendEmail() {
      // TODO: add loading state to basic button
      this.loadingEmail = true
      await this.$axios.post(`${process.env.VUE_APP_POLLS_API}/email/resend`, {
        email: this.userEmail,
      })
      this.snackOpen = false
      this.loadingEmail = false
    },
  },
})
</script>

<style scoped>
</style>