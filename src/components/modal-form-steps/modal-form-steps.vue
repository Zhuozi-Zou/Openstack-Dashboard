<template>
  <Modal
    v-model="modalVisible"
    :mask-closable="false"
    :closable="false"
    :title="title"
  >
    <Tabs :animated="false">
      <TabPane
        v-for="(item, index) in editableValList"
        :key="`${_uid}_${index}`"
        :label="item.label"
        :disabled="tabDisabledList[item.name]"
      >
        <form-editable
          :ref="`editForm_${index}`"
          :editable-values="valueList[item.name]"
          @on-submit-form="handleSubmit"
        />
      </TabPane>
    </Tabs>
    <div slot="footer">
      <Button @click="handleCancel">Cancel</Button>
      <Button type="primary" :loading="loading" @click="() => this.$refs.editForm.handleSubmit()">{{
          comfirmText
        }}
      </Button>
    </div>
  </Modal>
</template>

<script>
  import FormEditable from '_c/form-editable'

  export default {
    name: 'modal-form-steps',
    components: {
      FormEditable
    },
    data () {
      return {
        loading: false,
        tabDisabledList: {},
        valueList: {}
      }
    },
    props: {
      modalVisible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'Edit'
      },
      comfirmText: {
        type: String,
        default: 'Confirm'
      },
      editableValList: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      editableValList () {
        this.setInitValue()
      }
    },
    methods: {
      setInitValue () {
        const valueList = {}
        const tabDisabledList = {}
        this.editableValList.forEach(item => {
          valueList[item.name] = item.data
          tabDisabledList[item.name] = item.disabled
        })
        this.valueList = valueList
        this.tabDisabledList = tabDisabledList
      },
      handleCancel () {
        this.$emit('on-cancel')
      },
      handleSubmit (valueList) {
        // this.loading = true
        // this.$emit('on-submit', valueList, () => {
        //   this.loading = false
        // })
      }
    },
    mounted () {
      this.setInitValue()
    }
  }
</script>

<style scoped>

</style>
