<template>
  <!-- 整个大容器 -->
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside style="width:230px">
      <layout-aside></layout-aside>
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

</script>

<style lang='less' scoped>
.el-aside{
  background-color: #0d1740;
}
</style>
