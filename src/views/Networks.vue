<template>
  <table-editable
    :columns="columns"
    v-model="tableValues"
    :rawData="networks"
    :editableValues="editableValues"
    @on-click-edit="handleClickEdit"
  >
  </table-editable>
</template>

<script>
  import { mapActions } from 'vuex'
  import TableEditable from '_c/table-editable'
  import { editableValues, networksCol } from '@/mock/response/networks-col'

  export default {
    name: 'Networks',
    components: {
      TableEditable
    },
    data () {
      return {
        networks: [],
        tableValues: [],
        editableValues: [],
        columns: networksCol
      }
    },
    methods: {
      ...mapActions([
        'getNetworks',
        'getSubnetById'
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
      }
    },
    async mounted () {
      this.networks = await this.getNetworks()
      await this.formTableValues()
    }
  }
</script>

<style scoped>

</style>
