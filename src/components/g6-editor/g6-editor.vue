<template>
  <div class="g6-editor-wrapper">
    <Button class="button"
            @click="() => { this.$refs['wfd'].graph.saveXML() }">
      导出XML
    </Button>
    <Button class="button"
            @click="() => { this.$refs['wfd'].graph.saveImg() }">
      导出图片
    </Button>
    <Button class="button" @click="() => { this.modalVisible = true }">
      查看流程图
    </Button>
    <wfd-vue ref="wfd" :data="demoData" :height="700" :users="candidateUsers" :groups="candidateGroups"
             :categories="categories" :lang="lang"/>
    <Modal title="查看流程图" v-model="modalVisible" width="60%">
      <div v-if="modalVisible">
        <wfd-vue ref="wfd" :data="demoData1" :height="300" isView />
      </div>
    </Modal>
  </div>
</template>

<script>
  import WfdVue from '_c/wfd'
  import {
    candidateGroups,
    candidateUsers,
    categories,
    demoData1Edges,
    demoData1Nodes,
    demoDataEdges,
    demoDataNodes
  } from '@/mock/response/g6-editor'

  export default {
    name: 'g6-editor',
    components: {
      WfdVue
    },
    data () {
      return {
        modalVisible: false,
        lang: 'zh',
        demoData: {
          nodes: demoDataNodes,
          edges: demoDataEdges
        },
        demoData1: {
          nodes: demoData1Nodes,
          edges: demoData1Edges
        },
        candidateUsers,
        candidateGroups,
        categories
      }
    }
  }
</script>

<style lang="less">
  .g6-editor-wrapper {
    .button {
      float: right;
      margin-top: 8px;
      margin-right: 6px;
    }
  }
</style>
