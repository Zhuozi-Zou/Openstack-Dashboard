<template>
  <Modal
    v-model="modalVisible"
    :mask-closable="false"
    :closable="false"
  >
    <p slot="header">{{ title }}</p>
    <Form ref="editForm" :model="valueList" :rules="rules">
      <FormItem
        v-for="(item, index) in editableValues"
        :prop="item.name"
        :label="item.label"
        label-position="right"
        :key="`${_uid}_${index}`"
        :error="errorStore[item.name]"
      >
        <component :is="item.type" v-model="valueList[item.name]">
          <template v-if="item.children">
            <component
              v-for="(child, i) in item.children.list"
              :is="item.children.type"
              :key="`${_uid}_${index}_${i}`"
              :value="child.value">{{ child.title }}
            </component>
          </template>
        </component>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="handleCancel">Cancel</Button>
      <Button type="primary" :loading="loading" @click="handleSubmit">{{ comfirmText }}</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'modal-form',
    data () {
      return {
        loading: false,
        rules: {},
        errorStore: {},
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
      editableValues: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      editableValues () {
        this.setInitValue()
      }
    },
    methods: {
      setInitValue () {
        const rules = {}
        const errorStore = {}
        const valueList = {}
        this.editableValues.forEach(item => {
          rules[item.name] = item.rule
          errorStore[item.name] = ''
          valueList[item.name] = item.value
        })
        this.rules = rules
        this.errorStore = errorStore
        this.valueList = valueList
      },
      handleCancel () {
        this.$emit('on-cancel')
      },
      handleSubmit () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$emit('on-submit', this.valueList, () => {
              this.loading = false
            })
          } else {
            //
          }
        })
      }
    }
    // mounted () {
    //   station.$on('on-modal-open', index => {
    //     this.$emit('on-modal-open', index)
    //     this.modalVisible = true
    //   })
    // }
  }
</script>

<style scoped>

</style>
