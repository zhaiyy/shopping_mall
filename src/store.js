import axios from 'axios'

const store = {
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    updateUserInfo(state, nickName) {
      state.nickName = nickName
    },
    updateCartCount(state, cartCount) {
      state.cartCount = parseInt(cartCount)
    },
  },
  actions: {
    getCartCount(store) {
      axios.get('/api/users/cartCount').then(res => {
        const data = res.data
        if (data.status) {
          store.commit('updateUserInfo', '')
          store.commit('updateCartCount', 0)
          return
        } else {
          store.commit('updateUserInfo', data.result.userName)
          store.commit('updateCartCount', data.result.cartCount)
        }
      })
    },

  }

}
export default store
