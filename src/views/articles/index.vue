<template>
  <el-card class="article">
    <!-- 面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <!-- 搜索工具栏 表单 -->
    <el-form class="form">
      <!-- 单选框组,文章状态 -->
      <el-form-item label="文章状态：">
        <el-radio-group v-model="FromData.status">
          <el-radio :label="4">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- select选择框,频道选择 -->
      <el-form-item label="频道类型：">
        <el-select v-model="FromData.channel_id" placeholder="请选择频道">
          <el-option v-for="item in channels" :label="item.name"  :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 日期范围 -->
      <el-form-item label="日期范围：">
        <el-date-picker
          v-model="FromData.dataRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个表单数据对象
      FromData: {
        status: 4, // 状态
        channel_id: null, // 频道
        dataRange: []// 日期范围
      },
      channels: []// 用来接收表单第二项频道的值
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((res) => {
        console.log(res)
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang='less' scoped>
.article{
    .form{
        margin-left: 50px;
    }
}
</style>
