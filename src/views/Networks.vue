<template>
  <div>
    <div class="networks-header">
      <div class="buttons">
        <Button @click="() => this.createModalVisible = true">Create Network</Button>
        <Button class="del-button">Delete Networks</Button>
      </div>
    </div>
    <br>
    <Table border :columns="columns" :data="tableValues"/>
    <modal-form
      :modal-visible="editModalVisible"
      :editable-values="editableValues"
      :title="'Edit Network'"
      :comfirm-text="'Save Changes'"
      @on-cancel="() => this.editModalVisible = false"
      @on-submit="hanldeSubmitEdit"
    />
    <modal-form-steps
      ref="formStep"
      :modal-visible="createModalVisible"
      :editable-val-list="editableValList"
      :title="'Create Network'"
      :comfirm-text="'Create'"
      @on-cancel="() => this.createModalVisible = false"
    />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ModalForm from '_c/modal-form'
  import {
    editableValues,
    networksCol,
    createNetworkValues
  } from '@/mock/response/networks'
  import { station } from '@/lib/util'
  import ModalFormSteps from '_c/modal-form-steps'

  export default {
    name: 'Networks',
    components: {
      ModalFormSteps,
      ModalForm
    },
    data () {
      return {
        editModalVisible: false,
        createModalVisible: false,
        networks: [],
        tableValues: [],
        editableValues: [],
        columns: networksCol,
        editableValList: createNetworkValues,
        editIndex: -1,
        loading: false,
        createSubnet: true
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
            name: item.name || `(${item.id.substring(0, 13)})`,
            subnets_associated: subnets,
            shared: item.shared ? 'Yes' : 'No',
            external: item['router:external'] ? 'Yes' : 'No',
            status: item.status === 'ACTIVE' ? 'Active' : 'Inactive',
            admin_state_up: item.admin_state_up ? 'UP' : 'DOWN',
            availability_zones: item.availability_zones
          }
        }))
      },
      handleClickEdit (index) {
        this.editableValues = editableValues(this.networks[index])
        this.editIndex = index
        this.editModalVisible = true
      },
      async hanldeSubmitEdit (network, cb) {
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
      station.$on('on-networks-edit-open', index => {
        this.handleClickEdit(index)
      })
      station.$on('on-networks-subnet-selected', () => {
        this.createSubnet = !this.createSubnet
        this.editableValList[1].disabled = !this.createSubnet
        this.editableValList[2].disabled = !this.createSubnet
        this.$refs.formStep.setInitValue()
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
