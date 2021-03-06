import LayoutAside from '@/components/home/layout-aside'// 引入头部组件
import LayoutHeader from '@/components/home/layout-header'// 引入左侧导航组件
import BreadCrumb from '@/components/common/bread-crumb'// 引入面包屑组件
import ImageCover from '@/components/publish/image-cover'// 引入图片封面组件(发布文章页面的子组件)
import SelectImage from '@/components/publish/select-image'// 引入选择图片组件(图片封面组件的子组件)
import VueQuillEditor from 'vue-quill-editor'// 引入富文本编辑器

import 'quill/dist/quill.core.css'// 这三个都是富文本编辑器的样式文件
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  // 全局注册组件,Vue一旦注册,在任意位置都可以使用
  install (Vue) {
    Vue.component('layout-aside', LayoutAside)// 注册头部组件
    Vue.component('layout-header', LayoutHeader)// 注册左侧导航组件
    Vue.component('bread-crumb', BreadCrumb)// 注册一个面包屑组件
    Vue.component('image-cover', ImageCover)// 注册图片封面组件
    Vue.component('select-image', SelectImage)// 注册选择图片组件
    Vue.use(VueQuillEditor)// 注册富文本编辑器
  }
}
