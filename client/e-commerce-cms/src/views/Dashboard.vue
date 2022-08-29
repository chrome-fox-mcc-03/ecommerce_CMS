<template>
  <div>
    <div class='d-flex' style="width: 100vw; height: 80vh">
      <div id="cont1">
        <router-link to="/products" class="link-button" ><i class="fas fa-list"></i> Products</router-link>
        <router-link to="/products/add" class="link-button" > <i class="fas fa-plus"></i> Add Products</router-link>
      </div>
      <div id="cont2">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
<style>
#cont1{
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#cont2{
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.link-button{
  margin: 20px;
  background-color: #393e46;
  padding: 10px;
  border-radius: 5px;
  color:#929aab;
}
.link-button:hover{
  color: #f8b500;
  text-decoration: none;
  font-weight: bold;
}
</style>
