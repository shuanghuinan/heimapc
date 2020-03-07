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
          <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
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

    <!-- 页面主体结构 -->
    <el-card class="body">
      <el-row align="middle">共找到<span class="total-num">{{page.total_count}}</span>条符合条件的内容</el-row>
      <el-divider>
        <i class="el-icon-caret-bottom"></i>
      </el-divider>
      <div class="article-item" v-for="item in list" v-bind:key="item.id.toString()">
        <div class="left">
          <img :src="item.cover.images.length?item.cover.images[0]:defaultImg">
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag class="tag" :type="item.status | filterType">{{item.status | filterStatus}}</el-tag>
            <span>{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <span>
            <i class="el-icon-edit"></i>编辑
          </span>
          <span>
            <i class="el-icon-delete"></i>删除
          </span>
        </div>
      </div>
    </el-card>
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
        dataRange: [] // 日期范围
      },
      channels: [], // 用来接收表单第二项频道的值
      list: [], // 用来接收文章信息
      page: {}, // 用来存放文章的页码信息,eg:一共有多少文章,第几页
      //   defaultImg: require('http://b-ssl.duitang.com/uploads/item/201509/26/20150926000727_aWhtR.thumb.224_0.jpeg')
      defaultImg: require('../../assets/img/article_default_Img.gif')
    }
  },
  filters: {
    // 用来过滤文章状态
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    // 过滤器除了用在 插值表达中还可以用 v-bind 的表达式中
    // 用来过滤tag的类型
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning' // 草稿 警告
        case 1:
          return 'info' // 待审核
        case 2 :
          return '' // 已发表
        case 3:
          return 'danger' // 失败 错误
      }
    }
  },
  methods: {
    // 此方法用来获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.channels
      })
    },
    // 此方法用来获取文章信息
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then((res) => {
        console.log(res)
        this.list = res.data.results
        this.page = res.data
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang='less' scoped>
.article {
  .form {
    margin-left: 50px;
  }
  .body {
    i {
      font-size: 30px;
    }
    .total-num{
        color:#0000c0
    }
    .article-item {
      display: flex;
      justify-content: space-between;
      padding: 15px 0;
      border-bottom: 1px solid #ccc;
      .left {
        display: flex;
        img {
          width: 180px;
          height: 100px;
          border-radius: 4px;
          margin-right: 20px;
        }
        .info {
          display: flex;
          flex-direction: column;
          span {
            margin-bottom: 15px;
            &:nth-child(3) {
              font-size: 12px;
            }
          }
          .tag {
            width: 60px;
            text-align: center;
          }
        }
      }
      .right {
        span {
          user-select: none;
          cursor: pointer;
          i {
            font-size: 16px;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
