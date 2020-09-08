<template>
  <div>
    <h2>Limit Summary</h2>
    <br>
    <h4>Compute</h4>
    <br>
    <div>
      <i-circle
        v-for="(item, index) in computeVal"
        :key="`${_uid}_${index}`"
        class="circle-custom"
        :size="130"
        :trail-width="4"
        :stroke-width="5"
        :percent="item.percent"
        stroke-linecap="round"
        stroke-color="#a9cbaf"
      >
        <div class="circle-content-custom">
          <p>{{ item.title }}</p>
          <span v-if="item.title !== 'RAM'">{{ item.usage }}</span>
          <div v-else>
            <span>{{ item.usage.substring(0, item.usage.indexOf('of') - 1) }}</span>
            <span class="diff-padding">{{ item.usage.substring(item.usage.indexOf('of')) }}</span>
          </div>
        </div>
      </i-circle>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { bytesToSize } from '@/lib/tools'

  export default {
    name: 'Compute_Overview',
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
            percent: Number(value) / Number(this.computeQuota[key]) * 100
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
  .circle-custom {
    margin: 0 20px;

    .circle-content-custom {
      & p {
        color: #657180;
        font-size: 14px;
        margin: 10px 0 15px;

        &:after {
          content: '';
          display: block;
          width: 50px;
          height: 1px;
          margin: 0 auto;
          background: #e0e3e6;
          position: relative;
          bottom: -15px;
        }
      }

      .diff-padding {
        padding-top: 5px;
      }

      & span {
        display: block;
        padding-top: 15px;
        color: #657180;
        font-size: 12px;
      }
    }
  }
</style>
