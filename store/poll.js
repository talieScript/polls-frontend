export const state = () => ({
  activePoll: {
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
    state.activePoll = updatedPoll
  }
}

