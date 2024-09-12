<template>
  <div data-v-15938c3a="" style="background-color: whitesmoke; height: 10vh;" class="ui menu">
    <div data-v-15938c3a="" class="center menu">
      <img style="width: 25vw; margin: 2vh 1vw;" src="../assets/logo.png" alt="logo">
    </div>
    <div data-v-15938c3a="" class="right menu" v-if="page !== 'LoginAdmin'">
      <router-link
        to="/login"
        style="margin: 2vh 1vw;"
      >
        <sui-popup
          content="LogOut"
          position="bottom right"
        >
          <sui-icon
            slot="trigger"
            name="sign-out"
            color="red"
            size="large"
            circular
          />
        </sui-popup>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    page () {
      return this.$route.name
    }
  }
}
</script>
