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
    const ip = await this.$axios.$get(process.env.VUE_APP_IP_GETTER)
    commit('setIp', ip)
  }
}