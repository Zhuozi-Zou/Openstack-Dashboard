<template>
  <Modal
    v-model="modalVisible"
    :mask-closable="false"
    :closable="false"
    :title="title"
  >
    <form-editable ref="editForm" :editable-values="editableValues" @on-submit-form="handleSubmit" />
    <div slot="footer">
      <Button @click="handleCancel">Cancel</Button>
      <Button type="primary" :loading="loading" @click="() => this.$refs.editForm.handleSubmit()">{{ comfirmText }}</Button>
    </div>
  </Modal>
</template>

<script>
  import FormEditable from '_c/form-editable'

  export default {
    name: 'modal-form',
    components: {
      FormEditable
    },
    data () {
      return {
        loading: false
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
    methods: {
      handleCancel () {
        this.$emit('on-cancel')
      },
      handleSubmit (valueList) {
        this.loading = true
        this.$emit('on-modal-form-submit', valueList, () => {
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
