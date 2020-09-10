<template>
  <div>
    <div class="images-header">
      <div class="buttons">
        <Button class="button" @click="handleClickCreate">Create Image</Button>
        <Button type="error" class="button" :disabled="deleteButtonDisabled" @click="handleClickDeleteImages">Delete Images</Button>
      </div>
    </div>
    <div style="clear: both">
      <br>
    </div>
    <Table :columns="columns" :data="tableValues" @on-selection-change="s => this.selection = s" no-data-text="No data"/>
    <Modal v-model="confirmModalVisible" :title="confirmModalTitle" :mask-closable="false">
      {{ confirmModalText }}
      <div slot="footer">
        <Button @click="() => this.confirmModalVisible = false">Cancel</Button>
        <Button type="error" :loading="comfirmLoading" @click="handleConfirm">{{ confirmModalConfirmText }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { imagesCol } from '@/mock/response/images'
  import { firstLetterUpper, bytesToSize } from '@/lib/tools'
  import { joinSelections } from '@/lib/util'

  export default {
    name: 'images',
    data () {
      return {
        columns: imagesCol,
        images: [],
        tableValues: [],
        selection: [],
        confirmModalVisible: false,
        confirmModalTitle: 'Confirm Delete Image',
        confirmModalText: '',
        comfirmLoading: false,
        confirmModalConfirmText: 'Delete Image'
      }
    },
    computed: {
      deleteButtonDisabled () {
        return !this.selection.length > 0
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
        this.confirmModalVisible = false
        this.comfirmLoading = false
      }
    },
    methods: {
      ...mapActions([
        'getImages',
        'getProjectById',
        'deleteImages'
      ]),
      handleClickCreate () {
        //
      },
      handleClickDeleteImages () {
        const selectedImageNames = joinSelections(this.selection, 'name')
        this.confirmModalText = `You have selected ${selectedImageNames}. Deleted image is not recoverable.`
        this.confirmModalVisible = true
      },
      async handleConfirm () {
        this.comfirmLoading = true
        try {
          await this.deleteImages(this.selection)
          this.images = await this.getImages()
          this.selection = []
        } catch (e) {
          console.log(e)
        }
      }
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

<style lang="less">
  .images-header {
    .buttons {
      float: right;

      .button {
        margin: 0 3px;
      }
    }
  }
</style>
