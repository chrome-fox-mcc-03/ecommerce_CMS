import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

const url = 'https://shrouded-meadow-59142.herokuapp.com'

export default new Vuex.Store({
  state: {
    isLoading: false,
    products: [],
    message: {
      isMessage: false
    },
    active: 'List',
    open: {
      edit: false,
      delete: false
    },
    editId: 0,
    deleteId: 0,
    oneProduct: {}
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_MESSAGE (state, payload) {
      state.message = payload
    },
    SET_LOADING (state) {
      state.isLoading = !state.isLoading
    },
    SET_ISMESSAGE (state) {
      state.message.isMessage = false
    },
    SET_ACTIVE (state, payload) {
      state.active = payload
    },
    SET_OPEN (state, payload) {
      payload === 'edit' ? state.open.edit = !state.open.edit : state.open.delete = !state.open.delete
    },
    SET_EDIT_ID (state, payload) {
      state.editId = payload
    },
    SET_DELETE_ID (state, payload) {
      state.deleteId = payload
    },
    SET_ONE_PRODUCT (state, payload) {
      state.oneProduct = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      commit('SET_LOADING')
      axios({
        method: 'get',
        url: `${url}/product`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_PRODUCTS', data.data)
        })
        .catch(err => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'ERROR!',
            message: err.response.data.message
          })
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    adminLogin ({ commit }, payload) {
      const { email, password } = payload
      commit('SET_LOADING')
      axios({
        method: 'post',
        url: `${url}/login`,
        data: {
          email, password
        }
      })
        .then(({ data }) => {
          const { token, message } = data
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'Success!',
            message
          })
          localStorage.setItem('token', token)
          router.push({ path: '/' })
        })
        .catch(err => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'ERROR!',
            message: err.response.data.message
          })
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    createProduct ({ commit, dispatch }, payload) {
      const { name, price, stock, TypeId } = payload
      commit('SET_LOADING')
      axios({
        method: 'post',
        url: `${url}/product`,
        data: {
          name, image_url: payload.image_url, price, stock, TypeId
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'SUCCESS!',
            message: data.message
          })
          dispatch('fetchProducts')
          commit('SET_ACTIVE', 'List')
          router.push({ path: '/' })
        })
        .catch(err => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'ERROR!',
            message: err.response.data.message
          })
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    editProduct ({ commit, state, dispatch }, payload) {
      const { name, price, stock, TypeId } = payload
      const id = state.editId
      commit('SET_LOADING')
      axios({
        method: 'put',
        url: `${url}/product/${id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          name, image_url: payload.image_url, price, stock, TypeId
        }
      })
        .then(({ data }) => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'SUCCESS!',
            message: data.message
          })
          dispatch('fetchProducts')
        })
        .catch(err => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'ERROR!',
            message: err.response.data.message
          })
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    findOneProduct ({ commit }, payload) {
      commit('SET_LOADING')
      commit('SET_EDIT_ID', payload)
      axios({
        method: 'get',
        url: `${url}/product/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          const { name, price, stock, TypeId } = data.data
          commit('SET_ONE_PRODUCT', { name, image_url: data.data.image_url, price, stock, TypeId })
          commit('SET_OPEN', 'edit')
        })
        .catch(err => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'ERROR!',
            message: err.response.data.message
          })
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    },
    deleteProduct ({ commit, state, dispatch }) {
      commit('SET_LOADING')
      axios({
        method: 'delete',
        url: `${url}/product/${state.deleteId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'SUCCESS!',
            message: data.message
          })
          dispatch('fetchProducts')
        })
        .catch(err => {
          commit('SET_MESSAGE', {
            isMessage: true,
            title: 'ERROR!',
            message: err.response.data.message
          })
        })
        .finally(_ => {
          commit('SET_LOADING')
        })
    }
  },
  modules: {
  }
})
