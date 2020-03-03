// 主页的顶部,用到了elementui组件库的布局
// el-row表示行,el-col表示列(分成了24份)
// 要设置对齐方式的话,就要先为el-row的type设置为flex ,然后垂直对齐方式是用align,水平对齐方式是用justify
<template>
  <!-- 只有一行 -->
  <el-row type="flex" align="middle" class="layout-header">
    <!-- 左面,即第一列 -->
    <el-col class="left" :span="12">
      <!-- 图标 -->
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>

    <!-- 右面,即第二列 -->
    <el-col class="right" :span="12">
      <!-- 因为要为右侧设置对齐样式,所以再放一个el-row标签 -->
      <el-row type="flex" align="middle" justify="end">
        <!-- 头像 -->
        <img src="../../assets/img/reply.png" alt />
        <!-- 下拉菜单 -->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            慢慢
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>個人信息</el-dropdown-item>
            <el-dropdown-item>github地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.layout-header {
  height: 60px;
  // background-color: #F8F2DC;
  .left {
    i {
      font-size: 20px;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 0 5px
    }
  }
}
.el-dropdown-link{
    cursor: pointer;
}
</style>
