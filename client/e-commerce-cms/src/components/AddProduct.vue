<template>
  <div id="containerAdd">
    <form @submit.prevent="add" id="addForm">
      <h1 class="form-title">Add Product</h1>
      <input v-model="product.name" class="form-input" type="text" placeholder="Name" autofocus>
      <input v-model="product.image_url" class="form-input" type="text" placeholder="Image Url">
      <input v-model="product.price" class="form-input" type="number" placeholder="Price">
      <input v-model="product.stock" class="form-input" type="number" placeholder="Stock">
      <input class="form-submit" type="submit" value="Add Product">
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      product: {
        name: '',
        image_url: '',
        price: null,
        stock: null
      }
    }
  },
  methods: {
    add: function () {
      const product = this.product
      this.$store.dispatch('addProduct', product)
        .then(result => {
          const condition = {
            icon: 'success',
            title: `Succesfull Add ${result.data.name}`
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
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    }
  }
}
</script>

<style>
.form-title{
  padding-bottom: 5%;
}
#containerAdd{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#addForm{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
.form-input{
  margin: 5px;
  width: 60%;
  height: 10%;
  border: none;
  background-color: transparent;
  border-bottom: 2px #f8b500 solid;
  font-size: 1 rem;
  color: #393e46;
  font-weight: bold;
  padding: 5px;
}
.form-submit{
  margin: 1rem;
  height: 3rem;
  width: 10rem;
  border-radius: 5px;
  background-color: #393e46;
  color: #929aab;
}
.form-submit:hover{
  color: #f8b500;
}
</style>
