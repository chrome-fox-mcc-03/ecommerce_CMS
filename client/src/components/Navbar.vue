<template>
  <div>
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="dashboard-text">
            <strong>
                <router-link to="/products">Dashboard</router-link>
            </strong>
          </p>
        </div>
        <p class="level-item">
            <router-link to="/products/add" class="button is-white">Add Product</router-link>
        </p>
        <p class="level-item">
            <router-link to="/addadmin" class="button is-white">Add Admin</router-link>
        </p>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <p class="level-item">
          <a v-on:click="logout()" class="button is-dark">logout</a>
        </p>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>
