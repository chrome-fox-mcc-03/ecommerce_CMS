<template>
    <div class="container">
        <div class="button-layout">
            <div>
                <button @click.prevent="allBtn" class="button is-primary is-rounded">All</button>
                <button @click.prevent="lokalBtn" class="button is-primary is-rounded">Local</button>
                <button @click.prevent="importBtn" class="button is-primary is-roundedbutton is-primary is-rounded">Import</button>
                <button @click.prevent="otherBtn" class="button is-primary is-rounded">Other</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    allBtn () {
      this.$router.push('/products')
    },
    lokalBtn () {
      this.$router.push('/products/lokal')
    },
    importBtn () {
      this.$router.push('/products/import')
    },
    otherBtn () {
      this.$router.push('/products/other')
    }
  }
}
</script>
<style scoped>
.button-layout{
    display: flex;
    justify-content: center;
    padding: 5px;
}

.button-layout button{
    margin: 5px;
}
</style>
