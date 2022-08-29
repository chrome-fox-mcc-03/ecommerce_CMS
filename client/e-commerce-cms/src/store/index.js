import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoading: false,
    products: [],
    productUpdate: {
      id: null,
      name: '',
      image_url: '',
      price: null,
      stock: null
    },
    productDetail: {
      id: null,
      name: '',
      image_url: '',
      price: null,
      stock: null
    }
  },
  mutations: {
    SET_LOGIN (state, value) {
      state.isLogin = value
    },
    SET_POKEMONS (state, value) {
      state.products = value
    },
    SET_PRODUCTUPDATE (state, value) {
      state.productUpdate.id = value.id
      state.productUpdate.name = value.name
      state.productUpdate.image_url = value.image_url
      state.productUpdate.price = value.price
      state.productUpdate.stock = value.stock
    },
    SET_PRODUCTDETAIL (state, value) {
      state.productDetail.id = value.id
      state.productDetail.name = value.name
      state.productDetail.image_url = value.image_url
      state.productDetail.price = value.price
      state.productDetail.stock = value.stock
    },
    RESET_PRODUCTDETAIL (state, value) {
      state.productDetail.id = null
      state.productDetail.name = ''
      state.productDetail.image_url = ''
      state.productDetail.price = null
      state.productDetail.stock = null
    },
    SET_ISLOADING (state, value) {
      state.isLoading = value
    }
  },
  actions: {
    register (context, payload) {
      context.commit('SET_ISLOADING', true)
      return axios({
        method: 'POST',
        url: 'https://intense-chamber-47439.herokuapp.com/register',
        data: payload
      })
    },
    login (context, payload) {
      const email = payload.email
      const password = payload.password
      context.commit('SET_ISLOADING', true)
      return axios({
        method: 'POST',
        url: 'https://intense-chamber-47439.herokuapp.com/login',
        data: {
          email,
          password
        }
      })
    },
    getProducts (context) {
      const token = localStorage.getItem('token')
      context.commit('SET_ISLOADING', true)
      axios({
        method: 'GET',
        url: 'https://intense-chamber-47439.herokuapp.com/products',
        headers: {
          token
        }
      })
        .then(result => {
          context.commit('SET_POKEMONS', result.data)
        })
        .catch(err => {
          const condition = {
            icon: 'error',
            title: err.response.data.message
          }
          context.dispatch('notification', condition)
          console.log(err)
        })
        .finally(_ => {
          context.commit('SET_ISLOADING', false)
        })
    },
    addProduct (context, payload) {
      const token = localStorage.getItem('token')
      context.commit('SET_ISLOADING', true)
      return axios({
        method: 'POST',
        url: 'https://intense-chamber-47439.herokuapp.com/products',
        headers: {
          token
        },
        data: payload
      })
    },
    productUpdate (context, payload) {
      const id = payload
      const token = localStorage.getItem('token')
      context.commit('SET_ISLOADING', true)
      axios({
        method: 'GET',
        url: `https://intense-chamber-47439.herokuapp.com/products/${id}`,
        headers: {
          token
        }
      })
        .then(result => {
          const value = result.data
          // console.log(this.state.productUpdate)
          context.commit('SET_PRODUCTUPDATE', value)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {
          context.commit('SET_ISLOADING', false)
        })
    },
    updateProduct (context, payload) {
      console.log('MUASOOOOOK')
      console.log(payload)
      const id = payload.id
      const token = localStorage.getItem('token')
      const toUpdate = {
        name: payload.name,
        image_url: payload.image_url,
        price: payload.price,
        stock: payload.stock
      }
      console.log('<<<<<<')
      console.log(toUpdate)
      context.commit('SET_ISLOADING', true)
      return axios({
        method: 'PUT',
        url: `https://intense-chamber-47439.herokuapp.com/products/${id}`,
        headers: {
          token
        },
        data: toUpdate
      })
    },
    deleteProduct (context, payload) {
      const id = payload
      const token = localStorage.getItem('token')
      context.commit('SET_ISLOADING', true)
      return axios({
        method: 'DELETE',
        url: `https://intense-chamber-47439.herokuapp.com/products/${id}`,
        headers: {
          token
        }
      })
    },
    detailProduct (context, payload) {
      const id = payload.id
      console.log(id)
      const token = localStorage.getItem('token')
      context.commit('SET_ISLOADING', true)
      axios({
        method: 'GET',
        url: `https://intense-chamber-47439.herokuapp.com/products/${id}`,
        headers: {
          token
        }
      })
        .then(result => {
          console.log('ini dari then')
          context.commit('SET_PRODUCTDETAIL', result.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
        .finally(_ => {
          context.commit('SET_ISLOADING', false)
        })
    },
    notification (context, payload) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: payload.icon,
        title: payload.title
      })
      return ''
    }
  },
  getters: {}
})
