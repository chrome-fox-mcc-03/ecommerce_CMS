<template>
  <sui-modal v-model="openEdit">
    <sui-modal-header><h2>Edit Product</h2></sui-modal-header>
    <sui-modal-content form>
      <sui-form @submit.prevent="editProduct">
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
        <div class="btn-group-edit">
          <sui-button @click.prevent="toggle" negative >Cancel</sui-button>
          <sui-button type="submit" color="blue" >Edit</sui-button>
        </div>
      </sui-form>
    </sui-modal-content>
  </sui-modal>
</template>

<script>
export default {
  name: 'ModalEdit',
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
      name: this.oneProduct,
      image_url: '',
      price: 0,
      stock: 0,
      type: null
    }
  },
  methods: {
    toggle () {
      this.$store.commit('SET_OPEN', 'edit')
    },
    editProduct () {
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: +this.price,
        stock: +this.stock,
        TypeId: +this.type
      }
      this.toggle()
      this.$store.dispatch('editProduct', payload)
    }
  },
  computed: {
    openEdit () {
      return this.$store.state.open.edit
    }
  },
  created () {
    const { name, price, stock, TypeId } = this.$store.state.oneProduct
    this.name = name
    this.image_url = this.$store.state.oneProduct.image_url
    this.price = price
    this.stock = stock
    this.type = TypeId
  }
}
</script>
