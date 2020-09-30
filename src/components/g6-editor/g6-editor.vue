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
<!--    <Button class="button" @click="() => { this.modalVisible = true }">-->
<!--      查看流程图-->
<!--    </Button>-->
    <wfd-vue ref="wfd" :data="topoData" :lang="lang" :read-only="true"/>
<!--    <Modal title="查看流程图" v-model="modalVisible" width="60%">-->
<!--      <div v-if="modalVisible">-->
<!--        <wfd-vue ref="wfd" :data="topoData" :height="300" isView />-->
<!--      </div>-->
<!--    </Modal>-->
  </div>
</template>

<script>
  import WfdVue from '_c/wfd'

  export default {
    name: 'g6-editor',
    components: {
      WfdVue
    },
    data () {
      return {
        modalVisible: false,
        lang: 'zh'
      }
    },
    props: {
      topoData: {
        type: Object,
        default: () => ({
          nodes: [],
          edges: []
        })
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
