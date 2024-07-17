import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLoading: false
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_ISLOADING (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    addAdmin ({ commit }, payload) {
      commit('SET_ISLOADING', true)
      return axios({
        method: 'post',
        url: 'https://enigmatic-tundra-28075.herokuapp.com/users/register',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          role: 'Admin'
        }
      })
    },
    login ({ commit, state, dispatch }, payload) {
      commit('SET_ISLOADING', true)
      return axios({
        method: 'post',
        url: 'https://enigmatic-tundra-28075.herokuapp.com/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    getProducts ({ commit }) {
      commit('SET_ISLOADING', true)
      axios({
        method: 'get',
        url: 'https://enigmatic-tundra-28075.herokuapp.com/products'
      })
        .then(response => {
          const {
            data
          } = response
          commit('SET_PRODUCTS', [...data])
        })
        .catch(err => {
          this.$toasted.error(err.response.data.errors[0])
        })
        .finally(_ => {
          commit('SET_ISLOADING', false)
        })
    },
    addProduct ({ commit }, payload) {
      if (payload.category !== 'Lokal' && payload.category !== 'Import') {
        payload.category = 'Other'
      }
      if (payload.stock < 0) {
        payload.stock = 0
      }
      commit('SET_ISLOADING', true)
      return axios({
        method: 'post',
        url: 'https://enigmatic-tundra-28075.herokuapp.com/products',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock,
          category: payload.category,
          description: payload.description
        }
      })
    },
    getById ({ commit, dispatch }, payload) {
      commit('SET_ISLOADING', true)
      return axios({
        method: 'get',
        url: `https://enigmatic-tundra-28075.herokuapp.com/products/${payload}`
      })
    },
    getByCategory ({ commit, dispatch }, payload) {
      commit('SET_ISLOADING', true)
      axios({
        method: 'get',
        url: `https://enigmatic-tundra-28075.herokuapp.com/products/category/${payload}`
      })
        .then(response => {
          const {
            data
          } = response
          commit('SET_PRODUCTS', [...data])
        })
        .catch(err => {
          this.$toasted.error(err.response.data.errors[0])
        })
        .finally(_ => {
          commit('SET_ISLOADING', false)
        })
    },
    editProduct ({ commit }, payload) {
      if (payload.category !== 'Lokal' && payload.category !== 'Import') {
        payload.category = 'Other'
      }
      if (payload.stock < 0) {
        payload.stock = 0
      }
      commit('SET_LOADING', true)
      const { id, name, imageUrl, price, stock, category, description } = payload
      return axios({
        method: 'put',
        url: `https://enigmatic-tundra-28075.herokuapp.com/products/${id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          name, image_url: imageUrl, price, stock, category, description
        }
      })
    },
    deleteProduct ({ commit }, payload) {
      commit('SET_ISLOADING', true)
      return axios({
        method: 'delete',
        url: `https://enigmatic-tundra-28075.herokuapp.com/products/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  getters: {}
})
