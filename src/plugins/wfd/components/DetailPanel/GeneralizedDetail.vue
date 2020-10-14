<template>
  <div :data-clazz="model.clazz">
    <div class="panelTitle">{{ i18n[model.clazz] }}</div>
    <div class="panelBody">
      <div v-for="(item, index) in model.topoData" class="panelRow" :key="`${_uid}_${index}`">
        <div>{{ i18n[`${model.clazz}.${item.name}`] }}：</div>
        <component
          :is="item.type"
          :type="item.subType"
          :autosize="item.autosize || false"
          :readonly="item.readOnly"
          v-model="item.value"
          :style="item.style"
        >
          <div v-if="item.children">
            <component
              v-for="(child, i) in item.children.list"
              :is="item.children.type"
              :key="`${_uid}_${index}_${i}`"
              :readonly="child.readOnly"
              @click="handleClick(item.children.type)"
              :value="(item.children.type === 'i-input' ? `${i18n[`${model.clazz}.${child.name}`]}: ` : '') + child.value"
            >
              {{ child.title || (child.label && i18n[`${model.clazz}.${child.label}`])}}
            </component>
          </div>
        </component>
      </div>
    </div>
    <Modal v-model="modalVisible" :title="modalTitle" width="80%">
      <Table border :columns="columns" :data="tableValues" no-data-text="No data"/>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'DetailPanel',
    inject: ['i18n'],
    data () {
      return {
        modalVisible: false,
        modalTitle: 'Modal',
        columns: [],
        tableValues: []
      }
    },
    props: {
      model: {
        type: Object,
        default: () => ({})
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
    },
    methods: {
      handleClick (type) {
        if (type === 'i-button') {
          this.modalVisible = true
          this.modalTitle = this.i18n[`${this.model.clazz}.${this.model.modalData.titleClazz}`]
          this.columns = this.model.modalData.columns
          this.tableValues = this.model.modalData.tableValues
        }
      }
    }
  }
</script>

<style lang="less">

</style>
