<template>
  <div class="container">
    <div class="detail-layout">
      <div class="card card-layout">
        <div class="detail-image">
          <img :src="image_url" alt="" class="responsive">
        </div>
        <div class="detail">
            <div class="content">
            <p><b>Name:</b> {{name}}</p>
            <p><b>Price:</b>  Rp {{price}}</p>
            <p><b>Stock:</b> {{stock}}</p>
            <p><b>Category: </b> {{category}}</p>
            <p><b>description: </b> {{description}}</p>
          </div>
          <footer class="card-footer">
            <router-link :to="`/products`" class="card-footer-item">Back</router-link>
            <router-link :to="`/products/edit/${this.$route.params.id}`" class="card-footer-item">Edit</router-link>
            <a @click.prevent="deleteToast(id)" class="card-footer-item">Delete</a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailProduct',
  data: function () {
    return {
      id: '',
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
        .then(respnse => {
          this.$toasted.success('Success Delete Product')
          this.$router.push('/products')
        })
        .catch(err => {
          this.$store.commit('SET_ISLOADING', false)
          this.$toasted.error(err.response.data.errors[0])
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
        this.id = data.id
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
.detail-layout{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.card-layout{
  height: 50vh;
  width: 50vw;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.content{
  text-align: start;
}

.detail{
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.detail-image{
  width: 90%;
  height: 90%;
}

.responsive{
  max-width: 1000%;
  max-height: 100%;
}
</style>
