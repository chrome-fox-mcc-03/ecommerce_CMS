<template>
  <sui-grid-column :width="3">
    <sui-menu fluid vertical tabular>
      <a
        v-for="item in items"
        :key="item"
        is="sui-menu-item"
        :content="item"
        :active="isActive(item)"
        @click="select(item)"
      />
    </sui-menu>
    <Message />
  </sui-grid-column>
</template>

<script>
import Message from '@/components/Message.vue'

export default {
  name: 'LeftPanel',
  data () {
    return {
      items: ['List', 'Create']
    }
  },
  methods: {
    isActive (name) {
      return this.activeStore === name
    },
    select (name) {
      this.$store.commit('SET_ACTIVE', name)
      this.change(name)
    },
    change (name) {
      let route = ''
      name === 'List' ? route = 'ListProduct' : route = 'CreateProduct'
      this.$router.push({ name: route })
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  components: {
    Message
  },
  computed: {
    activeStore () {
      return this.$store.state.active
    }
  }
}
</script>
