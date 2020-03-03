// 主页的侧边导航
<template>
 <div class="layout-aside">
     <!-- 头部logo图片 -->
    <div class="title">
        <img src="../../assets/img/logo_admin.png" alt="">
    </div>
    <!-- 导航部分 -->
    <el-menu router background-color='#16245C' text-color='#A39F93'>
        <!-- 一 -->
        <el-menu-item>
            <i class="el-icon-s-home"></i>
            <span slot="title" index='/home'>首页</span>
        </el-menu-item>
        <!-- 二 -->
        <!-- 为两个el-submenu设置了不同的index值后,就不会再出现点这个的时候,两个都展开的情况 -->
        <el-submenu index='1'>
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>内容管理</span>
            </template>
            <el-menu-item index='/home/publish'>发布文章</el-menu-item>
            <el-menu-item index='/home/articles'>内容列表</el-menu-item>
            <el-menu-item index='/home/comment'>评论列表</el-menu-item>
            <el-menu-item index='/home/material'>素材管理</el-menu-item>
        </el-submenu>
        <!-- 三 -->
        <el-submenu index='2'>
            <template slot="title">
                <i class="el-icon-s-claim"></i>
                <span>粉丝管理</span>
            </template>
            <el-menu-item index='/home/picture'>图文数据</el-menu-item>
            <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
            <el-menu-item index='/home/fansphoto'>粉丝画像</el-menu-item>
            <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
        </el-submenu>
        <!-- 四 -->
        <el-menu-item index='/home/account'>
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
