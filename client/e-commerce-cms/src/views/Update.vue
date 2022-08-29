<template>
  <div id="containerUpdate">
    <form @submit.prevent="update" action="" id="updateForm">
      <h1>Update Product</h1>
      <input v-model="productDetail.name" class="form-input" type="text" autofocus>
      <input v-model="productDetail.image_url"  class="form-input" type="text">
      <input v-model="productDetail.price"  class="form-input" type="number">
      <input v-model="productDetail.stock"  class="form-input" type="number">
      <input class="form-submit" type="submit" value="Update Product">
    </form>
  </div>
</template>

<script>
export default {
  created () {
    this.$route.params.id = this.productDetail.id
  },
  data: function () {
    return {
    }
  },
  computed: {
    productDetail () {
      return this.$store.state.productUpdate
    }
  },
  methods: {
    update: function () {
      const data = {
        id: this.productDetail.id,
        name: this.productDetail.name,
        image_url: this.productDetail.image_url,
        price: this.productDetail.price,
        stock: this.productDetail.stock
      }
      console.log(data)
      console.log('>>>>>>')
      this.$store.dispatch('updateProduct', data)
        .then(result => {
          const condition = {
            icon: 'success',
            title: `Succesfull Update ${result.data.name}`
          }
          this.$store.dispatch('notification', condition)
          this.$router.push({ name: 'Dashboard' })
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
#containerUpdate{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#updateForm{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
