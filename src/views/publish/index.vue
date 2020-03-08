<template>
  <el-card>
      <!-- 面包屑 -->
      <bread-crumb slot="header">
        <template slot="title">发布文章</template>
      </bread-crumb>
      <!-- 表单 -->
      <el-form class="MyForm"  v-bind:model="FormData" v-bind:rules="FormRules">
          <!-- 标题 -->
          <el-form-item label="标题：" prop="title">
              <el-input placeholder="请输入您的标题" style="width:60%" v-model="FormData.title"></el-input>
          </el-form-item>
          <!-- 文本域 -->
          <el-form-item label="内容：" prop="content">
              <el-input type="textarea" placeholder="请输入内容" style="width:80%" rows="5" v-model="FormData.content"></el-input>
          </el-form-item>
          <!-- 单选按钮组 -->
          <el-form-item label="封面：" prop="cover">
              <el-radio-group v-model="FormData.cover.type">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- 频道选择 -->
          <el-form-item label="频道：" prop="channel_id">
              <el-select placeholder="请选择频道" v-model="FormData.channel_id">
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <!-- 两个按钮 -->
          <el-form-item class="btns">
              <el-button type="primary">发表</el-button>
              <el-button>存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      // 表单数据
      FormData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型,-1自动,0无图,1一张,3三张
          images: ''//
        },
        channel_id: null// 文章所属频道
      },
      // 表单规则
      FormRules: {
        title: [{ required: true, message: '标题是必填项', trigger: 'blur' }, { min: 5, max: 30, message: '标题的长度在5-30之间', trigger: 'blur' }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ require: true, message: '频道类型是必选项', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((res) => {
        // console.log(res)
        this.channels = res.data.channels
      })
    }
    // // 发表文章
    // publishArticle () {
    //   this.$axios({
    //     url: '/articles',

    //   })
    // }
  },
  created () {
    this.getChannels()
  }

}
</script>

<style lang='less' scoped>
.MyForm{
    padding-left: 50px;
    .btns{
        margin-left: 55px;
    }
}
</style>
