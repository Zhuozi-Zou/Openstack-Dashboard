<template>
  <div>
    <i-circle
      v-for="(item, index) in circleStats"
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
        <span v-if="!item.multiLines">{{ item.usage }}</span>
        <div v-else>
          <span>{{ item.usage.substring(0, item.usage.indexOf(splitStr) - 1) }}</span>
          <span class="diff-padding">{{ item.usage.substring(item.usage.indexOf(splitStr)) }}</span>
        </div>
      </div>
    </i-circle>
  </div>
</template>

<script>
  export default {
    name: 'circles',
    props: {
      circleStats: {
        type: Array,
        default: () => []
      },
      splitStr: {
        type: String,
        default: 'of'
      }
    }
  }
</script>

<style lang="less">
  .circle-custom {
    margin: 20px 20px;

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
