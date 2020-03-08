// 实现文章列表的筛选功能和分页功能方法二:用表单的catch事件
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
        <el-radio-group v-model="FromData.status" @change="changeCondition();changes()">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- select选择框,频道选择 -->
      <el-form-item label="频道类型：">
        <el-select v-model="FromData.channel_id" @change="changeCondition();changes()" placeholder="请选择频道">
          <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 日期范围 -->
      <el-form-item label="日期范围：">
        <!-- <span>{{FromData.dataRange}}</span> -->
        <el-date-picker
          v-model="FromData.dataRange"
          @change="changeCondition();changes()"
          type='daterange'
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>

    <!-- 页面主体结构 -->
    <el-card class="body" v-loading='loading'>
      <el-row align="middle">
        共找到
        <span class="total-num">{{page.total_count}}</span>条符合条件的内容
      </el-row>
      <el-divider>
        <i class="el-icon-caret-bottom"></i>
      </el-divider>
      <div class="article-item" v-for="item in list" v-bind:key="item.id.toString()">
        <div class="left">
          <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" />
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
       <!-- 分页 -->
      <el-row type="flex" align="middle" justify="center" style="height:60px">
        <el-pagination @current-change='changePage' :total="page.total_count" :current-page="page.page" :page-size="page.per_page" class="pagination" background layout="prev, pager, next" ></el-pagination>
      </el-row>
    </el-card>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个表单数据对象
      FromData: {
        status: 5, // 状态
        channel_id: null, // 频道
        dataRange: [] // 日期范围
      },
      channels: [], // 用来接收表单第二项频道的值
      list: [], // 用来接收文章信息
      //   defaultImg: require('http://b-ssl.duitang.com/uploads/item/201509/26/20150926000727_aWhtR.thumb.224_0.jpeg')
      defaultImg: require('../../assets/img/article_default_Img.gif'),
      page: {
        total_count: 0, // 表示一共有多少条数据,
        page: 1, // 表示当前页码
        per_page: 1 // 表示一页多少条数据
      }, // 用来存放文章的页码信息,eg:一共有多少文章,第几页
      loading: false
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
        case 2:
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
    getArticles (params) {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: params
      }).then(res => {
        console.log(res)
        this.list = res.data.results
        this.page = res.data
        this.loading = false
      })
    },

    // 此方法用来监听表单筛选条件的改变
    changeCondition () {
      const params = {
        // 当单选按钮的状态码为5的时候,将其置空,因为接口中并没有status=5,5是我们为了让他显示而捏造出来的
        status: this.FromData.status === 5 ? null : this.FromData.status,
        channel_id: this.FromData.channel_id,
        // 当日期数组存在且有长度时,索引为0的是起始时间
        begin_pubdate: this.FromData.dataRange && this.FromData.dataRange.length ? this.FromData.dataRange[0] : null,
        // 当日期数组存在且有长度大于1时,索引为1的是结束时间
        end_pubdate: this.FromData.dataRange && this.FromData.dataRange.length > 1 ? this.FromData.dataRange[1] : null,
        page: this.page.page,
        per_page: this.page.per_page
      }
      this.getArticles(params)
    },

    // 此方法用来绑定分页页码的变化
    changePage (newPage) {
      this.page.page = newPage
      this.changeCondition()
    },

    // 此方法作用:当表单域发生变化时,将分页的当前页码置一
    changes () {
      this.page.page = 1
      this.changeCondition()
      // alert(1)
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
    .total-num {
      color: #0000c0;
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
