<template>
  <div>
    <Table border :columns="columns" :data="value"/>
    <div class="edit">
      <Modal
        ref="edit"
        v-model="modalVisible"
        title="Edit"
        @on-ok="submit"
        okText="Save Changes"
        cancel-text="Cancel"
        :mask-closable="false"
      >
        <Form ref="editForm">
          <FormItem
            v-for="(item, index) in editableValues"
            :label="item.label"
            label-position="right"
            :key="`${_uid}_${index}`"
          >
            <component :is="item.type" v-model="editableValues[index].value" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  import { station } from '@/lib/util'

  export default {
    name: 'table-editable',
    data () {
      return {
        modalVisible: false
      }
    },
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      rawData: {
        type: Array,
        default: () => []
      },
      value: {
        type: Array,
        default: () => []
      },
      editableValues: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      submit () {
        this.$Message.info('点击了确定')
      }
    },
    mounted () {
      station.$on('on-click-edit', index => {
        this.$emit('on-click-edit', index)
        this.modalVisible = true
      })
    }
  }
</script>

<style scoped>

</style>
