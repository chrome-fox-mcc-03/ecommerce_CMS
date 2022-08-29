<template>
  <div id="app">
    <div id="nav">
      <navbar/>
    </div>
    <router-view id="router-item"/>
    <loading v-if="isLoading"/>
    <product-detail/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import ProductDetail from './components/ProductDetail.vue'
import Loading from './views/Loading'
export default {
  data: function () {
    return {
    }
  },
  components: {
    Navbar,
    ProductDetail,
    Loading
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created: function () {
    const isToken = localStorage.getItem('token')
    if (isToken) {
      this.$store.commit('SET_LOGIN', true)
      this.$router.push({ path: 'products' })
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  background: rgb(255,255,255);
  background: linear-gradient(rgba(255,255,255,1) 0%, rgba(213,199,199,1) 59%, rgba(184,184,193,1) 87%, rgba(155,155,166,1) 100%);
}

#router-item{
  height: 90vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#nav a {
  font-weight: bold;
  color: #393e46;
}

#nav a.router-link-exact-active {
  color: #f8b500;
}
</style>
