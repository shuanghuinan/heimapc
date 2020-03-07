<template>
  <el-card class="material">
    <!-- 面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传图片按钮 -->
    <el-row type="flex" justify="end">
      <el-upload action :http-request="uploadImg" :show-file-list="false">
        <el-button type="primary">上传素材</el-button>
      </el-upload>
    </el-row>
    <!-- 标签页 -->
    <el-tabs type="card" v-model="cur" @tab-click="changeTab" v-loading='loading'>
      <!-- 全部 -->
      <el-tab-pane label="全部" name="all">
        <div class="card_list">
          <el-card class="list-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row class="operate" type="flex" justify="center" align="middle">
              <i
                class="el-icon-star-on"
                @click="collectOrCancel(item)"
                :style="{color: item.is_collected ? 'red' : 'black'}"
              ></i>
              <i class="el-icon-delete-solid" @click="delItem(item)"></i>
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
    <!-- 分页 -->
    <el-row type="flex" align="middle" justify="center" class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="this.page.total_count"
        :current-page="this.page.page"
        :page-size="this.page.per_page"
        @current-change="changeCurGage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      cur: 'all', // 当前所激活的页签
      list: [], // 全部素材的信息,有id,url和is_collect
      // 放页码信息
      page: {
        total_count: 1, // 总的条数,默认为1
        page: 1, // 当前页数,默认是1
        per_page: 3 // 每页显示条数,默认8条
      },
      loading: false// 用来表示是否在加载中
    }
  },
  methods: {
    // 此方法用来获取素材信息
    getMaterial () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.cur === 'collect',
          page: this.page.page,
          per_page: this.page.per_page
        }
      }).then(res => {
        this.list = res.data.results // 如果请求成功的话,就将响应的results数组的值赋给list变量
        this.page = res.data // 解构赋值
        this.loading = false
        console.log(res)
      })
    },

    // 此方法用来监听页签的改变
    changeTab () {
      this.page.page = 1
      this.getMaterial()
    },

    // 此方法用来监听分页页数的变化
    changeCurGage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },

    // 此方法用来上传素材,info中的file属性代表了所上传文件的信息
    uploadImg (info) {
      console.log(info)
      const fd = new FormData()
      fd.append('image', info.file)
      this.$axios({
        url: '/user/images',
        data: fd,
        method: 'post'
      })
        .then(res => {
          console.log(res)

          this.getMaterial()
        })
        .catch(() => {
          this.$message.error('上传素材失败')
        })
    },

    // 此方法用来收藏或取消收藏
    collectOrCancel (item) {
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'PUT',
        data: {
          collect: !item.is_collected
        }
      }).then(() => {
        // console.log(item)
        this.getMaterial()
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },

    // 此方法用来删除素材
    delItem (item) {
      this.$confirm('您确定要删除此素材吗').then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'DELETE'
        }).then(() => {
          this.getMaterial()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    }

  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.material {
  // background-color: rgb(74, 74, 90);
  .card_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    // background-color:rgb(211, 100, 57);
    .list-item {
      // background: url('../../assets/img/item.jpg') center no-repeat;
      // background-size: cover;
      box-shadow: 6px 6px 9px -5px rgba(115, 183, 204, 0.644);
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

  .page {
    margin-top: 50px;
  }
}
</style>
