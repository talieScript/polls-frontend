import { POLLS_API } from '@/utils/endpoints'
import { createPostPayload } from '~/utils/helpers';

export const state = () => ({
  active: {
    title: '',
    question: '',
    answers: [],
    voteValidation: 'validateEmail',
    results: 'alwaysShow',
    pollvisibility: 'public',
    options: {
      endDate: true,
      multipleChoice: false,
    },
    endDate: '',
    multipleChoice: {
      option: 'upToo',
      number: 2,
    }
  }
});

export const mutations = {
  updatePoll(state, updatedPoll) {
    state.active = updatedPoll
  }
}

export const actions = {
  async submit({pollData, password}) {
    const payload = createPostPayload(pollData);
    this.$axios.$post(POLLS_API, {
      ...payload,
      password,
    })
  },
}

