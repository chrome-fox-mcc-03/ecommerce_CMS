<template>
  <sui-dimmer :active="isActive">
    <sui-loader>Loading...</sui-loader>
  </sui-dimmer>
</template>

<script>
export default {
  name: 'Loading',
  computed: {
    isActive () {
      return this.$store.state.isLoading
    }
  }
}
</script>
