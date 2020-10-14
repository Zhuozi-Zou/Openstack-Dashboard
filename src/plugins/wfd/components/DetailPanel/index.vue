<template>
  <div class="detailPanel">
    <DetailPanel v-if="['phy', 'router', 'network', 'subnet', 'instance', 'security'].includes(model.clazz)"
                 :model="model" :onChange="onChange" :readOnly="readOnly"/>
    <!--    <FlowDetail v-else-if="model.clazz === 'flow'" :model="model" :onChange="onChange" :readOnly="readOnly"/>-->
    <!--    <ProcessDetail v-else-if="model.clazz === 'process'" :model="model" :onChange="onChange" :readOnly="readOnly"-->
    <!--                   :categories="categories"/>-->
  </div>
</template>

<script>
  // import ProcessDetail from './ProcessDetail'
  import DetailPanel from './GeneralizedDetail'

  export default {
    inject: ['i18n'],
    components: {
      // ProcessDetail,
      DetailPanel
    },
    props: {
      model: {
        type: Object,
        default: () => ({})
      },
      users: {
        type: Array,
        default: () => ([])
      },
      groups: {
        type: Array,
        default: () => ([])
      },
      categories: {
        type: Array,
        default: () => ([])
      },
      signalDefs: {
        type: Array,
        default: () => ([])
      },
      messageDefs: {
        type: Array,
        default: () => ([])
      },
      onChange: {
        type: Function,
        default: () => {
        }
      },
      readOnly: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style lang="scss">
  .detailPanel {
    background: #f0f2f5;
    flex: 0 0 auto;
    float: right;
    width: 20%;
    border-right: 1px solid #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
    overflow-y: auto;

    .panelTitle {
      text-align: left;
      height: 32px;
      padding-left: 12px;
      color: #000;
      line-height: 28px;
      background: #EBEEF2;
      border-bottom: 1px solid #DCE3E8;
    }

    .panelBody {
      .panelRow {
        text-align: left;
        display: inline-block;
        font-size: 12px;
        width: 100%;
        padding: 5px 12px;
      }
    }
  }
</style>
