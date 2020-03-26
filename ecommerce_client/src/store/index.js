import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
    Products: [],
    form: {
      Email: '',
      Password: ''
    }
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_ADMIN (state, payload) {
      state.isAdmin = payload
    },
    SET_PRODUCTS (state, payload) {
      state.Products = payload
    }

  },
  actions: {
    Login (context, payload) {
      return axios({
        url: 'https://afternoon-atoll-02314.herokuapp.com/user/login',
        method: 'POST',
        data: {
          Email: payload.Email,
          Password: payload.Password
        }
      })
    },
    Register (context, payload) {
      return axios({
        url: 'https://afternoon-atoll-02314.herokuapp.com/user/register',
        method: 'POST',
        data: {
          Email: payload.Email,
          Password: payload.Password
        }
      })
    },
    FetchProducts ({ commit }) {
      axios({
        url: 'https://afternoon-atoll-02314.herokuapp.com/products',
        method: 'GET',
        headers: {
          Access_Token: localStorage.getItem('Access_Token')
        }
      })
        .then(result => {
          commit('SET_PRODUCTS', result.data)
        })
        .catch(err => {
          this.$toasted.show(err)
        })
    },
    AddItem (context, payload) {
      return axios({
        url: 'https://afternoon-atoll-02314.herokuapp.com/products/create',
        method: 'POST',
        headers: {
          Access_Token: localStorage.getItem('Access_Token')
        },
        data: {
          Name: payload.Name,
          Image_Url: payload.Image_Url,
          Stock: payload.Stock,
          Price: payload.Price
        }
      })
    },
    UpdateItem (context, payload) {
      return axios({
        url: `https://afternoon-atoll-02314.herokuapp.com/products/update/${payload.id}`,
        method: 'PUT',
        headers: {
          Access_Token: localStorage.getItem('Access_Token')
        },
        data: {
          Name: payload.Name,
          Image_Url: payload.Image_Url,
          Stock: payload.Stock,
          Price: payload.Price
        }
      })
    },
    DeleteItem (context, payload) {
      return axios({
        url: `https://afternoon-atoll-02314.herokuapp.com/products/delete/${payload}`,
        method: 'DELETE',
        headers: {
          Access_Token: localStorage.getItem('Access_Token')
        }
      })
    },
    Logout ({ commit }) {
      commit('SET_LOGIN', false)
      commit('SET_ADMIN', false)
    }
  },
  getters: {

  }
})

export default store
