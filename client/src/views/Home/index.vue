<template lang="html">
  <sui-grid>
    <LeftPanel />
    <RightPanel />
    <Loading />
  </sui-grid>
</template>

<script>
import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import Loading from '../../components/Loading.vue'

export default {
  name: 'Home',
  components: {
    LeftPanel,
    RightPanel,
    Loading
  },
  created () {
    this.$router.push({ name: 'ListProduct' })
  }
}
</script>
