<template>
  <div class="card card-product">
    <div class="card-image">
      <figure class="image">
        <img :src="product.image_url" />
      </figure>
    </div>
    <div class="content">
      <p>{{product.name}}</p>
      <p>Rp {{product.price}}</p>
      <p>Stock: {{product.stock}}</p>
    </div>
    <footer class="card-footer">
      <router-link :to="`/products/detail/${product.id}`" class="card-footer-item">Detail</router-link>
      <router-link :to="`/products/edit/${product.id}`" class="card-footer-item">Edit</router-link>
      <a @click.prevent="deleteToast(product.id)" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'CardProduct',
  props: ['product'],
  methods: {
    deleteToast (id) {
      this.$toasted.error('Are You Sure delete this Product?', {
        action: [
          {
            className: 'cancel-btn',
            text: 'Cancel',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          },
          {
            text: 'Yes',
            onClick: (e, toastObject) => {
              this.deleteProduct(id)
            }
          }
        ]
      })
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
        .then(response => {
          this.$router.push('/products')
          this.$toasted.success('Success Delete Product')
        })
        .catch(err => {
          this.$store.commit('SET_ISLOADING', false)
          this.$toasted.error(err.response.data.errors[0])
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    }
  }
}
</script>

<style>
.cancel-btn{
  color: aliceblue
}
</style>
