<template>
  <!-- 整个大容器 -->
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside :style="{width:fold?'64px':'230px'}" style="transition:all 0.5s; background:#2e2f32" >
      <layout-aside :fold='fold'></layout-aside>
    </el-aside>
    <!-- 右面整体 -->
    <el-container>
      <!-- 右上 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 右下 -->
      <el-main style="padding:0">
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      fold: false// 用来控制导航栏是否折叠,默认不折叠
    }
  },
  created () {
    // 监听到变化头部组件的变化
    eventBus.$on('changeFold', (fold) => {
      this.fold = fold
    })
  }
}
</script>
<style lang='less' scoped>
.el-aside {
  background-color: #0d1740;
}
</style>
