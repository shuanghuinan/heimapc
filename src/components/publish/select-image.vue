<template>
  <!-- 我是图片选择组件 -->
  <!-- 页签 -->
  <el-tabs v-model="activeTab">
    <!-- 第一个页签 -->
    <el-tab-pane label="素材库" name="material">
      <!-- 图片 -->
      <div class="main">
        <el-card v-for="(item,index) in ImagesUrl" :key="index" class="item">
          <img :src="item.url" @click="clickImg(item.url)" alt />
        </el-card>
      </div>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" class="row">
        <el-pagination
          @current-change="changePage"
          background
          layout="prev, pager, next"
          :total="page.total_count"
          :page-size="page.per_page"
          :current-page="page.page"
        ></el-pagination>
      </el-row>
    </el-tab-pane>

    <!-- 第二个页签 -->
    <el-tab-pane label="上传素材" name="second">
      <el-upload class="uploadImg" action="" :http-request="uploadImg">
        <i class="el-icon-circle-plus-outline"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      ImagesUrl: [], // 图片信息
      activeTab: 'material', // 默认显示的页签
      page: {
        total_count: 10, // 总数
        page: 1, // 当前页数
        per_page: 8 // 每页数量
      }
    }
  },
  methods: {
    // 获取图片信息
    getImages () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 因为是查询所有素材,按借口要求,所以是false
          page: this.page.page,
          per_page: this.page.per_page
        }
      }).then(res => {
        console.log(res)
        this.ImagesUrl = res.data.results
        this.page.total_count = res.data.total_count
      })
    },

    // 分页的页码改变事件
    changePage (newpage) {
      this.page.page = newpage
      this.getImages()
    },

    // 点击图片时触发
    clickImg (url) {
      // 自定义事件
      this.$emit('selectImage', url)
    },

    // 上传图片
    uploadImg (params) {
      const fd = new FormData()
      fd.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: fd
      }).then((res) => {
        this.$emit('selectImage', res.data.url) // 将url参数传出去
        this.$message.success('素材上传成功')
      }).catch(() => {
        this.$message.error('素材上传失败')
      })
    }
  },

  created () {
    this.getImages()
  }
}
</script>

<style lang='less' scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .item {
    width: 150px;
    height: 150px;
    margin: 20px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.row {
  height: 70px;
}
.uploadImg {
   display: flex;
  justify-content: center;
  i {
    font-size: 60px;
    padding: 50px;
    border:2px dashed #ccc;
    border-radius: 4px;
  }
}
</style>
