<template>
  <div class="image-cover">
      <!-- 我是图片封面{{list}} -->
      <!-- 放图片封面 -->
      <div class="cover-item" v-for="(item,index) in list" :key="index" @click="dialogVisible=true">
          <img src="../../assets/img/pic_bg.png" alt="">
      </div>
      <!-- 弹出层 -->
      <el-dialog :visible="dialogVisible"  @close="dialogVisible=false">

      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 从父级组件接收过来的数据
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style lang='less' scoped>
.image-cover{
    margin:30px 65px;
    display:flex;
    flex-wrap: wrap;
    .cover-item{
        border:1px dashed #ccc;
    }
}
</style>
