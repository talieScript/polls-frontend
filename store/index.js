export const state = () => ({
  userIp: '',
})

export const mutations = {
  setIp(state, ipAddress) {
    state.userIp = ipAddress;
  }
}

export const actions = {
  async getIP ({ commit }) {
    const ip = await this.$axios.$get('http://icanhazip.com')
    commit('setIp', ip)
  }
}