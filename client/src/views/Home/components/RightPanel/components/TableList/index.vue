<template>
  <sui-table basic="very" class="table">
    <TableHeader />
    <TableBody v-for="({ id, name, image_url, price, stock, Type }, index) in listProduct"
      :key="index"
      :index="index"
      :id="id"
      :name="name"
      :image_url="image_url"
      :price="price"
      :stock="stock"
      :Type="Type"
    />
    <ModalEdit v-if="openEdit"/>
    <ModalDelete v-else-if="openDelete"/>
  </sui-table>
</template>

<script>
import TableHeader from './components/TableHeader.vue'
import TableBody from './components/TableBody.vue'
import ModalEdit from '../../../../../../components/Modal/ModalEdit.vue'
import ModalDelete from '../../../../../../components/Modal/ModalDelete.vue'

export default {
  name: 'TableListProduct',
  computed: {
    listProduct () {
      return this.$store.state.products
    },
    openEdit () {
      return this.$store.state.open.edit
    },
    openDelete () {
      return this.$store.state.open.delete
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  components: {
    TableHeader,
    TableBody,
    ModalEdit,
    ModalDelete
  }
}
</script>
