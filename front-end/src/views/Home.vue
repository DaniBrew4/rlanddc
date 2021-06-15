<template>
  <div class="home">
    <!--<image-gallery :photos="photos" />-->
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>