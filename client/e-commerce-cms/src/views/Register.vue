<template>
  <div id="containerRegister">
    <form @submit.prevent="register" id="registerForm">
      <h1>Register</h1>
      <input v-model="userReg.name" placeholder="name" type="text" class="form-input">
      <input v-model="userReg.email" placeholder="email" type="text" class="form-input">
      <input v-model="userReg.password" placeholder="password" type="text" class="form-input">
      <input type="submit" class="form-submit" value="Register">
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      userReg: {
        name: '',
        email: '',
        password: '',
        role: 'admin'
      }
    }
  },
  methods: {
    register: function () {
      this.$store.dispatch('register', this.userReg)
        .then(result => {
          const condition = {
            icon: 'success',
            title: 'Register Succesfull'
          }
          this.$store.dispatch('notification', condition)
          this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          const condition = {
            icon: 'error',
            title: err.response.data.message
          }
          this.$store.dispatch('notification', condition)
          console.log(err)
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    }
  }
}
</script>

<style>
#containerRegister{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#registerForm{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.form-input{
  margin: 5px
}
</style>
