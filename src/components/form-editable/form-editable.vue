<template>
  <Form ref="form" :model="valueList" :rules="rules">
    <FormItem
      v-for="(item, index) in editableValues"
      :prop="item.name"
      :label="item.label"
      label-position="right"
      :key="`${_uid}_${index}`"
      :error="errorStore[item.name]"
    >
      <component :is="item.type" v-model="valueList[item.name]">
        <template v-if="item.children">
          <component
            v-for="(child, i) in item.children.list"
            :is="item.children.type"
            :key="`${_uid}_${index}_${i}`"
            :value="child.value">{{ child.title }}
          </component>
        </template>
      </component>
    </FormItem>
  </Form>
</template>

<script>
  export default {
    name: 'form-editable',
    data () {
      return {
        rules: {},
        errorStore: {},
        valueList: {}
      }
    },
    props: {
      editableValues: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      editableValues () {
        this.setInitValue()
      }
    },
    methods: {
      setInitValue () {
        const rules = {}
        const errorStore = {}
        const valueList = {}
        this.editableValues.forEach(item => {
          rules[item.name] = item.rule
          errorStore[item.name] = ''
          valueList[item.name] = item.value
        })
        this.rules = rules
        this.errorStore = errorStore
        this.valueList = valueList
      },
      handleSubmit () {
        this.$refs.form.validate(valid => {
          if (valid) this.$emit('on-submit-form', this.valueList)
        })
      }
    },
    mounted () {
      this.setInitValue()
    }
  }
</script>

<style scoped>

</style>
