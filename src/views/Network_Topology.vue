<template>
  <div>
    <div id="mountNode"></div>
  </div>
</template>

<script>
  import { demo } from '_c/antv-g6'

  export default {
    name: 'network_topology',
    mounted () {
      demo()
    }
  }
</script>

<style scoped>

</style>
