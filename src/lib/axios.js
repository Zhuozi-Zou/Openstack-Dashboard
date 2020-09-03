import axios from 'axios'
import { baseURL } from '@/config'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    return {
      baseUrl: this.baseUrl,
      withCredentials: true,
      headers: {
        //
      }
    }
  }

  // distroy (url) {
  //   delete this.queue[url]
  //   if (!Object.keys(this.queue).length) {
  //     Spin.show()
  //   }
  // }

  interceptors (instance) {
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        // Spin.show()
        return config
      },
      error => {
        return Promise.reject(error)
      })

    instance.interceptors.response.use(
      res => {
        return res
      },
      error => {
        return Promise.reject(error)
      }
    )
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(options)
  }
}

export default HttpRequest
