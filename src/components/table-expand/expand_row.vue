<template>
  <div>
    <Row class="expand-row" v-for="(cols, index) in valueList" :key="`${_uid}_${index}`">
      <i-col
        class="expand-col"
        v-for="(col, index) in cols"
        :key="`${_uid}_${index}`"
        span="8"
      >
        <span class="expand-key">{{ col.title }}</span>
        <br>
        <span class="expand-value">{{ col.value }}</span>
      </i-col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'expand_row',
    data () {
      return {
        valueList: []
      }
    },
    props: {
      row: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      setInitValue () {
        for (let i = 0; i < this.row.length; i = i + 3) {
          this.valueList.push(this.row.slice(i, i + 3))
        }
      }
    },
    mounted () {
      this.setInitValue()
    }
  }
</script>

<style lang="less">
  .expand-row{
    margin-bottom: 16px;

    .expand-col {
      padding: 0 10px;

      .expand-key{
        font-weight: bold;
      }
    }
  }
</style>
