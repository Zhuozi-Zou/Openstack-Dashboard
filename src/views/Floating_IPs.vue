<template>
  <div>
    <div class="floatingIps-header">
      <div class="buttons">
<!--        <Button @click="handleClickCreate">Create Network</Button>-->
<!--        <Button class="del-button" :disabled="deleteButtonDisabled" @click="handleClickDeleteNetworks">Delete Networks</Button>-->
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
    methods: {
      ...mapActions([
        'getNetworkById',
        'getFloatingIps'
      ]),
      async formTableValues () {
        this.tableValues = await Promise.all(this.floatingIps.map(async item => {
          try {
            const floatingNetwork = await this.getNetworkById(item.floating_network_id)
            return {
              id: item.id,
              floating_ip_address: item.floating_ip_address,
              description: item.description,
              mapped_fixed_ip_address: '',
              pool: floatingNetwork.name,
              status: item.status === 'ACTIVE' ? 'Active' : 'Down'
            }
          } catch (e) {
            log(e)
          }
        }))
      },
      handleClickDisassociate (index) {
        const selected = `"${this.tableValues[index].floating_ip_address}"`
        const { title, text } = confirmModalTexts(selected).disassociate
        this.confirmModalTitle = title
        this.confirmModalText = text
        this.confirmModalVisible = true
      }
    },
    async mounted () {
      try {
        this.floatingIps = await this.getFloatingIps()
        await this.formTableValues()

        bus.$off('on-floatingIps-disassociate-open')
        bus.$on('on-floatingIps-disassociate-open', index => {
          this.handleClickDisassociate(index)
        })
      } catch (e) {
        log(e)
      }
    }
  }
</script>

<style scoped>

</style>
