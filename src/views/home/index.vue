<template>
  <!-- 整个大容器 -->
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside>
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右面整体 -->
    <el-container>
      <!-- 右上 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 右下 -->
      <el-main>
        下
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

</script>

<style>

</style>
