<template>
  <div :data-clazz="model.clazz">
    <div class="panelTitle">{{ i18n['sequenceFlow'] }}</div>
    <div class="panelBody">
      <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly"/>
      <div class="panelRow">
        <div>{{ i18n['sequenceFlow.expression'] }}：</div>
        <Input style="width:90%; font-size:12px"
               type="textarea"
               :rows="4"
               :disabled="readOnly"
               :value="model.conditionExpression"
               @input="(value) => {onChange('conditionExpression', value)}"/>
      </div>
      <div class="panelRow">
        <div>{{ i18n['sequenceFlow.seq'] }}：</div>
        <Input style="width:90%; font-size:12px"
               :disabled="readOnly"
               :value="model.seq"
               @input="(value) => {onChange('seq', value)}"/>
      </div>
      <div class="panelRow">
        <Checkbox @on-change="(value) => onChange('reverse', value)"
                  :disabled="readOnly"
                  :value="!!model.reverse">{{ i18n['sequenceFlow.reverse'] }}
        </Checkbox>
      </div>
    </div>
  </div>
</template>

<script>
  import DefaultDetail from './DefaultDetail'

  export default {
    inject: ['i18n'],
    components: {
      DefaultDetail
    },
    props: {
      model: {
        type: Object,
        default: () => ({})
      },
      onChange: {
        type: Function,
        default: () => {
        }
      },
      readOnly: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
