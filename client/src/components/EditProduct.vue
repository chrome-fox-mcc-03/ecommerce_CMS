<template>
<div class="container">
    <div class="container-form">
          <div class="card card-editProduct">
            <div class="edit-image">
            <img :src="image_url" alt="">
            </div>
            <div class="edit-form">
            <form v-on:submit.prevent="editProduct()">
              <div class="field">
                <div class="control">
                  <label for="name">Name</label>
                  <input v-model="name" class="input is-primary" type="text" placeholder="Name Product">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label for="image_url"> Image Url</label>
                  <input v-model="image_url" class="input is-primary" type="text" placeholder="Image Url">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label for="price">Price</label>
                  <input v-model="price" class="input is-primary" type="text" placeholder="Price">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label for="stocks"> Stock </label>
                  <input v-model="stock" class="input is-primary" type="text" placeholder="Stock">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label for="Category"> Category </label>
                  <input v-model="category" class="input is-primary" type="text" placeholder="category">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label for="description"> description </label>
                  <input v-model="description" class="input is-primary" type="text" placeholder="description">
                </div>
              </div>
              <div class="layout-btn">
              <button @click.prevent="allBtn" class="button is-primary is-outlined">Back</button>
              <button type="submit" class="button is-primary is-outlined">Edit Product</button>
              </div>
            </form>
            </div>
          </div>
        </div>
</div>
</template>

<script>
export default {
  name: 'EditProduct',
  data: function () {
    return {
      name: '',
      price: '',
      stock: '',
      image_url: '',
      category: '',
      description: ''
    }
  },
  components: {
  },
  methods: {
    allBtn () {
      this.$router.push('/products')
    },
    editProduct () {
      const payload = {
        id: this.$route.params.id,
        name: this.name,
        price: this.price,
        stock: this.stock,
        image_url: this.image_url,
        category: this.category,
        description: this.description
      }
      this.$store.dispatch('editProduct', payload)
        .then(response => {
          this.$toasted.success('Success Edit Product')
          this.$router.push('/products')
        })
        .catch(error => {
          this.$store.commit('SET_ISLOADING', false)
          const errors = error.response.data.errors
          for (let i = 0; i < errors.length; i++) {
            this.$toasted.error(errors[i])
          }
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    }
  },
  created () {
    this.$store.dispatch('getById', this.$route.params.id)
      .then(response => {
        const data = response.data
        this.name = data.name
        this.price = data.price
        this.stock = data.stock
        this.image_url = data.image_url
        this.category = data.category
        this.description = data.description
      })
      .catch(err => {
        this.$toasted.error(err.response.data.errors[0])
      })
      .finally(_ => {
        this.$store.commit('SET_ISLOADING', false)
      })
  }
}
</script>

<style scoped>
.card-editProduct{
  display: flex;
  width: 70%;
}

.card-editProduct form{
  width: 90%;
  height: 90%;
}

.layout-btn{
  display: flex;
  padding: 5px;
}

.layout-btn button{
  margin: 5px;
}
</style>
