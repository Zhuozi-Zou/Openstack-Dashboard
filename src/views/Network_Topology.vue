<template>
  <div>
    <g6-editor :topoData="topoData"></g6-editor>
  </div>
</template>

<script>
  import G6Editor from '_c/g6-editor'
  import {
    demoDataEdges,
    demoDataNodes
  } from '@/mock/response/g6-editor'
  import { topoDataRaw } from '@/mock/response/network_topology'

  export default {
    name: 'network_topology',
    components: {
      G6Editor
    },
    data () {
      return {
        topoData: {
          nodes: demoDataNodes,
          edges: demoDataEdges
        }
      }
    },
    methods: {

    },
    created () {
    }
  }
</script>

<style scoped>

</style>
