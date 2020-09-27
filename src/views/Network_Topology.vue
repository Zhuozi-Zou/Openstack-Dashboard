<template>
  <div>
    <g6-editor ref="editor" :topoData="topoData"></g6-editor>
  </div>
</template>

<script>
  import G6Editor from '_c/g6-editor'
  import { testData, topoDataRaw } from '@/mock/response/network_topology'
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
        rawTopoData: [],
        xOffset: 50,
        yOffset: 40
      }
    },
    watch: {
      rawTopoData () {
        const fakeRootTree = { children: this.rawTopoData, mod: 0 }
        calculateTreeXY(fakeRootTree)
        const nodes = []
        const edges = []
        this.initTopoData(fakeRootTree, nodes, edges, fakeRootTree.mod)
        edges.splice(0, 1)
        this.topoData = { nodes, edges }
        this.$nextTick(() => {
          this.autoFit()
        })
      }
    },
    methods: {
      initTopoData (parent, nodes, edges, modSum) {
        parent.children.forEach(item => {
          const iconWidth = topoIconSize.width
          const iconHeight = topoIconSize.height

          nodes.push({
            id: item.id,
            label: item.label,
            clazz: item.clazz,
            x: item.x * (this.xOffset + iconWidth) + iconWidth / 2 + 5,
            y: (item.y + modSum) * (this.yOffset + iconHeight) + iconHeight / 2 + 5
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
      autoFit () {
        const autoFit = this.$refs.editor.$refs.wfd.$refs.toolbar.$refs.autoFit
        autoFit.click()
      }
    },
    mounted () {
      this.rawTopoData = testData
      setTimeout(() => {
        this.rawTopoData = topoDataRaw
      }, 2000)
    }
  }
</script>

<style scoped>

</style>
