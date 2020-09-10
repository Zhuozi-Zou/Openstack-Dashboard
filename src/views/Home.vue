<template>
  <div class="home">
    <img alt="Logo" src="@/assets/img/logo.jpg" class="image" />
    <h1>Welcome to Fillis's OpenStack world!</h1>
    <br>
    <h2>Have fun and enjoy it~</h2>
  </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style lang="less">
  .home {
    text-align: center;

    .image {
      border-radius: 50%;
      margin-top: 50px;
      margin-bottom: 50px;
    }
  }
</style>
