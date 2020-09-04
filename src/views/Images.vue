<template>
  <div>
    <Table :columns="columns" :data="tableValues" @on-selection-change="s => this.selection = s" no-data-text="No data"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { imagesCol } from '@/mock/response/images'
  import { firstLetterUpper, bytesToSize } from '@/lib/tools'

  export default {
    name: 'Images',
    data () {
      return {
        columns: imagesCol,
        images: [],
        tableValues: [],
        selection: []
      }
    },
    watch: {
      async images () {
        this.tableValues = await Promise.all(this.images.map(async item => {
          try {
            return {
              id: item.id,
              owner_project_name: item.owner_project_name || (await this.getProjectById(item.owner)).name,
              name: item.name,
              image_type: item.image_type ? firstLetterUpper(item.image_type) : 'Image',
              status: firstLetterUpper(item.status),
              visibility: firstLetterUpper(item.visibility),
              protected: item.protected ? 'Yes' : 'No',
              disk_format: item.disk_format.toUpperCase(),
              size: item.size ? bytesToSize(item.size) : '',
              min_disk: item.min_disk,
              min_ram: item.min_ram
            }
          } catch (e) {
            console.log(e)
          }
        }))
      }
    },
    methods: {
      ...mapActions([
        'getImages',
        'getProjectById'
      ])
    },
    async mounted () {
      try {
        this.images = await this.getImages()
        this.$bus.$on('on-images-dropdown-click', (name) => {
          console.log(name)
        })
      } catch (e) {
        console.log(e)
      }
    },
    destroyed () {
      this.$bus.$off('on-images-dropdown-click')
    }
  }
</script>

<style scoped>

</style>
