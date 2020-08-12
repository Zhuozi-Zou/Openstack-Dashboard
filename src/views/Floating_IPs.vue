<template>
  <div>
    <div class="floatingIps-header">
      <div class="buttons">
        <Button @click="handleClickAllocate">Allocate IP To Project</Button>
        <Button type="error" class="release-button" :disabled="releaseButtonDisabled" @click="handleClickRelease">Release Floating IPs</Button>
      </div>
    </div>
    <br>
    <Table border :columns="columns" :data="tableValues" @on-selection-change="s => this.selection = s" no-data-text="No data"/>
    <modal-form
      :modal-visible="formModalVisible"
      :editable-values="formValues"
      :title="formModalTitle"
      :comfirm-text="formModalConfirmText"
      @on-cancel="() => this.formModalVisible = false"
      @on-modal-form-submit="hanldeSubmitForm"
    />
    <Modal v-model="confirmModalVisible" :title="confirmModalTitle">
      {{ confirmModalText }}
      <div slot="footer">
        <Button @click="() => this.confirmModalVisible = false">Cancel</Button>
<!--        <Button type="error" :loading="deleteLoading" @click="handleDeleteNetworks">Delete Networks</Button>-->
      </div>
    </Modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { floatingIpsCol, confirmModalTexts, allocateValues } from '@/mock/response/floating_ips'
  import bus from '@/lib/bus'
  import { joinSelections } from '@/lib/util'
  import ModalForm from '_c/modal-form'

  const log = console.log

  export default {
    name: 'Floating_IPs',
    components: {
      ModalForm
    },
    data () {
      return {
        confirmModalVisible: false,
        confirmModalTitle: 'Confirm',
        confirmModalText: 'Please confirm your selection.',
        formModalVisible: false,
        formModalTitle: '',
        formModalConfirmText: 'Confirm',
        formModalType: '',
        columns: floatingIpsCol,
        floatingIps: [],
        tableValues: [],
        formValues: [],
        editIndex: -1,
        selection: []
      }
    },
    computed: {
      releaseButtonDisabled () {
        return !this.selection.length > 0
      }
    },
    methods: {
      ...mapActions([
        'getNetworkById',
        'getInstanceById',
        'getFloatingIps',
        'getFloatingIpPools'
      ]),
      async formTableValues () {
        this.tableValues = await Promise.all(this.floatingIps.map(async item => {
          try {
            const floatingNetwork = await this.getNetworkById(item.floating_network_id)
            const portDetails = item.port_details
            let deviceName = '-'
            if (portDetails) {
              const instance = await this.getInstanceById(portDetails.device_id)
              deviceName = `${instance.name} ${Object.values(instance.addresses)[0][0].addr}`
            }
            return {
              id: item.id,
              floating_ip_address: item.floating_ip_address,
              description: item.description,
              mapped_fixed_ip_address: deviceName,
              pool: floatingNetwork.name,
              status: item.status === 'ACTIVE' ? 'Active' : 'Down'
            }
          } catch (e) {
            log(e)
          }
        }))
      },
      setConfirmModal (title, text) {
        this.confirmModalTitle = title
        this.confirmModalText = text
        this.confirmModalVisible = true
      },
      setFormModal (title, confirmText) {
        this.formModalTitle = title
        this.formModalConfirmText = confirmText
        this.formModalVisible = true
      },
      handleClickDisassociate (index) {
        const selected = `"${this.tableValues[index].floating_ip_address}"`
        const { title, text } = confirmModalTexts(selected).disassociate
        this.setConfirmModal(title, text)
      },
      handleClickAssociate (index) {
        //
      },
      async handleClickAllocate () {
        const pools = await this.getFloatingIpPools()
        const poolsDetail = await Promise.all(pools.map(async item => {
          const net = await this.getNetworkById(item.network_id)
          return {
            value: net.id,
            title: net.name
          }
        }))
        this.formValues = allocateValues(poolsDetail)
        this.setFormModal('Allocate Floating IP', 'Allocate IP')
      },
      handleClickRelease () {
        const selectedIpNames = joinSelections(this.selection, 'floating_ip_address')
        const { title, text } = confirmModalTexts(selectedIpNames).release
        this.setConfirmModal(title, text)
      },
      hanldeSubmitForm () {
        //
      }
    },
    async mounted () {
      try {
        this.floatingIps = await this.getFloatingIps()
        await this.formTableValues()
        bus.$on('on-floatingIps-disassociate-open', index => {
          this.handleClickDisassociate(index)
        })
        bus.$on('on-floatingIps-associate-open', index => {
          this.handleClickAssociate(index)
        })
      } catch (e) {
        log(e)
      }
    },
    destroyed () {
      bus.$off('on-floatingIps-disassociate-open')
      bus.$off('on-floatingIps-associate-open')
    }
  }
</script>

<style lang="less">
  .floatingIps-header {
    .buttons {
      .release-button {
        margin-left: 5px;
      }
    }
  }
</style>
