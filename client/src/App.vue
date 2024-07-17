<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.container-form {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-logreg {
  height: 40vh;
  width: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-logreg form {
  width: 80%;
  margin: 10px;
}

.list-products {
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.card-addProduct {
  height: 45vh;
  width: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-product {
  margin: 10px;
  height: auto;
  width: 15vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  /* text-align: start; */
}

.card-image {
  height: 100%;
}

.content {
  height: 40%;
}

.navbar-dashboard {
  padding: 10px 15px;
  background-color: brown;
}

.dashboard-text{
  color: azure;
}

.body-dashboard {
  height: 100vh;
}

@media screen and (max-width: 768px) {
  .card-logreg {
    height: 50vh;
    width: 70vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
