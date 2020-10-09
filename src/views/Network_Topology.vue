<template>
  <div>
    <g6-editor ref="editor" :topoData="topoData"></g6-editor>
  </div>
</template>

<script>
  import G6Editor from '_c/g6-editor'
  import { mapActions } from 'vuex'
  import { topoDataRaw } from '@/mock/response/network_topology'
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
        xOffset: 70,
        yOffset: 40
      }
    },
    watch: {
      rawTopoData () {
        const fakeRootTree = {
          data: {
            id: '',
            name: ''
          },
          children: this.rawTopoData,
          mod: 0
        }
        calculateTreeXY(fakeRootTree)
        const nodes = []
        const edges = []
        this.initTopoData(fakeRootTree, nodes, edges, fakeRootTree.mod)
        edges.splice(0, 1)
        this.topoData = {
          nodes,
          edges
        }
        this.$nextTick(() => {
          this.autoFit()
        })
      }
    },
    methods: {
      ...mapActions([
        'getRouters',
        'getNetworkById',
        'listPorts'
      ]),
      initTopoData (parent, nodes, edges, modSum) {
        parent.children.forEach(item => {
          const iconWidth = topoIconSize.width
          const iconHeight = topoIconSize.height

          nodes.push({
            id: item.data.id,
            label: item.data.name,
            clazz: item.clazz,
            data: item.data,
            x: item.x * (this.xOffset + iconWidth) + iconWidth / 2 + 5,
            y: (item.y + modSum) * (this.yOffset + iconHeight) + iconHeight / 2 + 5
          })

          edges.push({
            source: parent.data.id,
            target: item.data.id,
            sourceAnchor: 1,
            targetAnchor: 3,
            clazz: 'flow'
          })

          this.initTopoData(item, nodes, edges, modSum + item.mod)
        })
      },
      autoFit () { // 必须在mounted后使用
        const autoFit = this.$refs.editor.$refs.wfd.$refs.toolbar.$refs.autoFit
        autoFit.click()
      },
      async getTopoData (externalNetId) {
        try {
          const externalNet = await this.getNetworkById(externalNetId)
          const routers = (await this.getRouters()).filter(router => router.external_gateway_info.network_id === externalNetId)
          const routersTopo = await Promise.all(routers.map(async router => {
            const ports = (await this.listPorts({ device_id: router.id })).filter(port => port.network_id !== externalNetId)
            console.log(ports)
            return {
              clazz: 'router',
              data: router,
              children: []
            }
          }))
          console.log(routersTopo)
          const rawTopoData = [{
            clazz: 'phy',
            data: externalNet,
            children: routersTopo
          }]
          console.log(rawTopoData)
          this.rawTopoData = rawTopoData
        } catch (e) {
          console.log(e)
        }
      }
    },
    async mounted () {
      // this.rawTopoData = topoDataRaw
      try {
        await this.getTopoData('2b178d2b-a3a6-4a7e-b12a-9dd22eb9b17e')
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped>

</style>
