<template>
  <div>
    <Table border :columns="columns" :data="tableValues" @on-selection-change="s => this.selection = s" no-data-text="No data"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { instancesCol } from '@/mock/response/instances'
  import { getAgeStr } from '@/lib/tools'

  export default {
    name: 'Instances',
    data () {
      return {
        instances: [],
        tableValues: [],
        columns: instancesCol
      }
    },
    watch: {
      async instances () {
        this.tableValues = await Promise.all(this.instances.map(async item => {
          const imagePro = this.getImageById(item.image.id)
          const flavorPro = this.getFlavorById(item.flavor.id)

          return {
            id: item.id,
            name: item.name || `(${item.id.substring(0, 13)})`,
            image_name: (await imagePro).name,
            ip_address: Object.values(item.addresses)[0].map(subnet => subnet.addr).join(', '),
            flavor: (await flavorPro).name,
            key_name: item.key_name,
            status: item.status,
            'OS-EXT-AZ:availability_zone': item['OS-EXT-AZ:availability_zone'],
            'OS-EXT-STS:task_state': item['OS-EXT-STS:task_state'] || 'None',
            'OS-EXT-STS:power_state': await this.getPowerStateStr(item['OS-EXT-STS:power_state']),
            age: getAgeStr(item.created)
          }
        }))
      }
    },
    methods: {
      ...mapActions([
        'getInstances',
        'getPowerStateStr',
        'getInstanceById',
        'getImageById',
        'getFlavorById'
      ])
    },
    async mounted () {
      try {
        this.instances = await this.getInstances()
        this.$bus.$on('on-instances-dropdown-click', (name) => {
          console.log(name)
        })
      } catch (e) {
        console.log(e)
      }
    },
    destroyed () {
      this.$bus.$off('on-instances-dropdown-click')
    }
  }
</script>

<style scoped>

</style>
