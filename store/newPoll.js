import { POLLS_API } from '@/utils/endpoints'
import { createPostPayload } from '~/utils/helpers';

export const state = () => ({
  active: {
    title: '',
    question: '',
    answers: [],
    voteValidation: 'validateEmail',
    resultsVisibility: 'alwaysShow',
    pollVisibility: 'public',
    options: {
      endDate: true,
      multipleChoice: false,
    },
    endDate: '',
    multipleChoice: {
      option: 'upToo',
      number: 2,
    }
  },
  initEdit: true,
});

export const mutations = {
  updatePoll(state, updatedPoll) {
    state.active = updatedPoll
    state.initEdit = false
  }
}

export const actions = {
  async submit({state}, password) {
    const payload = createPostPayload(state.active);
    console.log(payload)
    this.$axios.$post('/polls', {
      ...payload,
      password,
    }).then((createdPoll) => {
      console.log('Poll created! 🥳');
      console.log({createdPoll})
      // this.$router.push()
    }).catch(error => {
      console.log('here')
      console.log(error);
    })
  },
}

