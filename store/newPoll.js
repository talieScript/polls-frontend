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
    this.$axios.$post('/polls', {
      ...payload,
      password,
    }).then((createdPoll) => {
      console.log('Poll created! 🥳');
      this.$router.push('/poll/' + createdPoll)
    }).catch(error => {
      console.log(error);
    })
  },
}

