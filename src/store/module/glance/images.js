import { getToken } from '@/lib/util'
import { getImageById, getImages, deleteImage } from '@/api/glance/images'

const state = {
  //
}

const mutations = {
  //
}

const actions = {
  async getImageById (params, id) {
    try {
      await getToken()
      const res = await getImageById(id)
      return res.data
    } catch (e) {
      throw new Error('getImageById: ' + e)
    }
  },
  async getImages () {
    try {
      await getToken()
      const res = await getImages()
      return res.data
    } catch (e) {
      throw new Error('getImages: ' + e)
    }
  },
  async deleteImages (params, images) {
    for (const item of images) {
      await deleteImageHelper(item.id)
    }
  }
}

const deleteImageHelper = async (id) => {
  try {
    await getToken()
    await deleteImage(id)
  } catch (e) {
    throw new Error('deleteImageHelper: ' + e)
  }
}

export default {
  state,
  mutations,
  actions
}
