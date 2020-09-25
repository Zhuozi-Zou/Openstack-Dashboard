<template>
  <div>
    <g6-editor ref="editor" :topoData="topoData"></g6-editor>
  </div>
</template>

<script>
  import G6Editor from '_c/g6-editor'
  import { testData } from '@/mock/response/network_topology'
  import { calculateTreeXY } from '@/lib/tree_drawing'
  import { topoIconSize } from '@/config'

  export default {
    name: 'network_topology',
    components: {
      G6Editor
    },
    data () {
      return {
        topoData: {
          nodes: [],
          edges: []
        },
        xOffset: 30,
        yOffset: 30
      }
    },
    methods: {
      initTopoData (parent, nodes, edges, modSum) {
        parent.children.forEach(item => {
          const iconSize = topoIconSize[item.clazz]
          const halfIconSize = (iconSize / 2)

          nodes.push({
            id: item.id,
            label: item.label,
            clazz: item.clazz,
            x: item.x * (this.xOffset + iconSize) + halfIconSize,
            y: (item.y + modSum) * (this.yOffset + iconSize) + halfIconSize
          })

          edges.push({
            source: parent.id,
            target: item.id,
            sourceAnchor: 1,
            targetAnchor: 3,
            clazz: 'flow'
          })

          this.initTopoData(item, nodes, edges, modSum + item.mod)
        })
      },
      setNodeCoordinates () {
        const fakeRootTree = { children: testData, mod: 0 }
        calculateTreeXY(fakeRootTree)

        const nodes = []
        const edges = []
        this.initTopoData(fakeRootTree, nodes, edges, fakeRootTree.mod)
        edges.splice(0, 1)
        this.topoData = { nodes, edges }
      }
    },
    created () {
      this.setNodeCoordinates()
    },
    mounted () {
      const autoFit = this.$refs.editor.$refs.wfd.$refs.toolbar.$refs.autoFit
      autoFit.click()
    }
  }
</script>

<style scoped>

</style>
