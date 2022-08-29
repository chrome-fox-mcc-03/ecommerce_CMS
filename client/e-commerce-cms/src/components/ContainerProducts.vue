<template>
  <div id="cont3">
    <h1 style="padding-top: 10px">Product List</h1>
    <div id="container-list-product">
      <div id="product" v-for="product in products" :key="product.id">
        <div id="product-content">
          {{ product.name }}
        </div>
        <div id="options">
          <div id="product-option">
            <a class="option-button" @click="deleteProduct(product.id)" >Delete</a>
            <a class="option-button" @click="updateProduct(product.id)">Edit</a>
          </div>
          <div id="detail-button">
            <a @click="detailProduct(product)" type="button" class="btn" data-toggle="modal" data-target="#exampleModal">
              Detail
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    updateProduct (id) {
      this.$store.dispatch('productUpdate', id)
      this.$router.push({ name: 'UpdateProduct', params: { id: id } })
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
        .then(result => {
          const condition = {
            icon: 'success',
            title: `Succesfully Delete ${result.data.name}`
          }
          this.$store.dispatch('notification', condition)
          this.$store.dispatch('getProducts')
          this.$router.push({ name: 'Dashboard' })
        })
        .catch(err => {
          const condition = {
            icon: 'error',
            title: `Error ${err.response.data.message}`
          }
          this.$store.dispatch('notification', condition)
        })
        .finally(_ => {
          this.$store.commit('SET_ISLOADING', false)
        })
    },
    detailProduct (product) {
      this.$store.commit('RESET_PRODUCTDETAIL')
      this.$store.dispatch('detailProduct', product)
    }
  },
  created: function () {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style>
h1{
  color: #272e4f;
}
#cont3{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#options{
  width: 30%;
  height: 100%;
  border-left: 1px solid #929aab;
  display: flex;
  flex-direction: row;
}
#options:hover{
  border-left: 1px solid #f8b500;
}
#detail-button{
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#detail-button a:hover{
  font-weight: bold;
}
#product{
  width: 80%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  margin: 10px;
  background-color: #2c365d;
  color: #f2f2f0;
  border-radius: 5px;
}
#product:hover{
  background-color: #272e4f;
  color: #f8b500;
}
#container-list-product{
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
#product-option{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin: 0px 10px;
}
#product-option a:hover{
  font-weight: bold;
}
#product-content{
  width: 70%;
}
.option-button:hover{
  cursor: pointer;
}
</style>
