<template>
  <sui-table-body>
    <sui-table-row>
      <sui-table-cell>{{index + 1}}</sui-table-cell>
      <sui-table-cell>{{name}}</sui-table-cell>
      <sui-table-cell>
        <img :src="image_url" alt="Product image">
      </sui-table-cell>
      <sui-table-cell>Rp. {{price.toLocaleString()}}</sui-table-cell>
      <sui-table-cell>{{stock}}</sui-table-cell>
      <sui-table-cell>{{Type.type}}</sui-table-cell>
      <sui-table-cell>
        <div is="sui-button-group">
          <sui-button color="blue"  @click.native="editProduct(id)">Edit</sui-button>
          <sui-button-or />
          <sui-button negative @click.native="deleteProduct(id)">Delete</sui-button>
        </div>
      </sui-table-cell>
    </sui-table-row>
  </sui-table-body>
</template>

<script>
export default {
  name: 'TableBody',
  props: {
    index: Number,
    id: Number,
    name: String,
    image_url: String,
    price: Number,
    stock: Number,
    Type: Object
  },
  methods: {
    editProduct (id) {
      this.$store.dispatch('findOneProduct', id)
    },
    deleteProduct (id) {
      this.$store.commit('SET_DELETE_ID', id)
      this.$store.commit('SET_OPEN', 'delete')
    }
  }
}
</script>
