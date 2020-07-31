<template>
  <label>
    <input @input="handleInput" :value="value"/>
  </label>
</template>

<script>
  export default {
    name: 'AInput',
    props: {
      value: {
        type: [String, Number],
        default: ''
      }
    },
    methods: {
      handleInput (event) {
        const value = event.target.value
        this.$emit('input', value)
      }
    }
  }
</script>
