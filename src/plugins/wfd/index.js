import Wfd from '_c/wfd'

const install = (Vue) => {
  Vue.component(Wfd.name, Wfd)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default Wfd
