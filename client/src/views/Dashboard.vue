<template>
        <div class="layout-dashboard">
        <div class="navbar-dashboard">
        <Navbar/>
        </div>
        <div class="container">
        <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Navbar from '../components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>

<style scoped>
</style>
