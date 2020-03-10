<template>
  <div class="image-cover">
    <!-- 我是图片封面{{list}} -->
    <!-- 放图片封面 -->
    <div class="cover-item" v-for="(item,index) in list" :key="index" @click="clickDialog(index)">
      <img :src="item?item:defaultUrl" alt />
    </div>
    <!-- 弹出层 -->
    <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
      <!-- 图片选择子组件 -->
      <select-image @selectImage="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 从父级组件接收过来的数据
  data () {
    return {
      dialogVisible: false,
      curImgIndex: -1, // 当前点击哪个封面
      defaultUrl: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    // 点击封面时,所触发的事件(因为我们要知道当前点击的是第几个封面,所以要把下标给记录下来)
    clickDialog (index) {
      this.dialogVisible = true
      this.curImgIndex = index
    },
    // 接收传递的地址
    receiveImg (url) {
      this.$emit('selectImgTwice', url, this.curImgIndex) // 接收完之后,要再传给他的父级
      this.dialogVisible = false // 接收完后就没弹层啥事了,要关闭弹层
    }
  }
}
</script>

<style lang='less' scoped>
.image-cover {
  margin: 30px 65px;
  display: flex;
  flex-wrap: wrap;

  .cover-item {
    border: 1px dashed #ccc;
    width: 150px;
    height: 150px;
    margin-right: 10px;
    img{
        width:100%;
        height: 100%;
    }
  }
}
</style>
