<template>
  <div :data-clazz="model.clazz">
    <div class="panelTitle">{{ i18n[model.clazz] }}</div>
    <div class="panelBody">
      <div v-for="(item, index) in model.topoData" class="panelRow" :key="`${_uid}_${index}`">
        <div>{{ i18n[`${model.clazz}.${item.name}`] }}：</div>
        <component
          :is="item.type"
          :type="item.subType"
          :readonly="item.readOnly"
          v-model="item.value"
        >
          <div v-if="item.children">
            <component
              v-for="(child, i) in item.children.list"
              :is="item.children.type"
              :key="`${_uid}_${index}_${i}`"
              :readonly="child.readOnly"
              :value="(item.children.type === 'i-input' ? `${i18n[`${model.clazz}.${child.name}`]}: ` : '') + child.value"
            >
              {{ child.title }}
            </component>
          </div>
        </component>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailsPanel',
    inject: ['i18n'],
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

<style scoped>

</style>
