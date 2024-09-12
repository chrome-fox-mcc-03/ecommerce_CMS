<template>
  <div class="ui container">
    <h2>Create Product</h2>
    <sui-form @submit.prevent="createProduct">
      <sui-form-field>
        <label>Product Name</label>
        <input type="text" v-model="name" placeholder="Product Name" required />
      </sui-form-field>
      <sui-form-field>
        <label>Image URL</label>
        <input type="url" v-model="image_url" placeholder="Image URL" required />
      </sui-form-field>
      <sui-form-field>
        <label>Price</label>
        <input type="number" min="1" v-model="price" placeholder="Price" required />
      </sui-form-field>
      <sui-form-field>
        <label>Stock</label>
        <input type="number" min="1" v-model="stock" placeholder="Stock" required />
      </sui-form-field>
      <sui-form-field>
        <label>Type</label>
        <sui-dropdown
          selection
          :options="options"
          v-model="type"
          placeholder="Type"
          required
        />
      </sui-form-field>
      <sui-button type="submit" positive >Submit</sui-button>
    </sui-form>
  </div>
</template>

<script>
export default {
  name: 'FormExample',
  data () {
    return {
      options: [
        {
          text: 'helmet',
          value: 1
        },
        {
          text: 'accessories',
          value: 2
        }
      ],
      name: '',
      image_url: '',
      price: 0,
      stock: 0,
      type: null
    }
  },
  methods: {
    createProduct () {
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: +this.price,
        stock: +this.stock,
        TypeId: +this.type
      }
      this.$store.dispatch('createProduct', payload)
    }
  }
}
</script>
