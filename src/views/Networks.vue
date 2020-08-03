<template>
  <div>
    <div class="networks-header">
      <div class="buttons">
        <Button>Create Network</Button>
        <Button class="del-button">Delete Networks</Button>
      </div>
    </div>
    <br>
    <Table border :columns="columns" :data="tableValues"/>
    <modal-form
      :modalVisible="editModalVisible"
      :editableValues="editableValues"
      :title="'Edit Network'"
      :comfirmText="'Save Changes'"
      @on-modal-open="handleClickEdit"
      @on-cancel="handleCancel"
      @on-submit="hanldeSubmit"
    />
    <modal-form
      :title="'Create Network'"
    />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ModalForm from '_c/modal-form'
  import { editableValues, networksCol } from '@/mock/response/networks'
  import { station } from '@/lib/util'

  export default {
    name: 'Networks',
    components: {
      ModalForm
    },
    data () {
      return {
        editModalVisible: false,
        networks: [],
        tableValues: [],
        editableValues: [],
        columns: networksCol,
        editIndex: -1
      }
    },
    methods: {
      ...mapActions([
        'getNetworks',
        'getSubnetById',
        'updateNetworkById'
      ]),
      async formTableValues () {
        this.tableValues = await Promise.all(this.networks.map(async item => {
          const subnets = await Promise.all(item.subnets.map(async id => {
            const subnet = await this.getSubnetById(id)
            return `${subnet.name} ${subnet.cidr}`
          }))

          return {
            name: item.name,
            subnets_associated: subnets,
            shared: `${item.shared ? 'Yes' : 'No'}`,
            external: `${item['router:external'] ? 'Yes' : 'No'}`,
            status: `${item.status === 'ACTIVE' ? 'Active' : 'Inactive'}`,
            admin_state_up: `${item.admin_state_up ? 'UP' : 'DOWN'}`,
            availability_zones: item.availability_zones
          }
        }))
      },
      handleClickEdit (index) {
        this.editableValues = editableValues(this.networks[index])
        this.editIndex = index
        this.editModalVisible = true
      },
      handleCancel () {
        this.editModalVisible = false
      },
      async hanldeSubmit (network, cb) {
        const data = {
          id: this.networks[this.editIndex].id,
          network
        }
        if (this.editIndex !== -1) {
          this.networks[this.editIndex] = await this.updateNetworkById(data)
          await this.formTableValues()
        }
        this.editIndex = -1
        this.editModalVisible = false
        cb()
      }
    },
    async mounted () {
      this.networks = await this.getNetworks()
      await this.formTableValues()
      station.$on('on-modal-edit-open', index => {
        this.handleClickEdit(index)
      })
    }
  }
</script>

<style lang="less">
  .networks-header {
    .buttons {
      .del-button {
        margin-left: 5px;
      }
    }
  }
</style>
