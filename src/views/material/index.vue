<template>
  <el-card>
    <!-- 面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传图片按钮 -->
    <el-row type="flex" justify="end">
      <el-upload action>
        <el-button type="primary">上传素材</el-button>
      </el-upload>
    </el-row>
    <!-- 标签页 -->
    <el-tabs type="border-card" v-model="cur" @tab-click='changeTab'>
      <!-- 全部 -->
      <el-tab-pane label="全部" name="all">
        <div class="card_list">
          <el-card class="list-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" justify="center" align="middle">
              <i class="el-icon-star-off"></i>
              <i class="el-icon-delete"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>

      <!-- 收藏 -->
      <el-tab-pane label="收藏" name="collect">
        <div class="card_list">
          <el-card class="list-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      cur: 'all', // 当前所激活的页签
      list: [] // 全部素材的信息
    }
  },
  methods: {
    // 此方法用来获取素材信息
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.cur === 'collect'
        }
      }).then(res => {
        this.list = res.data.results // 如果请求成功的话,就将响应的results数组的值赋给list变量
        console.log(res)
      })
    },

    // 此方法用来监听页签的改变
    changeTab () {
      this.getMaterial()
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.card_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .list-item {
    position: relative;
    width: 300px;
    height: 400px;
    margin: 10px 50px;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background: #f4f5f6;
      height: 30px;
      i {
        font-size: 20px;
        margin: 0 50px;
      }
    }
  }
}
</style>
