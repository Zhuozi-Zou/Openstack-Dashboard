<template>
  <div>
    <div class="instances-header">
      <div class="buttons">
        <Button class="button" @click="handleClickCreate">Launch Instance</Button>
        <Button type="error" class="button" :disabled="deleteButtonDisabled" @click="handleClickDeleteInstances">Delete Instances</Button>
        <Dropdown trigger="click" :transfer="true" @on-click="handleClickMoreActions">
          <Button style="margin: 0 3px">
            More Actions
            <Icon type="md-arrow-dropdown" />
          </Button>
          <Dropdown-menu slot="list">
            <Dropdown-item name="start_instance">Start Instance</Dropdown-item>
            <Dropdown-item style="color: red" name="shut_off_instance">Shut Off Instance</Dropdown-item>
            <Dropdown-item style="color: red" name="soft_reboot_instance">Soft Reboot Instance</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </div>
    </div>
    <div style="clear: both">
      <br>
    </div>
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
        columns: instancesCol,
        selection: []
      }
    },
    computed: {
      deleteButtonDisabled () {
        return !this.selection.length > 0
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
      ]),
      handleClickCreate () {
        //
      },
      handleClickDeleteInstances () {
        //
      },
      handleClickMoreActions (name) {
        console.log(name)
      }
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

<style lang="less">
  .instances-header {
    .buttons {
      float: right;

      .button {
        margin: 0 3px;
      }
    }
  }
</style>
