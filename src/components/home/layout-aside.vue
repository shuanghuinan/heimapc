// 主页的侧边导航
<template>
 <div class="layout-aside">
     <!-- 头部logo图片 -->
    <div class="title">
        <img src="../../assets/img/logo_admin.png" alt="">
    </div>
    <!-- 导航部分 -->
    <el-menu background-color='#16245C' text-color='#A39F93'>
        <!-- 一 -->
        <el-menu-item>
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <!-- 二 -->
        <el-submenu>
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>内容管理</span>
            </template>
            <el-menu-item>发布文章</el-menu-item>
            <el-menu-item>内容列表</el-menu-item>
            <el-menu-item>评论列表</el-menu-item>
            <el-menu-item>素材管理</el-menu-item>
        </el-submenu>
        <!-- 三 -->
        <el-submenu>
            <template slot="title">
                <i class="el-icon-s-claim"></i>
                <span>粉丝管理</span>
            </template>
            <el-menu-item>图文数据</el-menu-item>
            <el-menu-item>粉丝概况</el-menu-item>
            <el-menu-item>粉丝画像</el-menu-item>
            <el-menu-item>粉丝列表</el-menu-item>
        </el-submenu>
        <!-- 四 -->
        <el-menu-item>
            <i class="el-icon-user-solid"></i>
            <span slot="title">账户信息</span>
        </el-menu-item>
    </el-menu>
 </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .layout-aside{
        height: 100vh;
        width: 230px;
        background-color: #0d1740;
        .title{
            padding:10px 0;
            text-align: center;
            img{
                height: 35px;
            }
        }
        .el-menu{
            border:none
        }
    }
</style>
