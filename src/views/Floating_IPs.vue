<template>
  <div>
    <div class="floatingIps-header">
      <div class="buttons">
        <Button @click="handleClickAllocate">Allocate IP To Project</Button>
        <Button type="error" class="release-button" :disabled="releaseButtonDisabled" @click="handleClickRelease">
          Release Floating IPs
        </Button>
      </div>
    </div>
    <br>
    <Table border :columns="columns" :data="tableValues" @on-selection-change="s => this.selection = s"
           no-data-text="No data"/>
    <modal-form
      :modal-visible="formModalVisible"
      :editable-values="formValues"
      :title="formModalTitle"
      :comfirm-text="formModalConfirmText"
      @on-cancel="() => this.formModalVisible = false"
      @on-modal-form-submit="hanldeSubmitForm"
    />
    <Modal v-model="confirmModalVisible" :title="confirmModalTitle" :mask-closable="false">
      {{ confirmModalText }}
      <div slot="footer">
        <Button @click="() => this.confirmModalVisible = false">Cancel</Button>
        <Button type="error" :loading="comfirmLoading" @click="handleConfirm">{{ confirmModalConfirmText }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { allocateValues, associateValues, confirmModalTexts, floatingIpsCol } from '@/mock/response/floating_ips'
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
        comfirmLoading: false,
        confirmModalVisible: false,
        confirmModalTitle: 'Confirm',
        confirmModalText: 'Please confirm your selection.',
        confirmModalConfirmText: 'Confirm',
        confirmModalType: '',
        formModalVisible: false,
        formModalTitle: '',
        formModalConfirmText: 'Confirm',
        formModalType: '',
        columns: floatingIpsCol,
        floatingIps: [],
        tableValues: [],
        formValues: [],
        editIndex: -1,
        selection: [],
        selectedRow: -1
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
        'getFloatingIpById',
        'getFloatingIpPools',
        'createFloatingIp',
        'getFloatingIpPorts',
        'deleteFloatingIps',
        'disassociateFloatingIp',
        'associateFloatingIp'
      ]),
      async refreshData () {
        try {
          this.floatingIps = await this.getFloatingIps()
          await this.formTableValues()
        } catch (e) {
          log(e)
        }
      },
      async formTableValues () {
        this.tableValues = await Promise.all(this.floatingIps.map(async item => {
          try {
            const floatingNetworkPro = this.getNetworkById(item.floating_network_id)
            const portDetails = item.port_details
            let deviceName = '-'
            if (portDetails) {
              const instancePro = this.getInstanceById(portDetails.device_id)
              const instance = await instancePro
              deviceName = `${instance.name} ${Object.values(instance.addresses)[0][0].addr}`
            }
            return {
              id: item.id,
              floating_ip_address: item.floating_ip_address,
              description: item.description,
              mapped_fixed_ip_address: deviceName,
              pool: (await floatingNetworkPro).name,
              status: item.status === 'ACTIVE' ? 'Active' : 'Down'
            }
          } catch (e) {
            log(e)
          }
        }))
      },
      setConfirmModal (title, text, confirmText, type) {
        this.confirmModalTitle = title
        this.confirmModalText = text
        this.confirmModalConfirmText = confirmText
        this.confirmModalType = type
        this.confirmModalVisible = true
      },
      setFormModal (title, confirmText, type) {
        this.formModalTitle = title
        this.formModalConfirmText = confirmText
        this.formModalType = type
        this.formModalVisible = true
      },
      handleClickDisassociate (row) {
        const selected = `"${row.floating_ip_address}"`
        const { title, text, confirmText, type } = confirmModalTexts(selected).disassociate
        this.selectedRow = row
        this.setConfirmModal(title, text, confirmText, type)
      },
      async handleDisassociate () {
        this.comfirmLoading = true
        try {
          await this.disassociateFloatingIp(this.selectedRow.id)
          setTimeout(async () => {
            let ip = {}
            const int = setInterval(async () => {
              ip = await this.getFloatingIpById(this.selectedRow.id)
              if (ip.status !== 'ACTIVE') {
                clearInterval(int)
                await this.refreshData()
                this.comfirmLoading = false
                this.confirmModalVisible = false
              }
            }, 1000)
          }, 5000)
        } catch (e) {
          log(e)
        }
      },
      handleClickRelease () {
        const selectedIpNames = joinSelections(this.selection, 'floating_ip_address')
        const { title, text, confirmText, type } = confirmModalTexts(selectedIpNames).release
        this.setConfirmModal(title, text, confirmText, type)
      },
      async handleRelease () {
        this.comfirmLoading = true
        try {
          await this.deleteFloatingIps(this.selection)
          await this.refreshData()
          this.selection = []
          this.comfirmLoading = false
          this.confirmModalVisible = false
        } catch (e) {
          log(e)
        }
      },
      async handleClickAssociate (row) {
        try {
          const ports = await this.getFloatingIpPorts()
          const portsDetails = await Promise.all(ports.map(async item => {
            const instance = await this.getInstanceById(item.device_id)
            return {
              value: item.id,
              title: `${instance.name}: ${item.fixed_ips[0].ip_address}`
            }
          }))
          this.formValues = associateValues(portsDetails)
          this.selectedRow = row
          this.setFormModal('Manage Floating IP Associations', 'Associate', 'associate')
        } catch (e) {
          log(e)
        }
      },
      async handleAssociate (port, cb) {
        try {
          await this.associateFloatingIp({
            ipId: this.selectedRow.id,
            portId: port.port_id
          })

          setTimeout(async () => {
            let ip = {}
            const int = setInterval(async () => {
              ip = await this.getFloatingIpById(this.selectedRow.id)
              if (ip.status !== 'DOWN') {
                clearInterval(int)
                await this.refreshData()
                this.formModalVisible = false
                cb()
              }
            }, 1000)
          }, 5000)
        } catch (e) {
          log(e)
        }
      },
      async handleClickAllocate () {
        try {
          const pools = await this.getFloatingIpPools()
          const poolsDetail = await Promise.all(pools.map(async item => {
            const net = await this.getNetworkById(item.network_id)
            return {
              value: net.id,
              title: net.name
            }
          }))
          this.formValues = allocateValues(poolsDetail)
          this.setFormModal('Allocate Floating IP', 'Allocate IP', 'allocate')
        } catch (e) {
          log(e)
        }
      },
      async hanldeAllocate (floatingip, cb) {
        try {
          await this.createFloatingIp(floatingip)
          await this.refreshData()
        } catch (e) {
          log(e)
        }
        this.formModalVisible = false
        cb()
      },
      async hanldeSubmitForm (values, cb) {
        if (this.formModalType === 'allocate') {
          await this.hanldeAllocate(values, cb)
        } else if (this.formModalType === 'associate') await this.handleAssociate(values, cb)
      },
      async handleConfirm () {
        if (this.confirmModalType === 'release') {
          await this.handleRelease()
        } else if (this.confirmModalType === 'disassociate') await this.handleDisassociate()
      }
    },
    async mounted () {
      try {
        await this.refreshData()
        this.$bus.$on('on-floatingIps-disassociate-open', row => {
          this.handleClickDisassociate(row)
        })
        this.$bus.$on('on-floatingIps-associate-open', row => {
          this.handleClickAssociate(row)
        })
      } catch (e) {
        log(e)
      }
    },
    destroyed () {
      this.$bus.$off('on-floatingIps-disassociate-open')
      this.$bus.$off('on-floatingIps-associate-open')
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
