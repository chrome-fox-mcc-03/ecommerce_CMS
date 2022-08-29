<template>
  <div id="loading">
    <lottie-player id="animation"
    src="https://assets10.lottiefiles.com/datafiles/bNwYPnjv3OdFA5w/data.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay >
    </lottie-player>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#loading{
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
#animation{
  height: 30%;
  width: 30%
}
</style>
