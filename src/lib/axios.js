import axios from 'axios'
import { baseURL } from '@/config'
import { Spin } from 'iview'

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

  distroy (url) {
    delete this.queue[url]
    setTimeout(() => {
      if (!Object.keys(this.queue).length) {
        Spin.hide()
      }
    }, 1000)
  }

  interceptors (instance, url) {
    instance.interceptors.request.use(
      config => {
        // Add global loading...
        if (config.method === 'get') {
          if (!Object.keys(this.queue).length) {
            Spin.show({
              render: (h) => {
                return h('div', [
                  h('Icon', {
                    style: { animation: 'ani-demo-spin 1s linear infinite' },
                    props: {
                      type: 'ios-loading',
                      size: 30
                    }
                  }), h('div', 'Loading')
                ])
              }
            })
          }
          this.queue[url] = true
        }
        return config
      },
      error => {
        return Promise.reject(error)
      })

    instance.interceptors.response.use(
      res => {
        if (res.config.method === 'get') this.distroy(url)
        return res
      },
      error => {
        this.distroy(url)
        return Promise.reject(error)
      }
    )
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
