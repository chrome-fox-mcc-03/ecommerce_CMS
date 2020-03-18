import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import UIkit from 'uikit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isLogin: false,
    isLoading: false
  },
  mutations: {
    SET_ISLOADING (state, payload) {
      state.isLoading = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  getters: {},
  actions: {
    getProducts (context) {
      context.commit('SET_ISLOADING', true)
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          context.commit('SET_PRODUCTS', [...response.data.response])
        })
        .catch(err => {
          console.log(err.response)
        })
        .finally(_ => {
          context.commit('SET_ISLOADING', false)
        })
    },
    getProductData (_, id) {
      return axios({
        method: 'GET',
        url: `http://localhost:3000/products/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    login (_, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: payload
      })
    },
    addProduct (_, payload) {
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/products',
        headers: {
          token: localStorage.getItem('token')
        },
        data: payload
      })
    },
    editProduct (_, payload) {
      return axios({
        method: 'PUT',
        url: `http://localhost:3000/products/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: payload
      })
    },
    deleteProduct (context, id) {
      return axios({
        method: 'DELETE',
        url: `http://localhost:3000/products/${id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          id
        }
      })
    }
  }
})
