<template>
<div>
  <div class="navbar-dashboard">
        <Navbar/>
        </div>
  <div class="container-form">
    <Loading v-if="isLoading" />
    <div class="card card-logreg">
      <h3>Add Admin Page</h3>
      <form v-on:submit.prevent="addAdmin()">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="name" class="input is-primary" placeholder="Name" />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
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
        <div class="layout-btn">
        <button @click.prevent="allBtn" class="button is-outlined">Back</button>
        <button type="submit" class="button is-primary is-outlined">Add Admin</button>
        </div>
      </form>
      <div id="nav" class="card-footer">
        <p>
          hanya bisa digunakan untuk Super Admin
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
export default {
  name: 'AddAdmin',
  components: {
    Loading, Navbar
  },
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    allBtn () {
      this.$router.push('/products')
    },
    addAdmin () {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('addAdmin', payload)
        .then(response => {
          this.$toasted.success('Success Add Admin')
          this.name = ''
          this.email = ''
          this.password = ''
          this.$router.push('/addadmin')
        })
        .catch(error => {
          if (!error.response) {
            this.$toasted.error('Server Disconnected')
          } else {
            const errors = error.response.data.errors
            for (let i = 0; i < errors.length; i++) {
              this.$toasted.error(errors[i])
            }
          }
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style scoped>
.layout-btn{
  display: flex;
  justify-content: center;
  padding: 5px;
}

.layout-btn button{
  margin: 5px;
}
</style>
