import LayoutAside from '@/components/home/layout-aside'
import LayoutHeader from '@/components/home/layout-header'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside)
    Vue.component('layout-header', LayoutHeader)
  }
}
