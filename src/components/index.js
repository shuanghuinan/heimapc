import LayoutAside from '@/components/home/layout-aside'
import LayoutHeader from '@/components/home/layout-header'
import BreadCrumb from '@/components/common/bread-crumb'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside)
    Vue.component('layout-header', LayoutHeader)
    Vue.component('bread-crumb', BreadCrumb)
  }
}
