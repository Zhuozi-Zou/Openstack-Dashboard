<template>
  <div>
    <Table border :columns="columns" :data="tableValues" @on-selection-change="s => this.selection = s" no-data-text="No data"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { instancesCol } from '@/mock/response/instances'
  import { getAgeStr } from '@/lib/tools'
  import bus from '@/lib/bus'

  const log = console.log

  export default {
    name: 'Instances',
    data () {
      return {
        instances: [],
        tableValues: [],
        columns: instancesCol
      }
    },
    methods: {
      ...mapActions([
        'getInstances'
      ]),
      async refreshData () {
        try {
          this.instances = await this.getInstances()
          await this.formTableValues()
        } catch (e) {
          log(e)
        }
      },
      async formTableValues () {
        this.tableValues = await Promise.all(this.instances.map(async item => {
          // await Promise.all(
          //
          // )

          return {
            id: item.id,
            name: item.name || `(${item.id.substring(0, 13)})`,
            image_name: '',
            ip_address: '',
            flavor: '',
            key_name: item.key_name,
            status: item.status === 'ACTIVE' ? 'Active' : 'Down',
            'OS-EXT-AZ:availability_zone': item['OS-EXT-AZ:availability_zone'],
            'OS-EXT-STS:task_state': item['OS-EXT-STS:task_state'] || 'None',
            'OS-EXT-STS:power_state': item['OS-EXT-STS:power_state'],
            age: getAgeStr(item.created)
          }
        }))
      }
    },
    async mounted () {
      try {
        await this.refreshData()
      } catch (e) {
        log(e)
      }
    }
  }
</script>

<style scoped>

</style>
