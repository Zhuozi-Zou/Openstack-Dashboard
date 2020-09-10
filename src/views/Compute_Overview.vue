<template>
  <div class="compute-overview">
    <h2>Limit Summary</h2>
    <h3>Compute</h3>
    <circles :circle-stats="computeVal" />
    <h3>Network</h3>
    <circles :circle-stats="networkVal" />
    <br>
    <h2>Usage Summary</h2>
    <h3>
      Select a period of time to query its usage:
      <span class="small help-block">The date should be in YYYY-MM-DD - YYYY-MM-DD format.</span>
    </h3>
    <div style="margin-bottom: 5px">
      <DatePicker type="daterange" :value="dateRangeVal" @on-change="handleDatePickerOnChange"></DatePicker>
      <Button @click="handleSubmitDateRange" style="margin-left: 10px">Submit</Button>
    </div>
    <List size="small">
      <ListItem v-for="(item, index) in usageListVal" :key="`${_uid}_${index}`">
        <ListItemMeta :title="item.title" :description="item.description" />
      </ListItem>
    </List>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { addADay, bytesToSize, getCurrentYMD, getCurrentYMDDate } from '@/lib/tools'
  import circles from '_c/circles/circles'

  export default {
    name: 'compute_overview',
    components: {
      circles
    },
    data () {
      return {
        computeUsage: {},
        computeQuota: {},
        networkQuotaUsage: {},
        dateRange: ['', ''],
        dateRangeVal: [getCurrentYMD(), getCurrentYMD()],
        computeUsageFull: {}
      }
    },
    computed: {
      ...mapState({
        projectId: state => state.projectId
      }),
      computeVal () {
        return Object.entries(this.computeUsage).map(([key, value]) => {
          let usage
          if (key !== 'RAM') usage = `Used ${value} of ${this.computeQuota[key]}`
          else {
            const k = 1024 * 1024
            const ramUsage = value > 1024 ? bytesToSize(value * k, 2) : value + ' MB'
            usage = `Used ${ramUsage} of ${bytesToSize(this.computeQuota[key] * k, 1)}`
          }
          return {
            title: key,
            usage,
            percent: Number(value) / Number(this.computeQuota[key]) * 100,
            multiLines: key === 'RAM'
          }
        })
      },
      networkVal () {
        return Object.entries(this.networkQuotaUsage).map(([key, value]) => {
          return {
            title: key,
            usage: `Used ${value.used} of ${value.limit}`,
            percent: Number(value.used) / Number(value.limit) * 100,
            multiLines: false
          }
        })
      },
      startDate () {
        const selectedDate = this.dateRange[0]
        return selectedDate ? new Date(selectedDate) : getCurrentYMDDate()
      },
      endDate () {
        const selectedDate = this.dateRange[1]
        return selectedDate ? addADay(new Date(selectedDate)) : addADay(getCurrentYMDDate())
      },
      usageListVal () {
        if (!Object.keys(this.computeUsageFull).length) return []

        const partialUsage = {
          'Active Instances:': 0,
          'Active RAM:': 0,
          "This Period's VCPU-Hours:": (this.computeUsageFull.total_vcpus_usage).toFixed(2),
          "This Period's GB-Hours:": (this.computeUsageFull.total_local_gb_usage).toFixed(2),
          "This Period's RAM-Hours:": (this.computeUsageFull.total_memory_mb_usage).toFixed(2)
        }

        this.computeUsageFull.server_usages.forEach(item => {
          partialUsage['Active Instances:'] += 1
          partialUsage['Active RAM:'] += item.memory_mb
        })
        partialUsage['Active Instances:'] = partialUsage['Active Instances:'].toString()
        partialUsage['Active RAM:'] = (partialUsage['Active RAM:'] > 1024
          ? bytesToSize(partialUsage['Active RAM:'] * 1024 * 1024, 2)
          : partialUsage['Active RAM:']) + ' MB'

        return Object.entries(partialUsage).map(([key, value]) => {
          return {
            title: key,
            description: value
          }
        })
      }
    },
    methods: {
      ...mapActions([
        'getUsageByProjectId',
        'getQuotaByProjectId',
        'getQuotaDetailsByProjectId'
      ]),
      async initComputeStats () {
        try {
          const computeUsagePro = this.getUsageByProjectId({
            id: this.projectId,
            start: '',
            end: ''
          })
          const computeQuotaPro = this.getQuotaByProjectId(this.projectId)
          const circleComputeUsage = {
            Instances: 0,
            VCPUs: 0,
            RAM: 0
          }
          const computeUsageFull = await computeUsagePro
          const computeQuotaFull = await computeQuotaPro

          computeUsageFull.server_usages.forEach(item => {
            circleComputeUsage.Instances += 1
            circleComputeUsage.VCPUs += item.vcpus
            circleComputeUsage.RAM += item.memory_mb
          })
          this.computeUsage = circleComputeUsage

          this.computeQuota = {
            Instances: computeQuotaFull.instances,
            VCPUs: computeQuotaFull.cores,
            RAM: computeQuotaFull.ram
          }
        } catch (e) {
          console.log(e)
        }
      },
      async initNetworkStats () {
        try {
          const networkUsage = await this.getQuotaDetailsByProjectId(this.projectId)
          this.networkQuotaUsage = {
            'Floating IPs': networkUsage.floatingip,
            'Security Groups': networkUsage.security_group,
            'Security Group Rules': networkUsage.security_group_rule,
            Networks: networkUsage.network,
            Ports: networkUsage.port,
            Routers: networkUsage.router
          }
        } catch (e) {
          console.log(e)
        }
      },
      handleDatePickerOnChange (date) {
        this.dateRange = date
      },
      async handleSubmitDateRange () {
        if (this.startDate > new Date()) {
          this.$Notice.error({
            title: 'Error:',
            desc: 'Invalid time period. You are requesting data from the future which may not exist.'
          })
        } else {
          try {
            this.computeUsageFull = await this.getUsageByProjectId({
              id: this.projectId,
              start: this.startDate,
              end: this.endDate
            })
          } catch (e) {
            console.log(e)
          }
        }
      }
    },
    async mounted () {
      try {
        await this.initComputeStats()
        await this.initNetworkStats()
        await this.handleSubmitDateRange()
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>

<style lang="less">
  .compute-overview {
    & h2 {
      margin-bottom: 20px;
    }

    .small {
      font-size: 75%;
      color: #BBB;
    }

    .help-block {
      display: block;
      margin-bottom: 10px;
    }
  }
</style>
