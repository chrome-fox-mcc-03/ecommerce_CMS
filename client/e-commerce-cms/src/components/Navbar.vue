<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">E-Comm CMS</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/products">Products</router-link>
      </li>
      <li v-if="!isLogin" class="nav-item active">
        <router-link class="nav-link" to="/login">Login</router-link>
      </li>
      <li v-else class="nav-item">
        <a id="logout-btn" class="nav-link" v-on:click="logout">Logout</a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
  methods: {
    logout: function () {
      localStorage.clear()
      this.$store.commit('SET_LOGIN', false)
      const condition = {
        icon: 'success',
        title: 'Logout Succesfull'
      }
      this.$store.dispatch('notification', condition)
      this.$router.push({ path: 'login' })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>
#logout-btn:hover{
  cursor:pointer;
}
.navbar{
  height: 8vh;
}
</style>
