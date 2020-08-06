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
        :disabled="item.disabled"
      >
        <form-editable
          :ref="item.name"
          :editable-values="valueList[item.name]"
          @on-submit-form="handleSubmit"
          @on-submit-form-invalid="handleSubmitInvalid"
        />
      </TabPane>
    </Tabs>
    <div slot="footer">
      <Button @click="handleCancel">Cancel</Button>
      <Button type="primary" :loading="loading" @click="handleClickSubmit">{{ comfirmText }}
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
        valueList: {},
        filledValues: {},
        remainFormToCheck: 0
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
        this.editableValList.forEach(item => {
          valueList[item.name] = item.data
        })
        this.valueList = valueList
      },
      resetForm () {
        this.editableValList.forEach(item => {
          this.$refs[item.name][0].handleReset()
        })
      },
      handleCancel () {
        this.$emit('on-cancel')
      },
      handleSubmit (valueList) {
        if (this.remainFormToCheck !== -10) {
          Object.assign(this.filledValues, valueList)
          --this.remainFormToCheck

          if (this.remainFormToCheck === 0) {
            this.loading = true
            this.$emit('on-modal-form-steps-submit', this.filledValues, () => {
              this.loading = false
              this.resetForm()
            })
          }
        }
      },
      handleSubmitInvalid () {
        this.$Message.error('Info filled not valid')
        this.remainFormToCheck = -10
      },
      handleClickSubmit () {
        this.remainFormToCheck = 0
        this.filledValues = {}
        this.editableValList.forEach(item => {
          if (!item.disabled) ++this.remainFormToCheck
        })
        this.editableValList.forEach(item => {
          if (!item.disabled) {
            this.$refs[item.name][0].handleSubmit()
          }
        })
      }
    },
    mounted () {
      this.setInitValue()
    }
  }
</script>

<style scoped>

</style>
