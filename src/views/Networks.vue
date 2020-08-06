<template>
  <div>
    <div class="networks-header">
      <div class="buttons">
        <Button @click="handleClickCreate">Create Network</Button>
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
      @on-modal-form-submit="hanldeSubmitEdit"
    />
    <modal-form-steps
      ref="formStep"
      :modal-visible="createModalVisible"
      :editable-val-list="editableValList"
      :title="'Create Network'"
      :comfirm-text="'Create'"
      @on-cancel="() => this.createModalVisible = false"
      @on-modal-form-steps-submit="hanldeSubmitEditSteps"
    />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import clonedeep from 'clonedeep'
  import ModalForm from '_c/modal-form'
  import { createNetworkValues, editableValues, networksCol, newNetworkValues } from '@/mock/response/networks'
  import { station } from '@/lib/util'
  import { objDelReturn, objRemoveEmptyVal } from '@/lib/tools'
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
        'updateNetworkById',
        'createNetworkWithSubnet',
        'createNetwork'
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
      handleClickCreate () {
        this.createSubnet = true
        this.editableValList[1].disabled = false
        this.editableValList[2].disabled = false
        this.createModalVisible = true
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
      },
      async hanldeSubmitEditSteps (filledValues, cb) {
        const valueList = clonedeep(filledValues)
        const network = {}
        newNetworkValues.forEach(item => {
          network[item.name] = objDelReturn(valueList, item.name)
        })
        network.name = objDelReturn(network, 'net_name')

        if (objDelReturn(network, 'create_subnet')) {
          objRemoveEmptyVal(valueList)

          if (!('allocation_pools' in valueList)) {
            await this.createNetwork(network)
          } else {
            valueList.allocation_pools = valueList.allocation_pools.split('\n').map(item => {
              const [start, end] = item.split(',')
              return {
                start,
                end
              }
            })
          }
          if ('dns_nameservers' in valueList) valueList.dns_nameservers = valueList.dns_nameservers.split('\n')
          if ('host_routes' in valueList) {
            valueList.host_routes = valueList.host_routes.split('\n').map(item => {
              const [destination, nexthop] = item.split(',')
              return {
                destination,
                nexthop
              }
            })
          }

          await this.createNetworkWithSubnet({
            network,
            subnet: valueList
          })
        }

        this.networks = await this.getNetworks()
        await this.formTableValues()
        this.createModalVisible = false
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
