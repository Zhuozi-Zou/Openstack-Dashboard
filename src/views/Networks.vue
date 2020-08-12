<template>
  <div>
    <div class="networks-header">
      <div class="buttons">
        <Button @click="handleClickCreate">Create Network</Button>
        <Button type="error" class="del-button" :disabled="deleteButtonDisabled" @click="handleClickDeleteNetworks">Delete Networks</Button>
      </div>
    </div>
    <br>
    <Table border :columns="columns" :data="tableValues" @on-selection-change="s => this.selection = s" no-data-text="No data"/>
    <modal-form
      :modal-visible="editModalVisible"
      :editable-values="editableValues"
      title="Edit Network"
      comfirm-text="Save Changes"
      @on-cancel="() => this.editModalVisible = false"
      @on-modal-form-submit="hanldeSubmitEdit"
    />
    <modal-form-steps
      ref="formStep"
      :modal-visible="createModalVisible"
      :editable-val-list="editableValList"
      title="Create Network"
      comfirm-text="Create"
      @on-cancel="() => this.createModalVisible = false"
      @on-modal-form-steps-submit="hanldeSubmitEditSteps"
    />
    <Modal v-model="deleteModalVisible" title="Comfirm Delete Networks">
      {{ `You have selected: ${selectedNetNames}. Please confirm your selection. This action cannot be undone.` }}
      <div slot="footer">
        <Button @click="() => this.deleteModalVisible = false">Cancel</Button>
        <Button type="error" :loading="deleteLoading" @click="handleDeleteNetworks">Delete Networks</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import clonedeep from 'clonedeep'
  import ModalForm from '_c/modal-form'
  import { createNetworkValues, editableValues, networksCol, newNetworkValues } from '@/mock/response/networks'
  import bus from '@/lib/bus'
  import { joinSelections } from '@/lib/util'
  import { objDelReturn, objRemoveEmptyVal } from '@/lib/tools'
  import ModalFormSteps from '_c/modal-form-steps'

  const log = console.log

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
        deleteModalVisible: false,
        networks: [],
        tableValues: [],
        editableValues: [],
        columns: networksCol,
        editableValList: createNetworkValues,
        editIndex: -1,
        loading: false,
        selection: [],
        deleteLoading: false,
        selectedNetNames: ''
      }
    },
    computed: {
      deleteButtonDisabled () {
        return !this.selection.length > 0
      }
    },
    methods: {
      ...mapActions([
        'getNetworks',
        'getSubnetById',
        'updateNetworkById',
        'createNetworkWithSubnet',
        'createNetwork',
        'deleteNetworks'
      ]),
      async refreshData () {
        try {
          this.networks = await this.getNetworks()
          await this.formTableValues()
        } catch (e) {
          log(e)
        }
      },
      async handleDeleteNetworks () {
        this.deleteLoading = true
        try {
          await this.deleteNetworks(this.selection)
          await this.refreshData()
          this.selection = []
          this.deleteLoading = false
          this.deleteModalVisible = false
        } catch (e) {
          log(e)
        }
      },
      handleClickDeleteNetworks () {
        this.selectedNetNames = joinSelections(this.selection, 'name')
        this.deleteModalVisible = true
      },
      async formTableValues () {
        this.tableValues = await Promise.all(this.networks.map(async item => {
          const subnets = await Promise.all(item.subnets.map(async id => {
            try {
              const subnet = await this.getSubnetById(id)
              return `${subnet.name} ${subnet.cidr}`
            } catch (e) {
              log(e)
            }
          }))

          return {
            id: item.id,
            name: item.name || `(${item.id.substring(0, 13)})`,
            subnets_associated: subnets,
            shared: item.shared ? 'Yes' : 'No',
            external: item['router:external'] ? 'Yes' : 'No',
            status: item.status === 'ACTIVE' ? 'Active' : 'Down',
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
      handleClickCreate () {
        this.editableValList[1].disabled = false
        this.editableValList[2].disabled = false
        this.$refs.formStep.resetForm()
        this.createModalVisible = true
      },
      async hanldeSubmitEdit (network, cb) {
        const data = {
          id: this.networks[this.editIndex].id,
          network
        }
        if (this.editIndex !== -1) {
          try {
            this.networks[this.editIndex] = await this.updateNetworkById(data)
            await this.formTableValues()
          } catch (e) {
            log(e)
          }
        }
        this.editIndex = -1
        this.editModalVisible = false
        cb()
      },
      async hanldeSubmitEditSteps (filledValues, cb) {
        const valueList = clonedeep(filledValues)
        const network = {}
        newNetworkValues.forEach(item => {
          network[item.name] = objDelReturn(valueList, item.name)
        })
        network.name = objDelReturn(network, 'net_name')

        try {
          if (!objDelReturn(network, 'create_subnet')) {
            await this.createNetwork(network)
          } else {
            objRemoveEmptyVal(valueList)
            if ('allocation_pools' in valueList) {
              valueList.allocation_pools = valueList.allocation_pools.split('\n').map(item => {
                const [start, end] = item.split(',')
                return { start, end }
              })
            }
            if ('dns_nameservers' in valueList) valueList.dns_nameservers = valueList.dns_nameservers.split('\n')
            if ('host_routes' in valueList) {
              valueList.host_routes = valueList.host_routes.split('\n').map(item => {
                const [destination, nexthop] = item.split(',')
                return { destination, nexthop }
              })
            }
            await this.createNetworkWithSubnet({ network, subnet: valueList })
          }

          await this.refreshData()
          this.createModalVisible = false
          cb()
        } catch (e) {
          log(e)
        }
      }
    },
    async mounted () {
      try {
        await this.refreshData()
        bus.$on('on-networks-edit-open', index => {
          this.handleClickEdit(index)
        })
        bus.$on('on-networks-subnet-selected', () => {
          this.editableValList[1].disabled = !this.editableValList[1].disabled
          this.editableValList[2].disabled = !this.editableValList[2].disabled
        })
      } catch (e) {
        log(e)
      }
    },
    destroyed () {
      bus.$off('on-networks-edit-open')
      bus.$off('on-networks-subnet-selected')
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
