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
  import { floatingIpsCol, confirmModalTexts } from '@/mock/response/floating_ips'
  import bus from '@/lib/bus'
  import { joinSelections } from '@/lib/util'

  const log = console.log

  export default {
    name: 'Floating_IPs',
    data () {
      return {
        confirmModalVisible: false,
        confirmModalTitle: 'Confirm',
        confirmModalText: 'Please confirm your selection.',
        columns: floatingIpsCol,
        floatingIps: [],
        tableValues: [],
        editableValues: [],
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
        'getFloatingIps'
      ]),
      async formTableValues () {
        this.tableValues = await Promise.all(this.floatingIps.map(async item => {
          try {
            const floatingNetwork = await this.getNetworkById(item.floating_network_id)
            const portDetails = item.port_details
            let deviceName = '-'
            if (portDetails) {
              const instance = await this.getInstanceById(portDetails.device_id)
              // const deviceNames = Object.values(instance.addresses).map(item => {
              //   const subnet = item[0]
              // })
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
      handleClickDisassociate (index) {
        const selected = `"${this.tableValues[index].floating_ip_address}"`
        const { title, text } = confirmModalTexts(selected).disassociate
        this.setConfirmModal(title, text)
      },
      handleClickAssociate (index) {
        //
      },
      handleClickAllocate () {
        //
      },
      handleClickRelease () {
        log(this.selection)
        const selectedIpNames = joinSelections(this.selection, 'floating_ip_address')
        const { title, text } = confirmModalTexts(selectedIpNames).release
        this.setConfirmModal(title, text)
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
