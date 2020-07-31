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
        'getNetworks'
      ]),
      formTableValues () {
        this.tableValues = this.networks.map(item => {
          return {
            name: item.name,
            subnets_associated: item.subnets[0],
            shared: `${item.shared ? 'Yes' : 'No'}`,
            external: `${item['router:external'] ? 'Yes' : 'No'}`,
            status: `${item.status === 'ACTIVE' ? 'Active' : 'Inactive'}`,
            admin_state_up: `${item.admin_state_up ? 'UP' : 'DOWN'}`,
            availability_zones: item.availability_zones[0]
          }
        })
      },
      handleClickEdit (index) {
        this.editableValues = editableValues(this.networks[index])
      }
    },
    async mounted () {
      this.networks = await this.getNetworks()
      this.formTableValues()
    }
  }
</script>

<style scoped>

</style>
