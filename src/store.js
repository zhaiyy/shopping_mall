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
  }

}
export default store
