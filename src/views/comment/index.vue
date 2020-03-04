<template>
    <div>
    <bread-crumb>
        <span slot="title">评论列表</span>
    </bread-crumb>
    <el-table :data="list" stripe>
        <el-table-column prop="title" label='标题' width="600"></el-table-column>
        <!-- 从后台取回来的评论状态是布尔值,但table-column中不能对布尔值进行显示,所以就要用table-column的formatter属性来格式化内容 -->
        <el-table-column prop="comment_status" label='评论状态' :formatter='formatterBool' align='center'></el-table-column>
        <el-table-column prop="total_comment_count" label='总评论数' align='center'></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数" align='center'></el-table-column>
        <el-table-column label="操作"></el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment' // 此参数用来控制获取数据类型
        }
      }).then(res => {
        // console.log(res)
        console.log(res.data.results)
        this.list = res.data.results
      })
    },
    formatterBool (row, column, cellValue, index) {
      //  row 代表当前的一行数   column 代表当前的列信息  cellValue 代表当前单元格的值   index 代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
