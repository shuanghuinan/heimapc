<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
    <!-- 第二个选项是动态的,可以采用两种方式来传值 1.props传值.  2.slot插槽(采用) -->
    <el-breadcrumb-item>
      <!-- 挖坑 -->
      <slot name="title"></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style>
</style>
