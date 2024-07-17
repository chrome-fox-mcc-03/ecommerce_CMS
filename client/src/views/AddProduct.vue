<template>
    <div>
        <div class="container-form">
          <div class="card card-addProduct">
            <h3>Add Product</h3>
            <form v-on:submit.prevent="addProduct()">
              <div class="field">
                <div class="control">
                  <input v-model="name" class="input is-primary" type="text" placeholder="Name Product">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="image_url" class="input is-primary" type="text" placeholder="Image Url">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="price" class="input is-primary" type="text" placeholder="Price">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="stock" class="input is-primary" type="text" placeholder="Stock">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="category" class="input is-primary" type="text" placeholder="category">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="description" class="input is-primary" type="text" placeholder="description">
                </div>
              </div>
              <button type="submit" class="button is-primary is-outlined">Add Product</button>
            </form>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'AddProduct',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: '',
      category: '',
      description: ''
    }
  },
  components: {
  },
  methods: {
    addProduct () {
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        category: this.category,
        description: this.description
      }
      this.$store.dispatch('addProduct', payload)
        .then(response => {
          this.$toasted.success('Success add product')
          this.$router.push('/products')
        })
        .catch(error => {
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
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
