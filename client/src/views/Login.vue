<template>
  <div class="container-form">
    <Loading v-if="isLoading" />
    <div class="card card-logreg">
      <h3>Login Admin Page</h3>
      <form v-on:submit.prevent="loginCheck()">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="email" class="input is-primary" type="email" placeholder="Email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input v-model="password" class="input is-primary" type="password" placeholder="Password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <button type="submit" class="button is-primary is-outlined">Login</button>
      </form>
      <div id="nav" class="card-footer">
        <!-- <p>
          comment, terpakai nanti untuk add admin
          Don't you have an account? please
          <router-link to="/register">Register</router-link>
        </p> -->
        <p>
          akun tersedia di seeders User admin server
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading'
export default {
  name: 'Login',
  components: {
    Loading
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginCheck () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then(response => {
          const token = response.data.token
          localStorage.setItem('token', token)
          this.$toasted.success('Success Login')
          this.$router.push('/products')
        })
        .catch(error => {
          if (!error.response) {
            this.$toasted.error('Server Disconnected')
          } else {
            this.$toasted.error(error.response.data.errors[0])
          }
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$router.push('/products')
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
