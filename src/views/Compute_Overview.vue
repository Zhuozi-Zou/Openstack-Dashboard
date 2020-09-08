<template>
  <div>
    <h2>Limit Summary</h2>
    <br>
    <h4>Compute</h4>
    <circles :circle-stats="computeVal" />
    <h4>Network</h4>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { bytesToSize } from '@/lib/tools'
  import circles from '_c/circles/circles'

  export default {
    name: 'Compute_Overview',
    components: {
      circles
    },
    data () {
      return {
        computeUsage: {},
        computeQuota: {}
      }
    },
    computed: {
      ...mapState({
        projectId: state => state.projectId
      }),
      computeVal () {
        return Object.entries(this.computeUsage).map(([key, value]) => {
          const k = 1024 * 1024
          const usage = (key === 'RAM'
            ? `Used ${bytesToSize(value * k, 0)} of ${bytesToSize(this.computeQuota[key] * k, 1)}`
            : `Used ${value} of ${this.computeQuota[key]}`
          )
          return {
            title: key,
            usage,
            percent: Number(value) / Number(this.computeQuota[key]) * 100,
            multiLines: key === 'RAM'
          }
        })
      }
    },
    methods: {
      ...mapActions([
        'getUsageByProjectId',
        'getQuotaByProjectId'
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
      }
    },
    async mounted () {
      try {
        await this.initComputeStats()
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>

<style lang="less">

</style>
