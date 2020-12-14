import { createPostPayload } from '~/utils/helpers';

const emptyPoll = {
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
}

export const state = () => ({
  active: emptyPoll,
  initEdit: true,
});

export const mutations = {
  updatePoll(state, updatedPoll) {
    state.active = updatedPoll
    state.initEdit = false
  },
  resetActive(state) {
    state.active = emptyPoll
  }
}

export const actions = {
  async submit({state, mutations}, password) {
    const payload = createPostPayload(state.active);
    this.$axios.$post('/polls', {
      ...payload,
      password,
    }).then((createdPoll) => {
      console.log('Poll created! 🥳');
      this.$router.push('/poll/' + createdPoll)
      mutations.resetActive();
    }).catch(error => {
      console.log(error);
    })
  },
}

