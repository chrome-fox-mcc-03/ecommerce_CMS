<template>
  <sui-modal v-model="openDelete" id="modal-delete">
    <sui-modal-header><h2 style="color: red;">Delete this product?</h2></sui-modal-header>
    <sui-modal-content>
      <p>This product will deleted permanently</p>
    </sui-modal-content>
    <sui-modal-actions>
      <div class="btn-group-delete">
        <sui-button @click.prevent="toggle" color="green" >Cancel</sui-button>
        <sui-button @click="deleteProduct" negative >Delete</sui-button>
      </div>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>
export default {
  name: 'ModalDelete',
  computed: {
    openDelete () {
      return this.$store.state.open.delete
    }
  },
  methods: {
    toggle () {
      this.$store.commit('SET_OPEN', 'delete')
    },
    deleteProduct () {
      this.$store.dispatch('deleteProduct')
      this.toggle()
    }
  }
}
</script>
