<template>
  <el-card>
    <!-- 面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- 评论列表 -->
    <el-table :data="list" stripe>
      <el-table-column prop="title" label="标题" width="400"></el-table-column>
      <!-- 从后台取回来的评论状态是布尔值,但table-column中不能对布尔值进行显示,所以就要用table-column的formatter属性来格式化内容 -->
      <el-table-column prop="comment_status" label="评论状态" :formatter="formatterBool" align="center"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数" align="center"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="obj">
          <!-- table-column的组件中,在插槽(作用域插槽)中传出了row $index store column 可通过slot-scope接收出来-->
          <!-- <span>{{obj.row}}</span> -->
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            v-on:click="OpenOrClose(obj.row)"
          >{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-row type="flex" align="middle" justify="center">
      <el-pagination
        @current-change='ChangeCurPage'
        background
        layout="prev, pager, next"
        :total="page.total_count"
        :current-page="page.page"
        :page-size="page.per_page"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 评论列表的数据
      list: [],
      // 页码的信息
      page: {
        total_count: 100, // 默认评论总数是0
        page: 1, // 默认当前页是第一页
        per_page: 10 // 默认一页显示十条
      }
    }
  },
  methods: {
    // 这个方法用来获取评论列表的数据
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment', // 此参数用来控制获取数据类型
          page: this.page.page,
          per_page: this.page.per_page
        }
      }).then(res => {
        // console.log(res)
        // console.log(res.data.results)
        this.list = res.data.results
        this.page = res.data // 解构赋值,将后台响应回来的数据赋值给page对象
        // this.page.total_count = res.data.total_count
        // this.page.curpage = res.data.page
        // this.page.per_page = res.data.per_page
      })
    },

    // 这个方法用来控制分页按钮的点击事件
    ChangeCurPage (newPage) {
      this.page.page = newPage
      this.getComment()
    },

    // 这个方法用来将el-table-column 的布尔值显示
    formatterBool (row, column, cellValue, index) {
      //  row 代表当前的一行数   column 代表当前的列信息  cellValue 代表当前单元格的值   index 代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    },

    // 这个方法用来决定打开/关闭评论
    // 这里的参数row是上面传过来的,代表的是每行的数据
    OpenOrClose (row) {
      const message = row.comment_status ? '关闭' : '打开'
      this.$confirm(
        `此操作将${message}评论,您确定要进行此操作吗?`,
        '提示'
      ).then(() => {
        // 点击确定后,要请求接口
        this.$axios({
          url: '/comments/status',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          },
          method: 'put'
        })
          .then(() => {
            this.$message.success(`${message}评论成功`)
            this.getComment()
          })
          .catch(() => {
            this.$message.error(`${message}评论失败`)
          })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style lang='less' scoped>
.el-table {
  padding: 20px;
}
</style>
