<template>
  <div>
    <div class="body-dashboard">
      <div class="header-dashboard">
        <Category-button />
      </div>
      <h2>Lokal</h2>
      <Loading v-if="isLoading" />
        <div class="container list-products">
        <card-product v-for="(product) in products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import CategoryButton from '../components/CategoryButton'
export default {
  name: 'LokalProduct',
  components: {
    CardProduct,
    Loading,
    CategoryButton
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    this.$store.dispatch('getByCategory', 'Lokal')
  }
}
</script>
