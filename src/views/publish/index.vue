<template>
  <el-card>
    <!-- 面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form ref="MyForm" class="MyForm" v-bind:model="FormData" v-bind:rules="FormRules">
      <!-- 标题 -->
      <el-form-item label="标题：" prop="title">
        <el-input placeholder="请输入您的标题" style="width:60%" v-model="FormData.title"></el-input>
      </el-form-item>
      <!-- 文本域 -->
      <el-form-item label="内容：" prop="content">
        <quill-editor class="MyEditor" v-model="FormData.content"></quill-editor>
      </el-form-item>
      <!-- 单选按钮组 -->
      <el-form-item label="封面：" prop="cover" class="MyCover">
        <el-radio-group v-model="FormData.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 放置图片封面子组件 -->
      <image-cover v-bind:list="FormData.cover.images" @selectImgTwice="image"></image-cover>
      <!-- 频道选择 -->
      <el-form-item label="频道：" prop="channel_id">
        <el-select placeholder="请选择频道" v-model="FormData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 两个按钮 -->
      <el-form-item class="btns">
        <el-button type="primary" @click="publish(false)">发表</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getChannels } from '@/api/publish'
import { getArticles } from '@/api/material'
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
          images: []//
        },
        channel_id: null// 文章所属频道
      },
      // 表单规则
      FormRules: {
        title: [{ required: true, message: '标题是必填项', trigger: 'blur' }, { min: 5, max: 30, message: '标题的长度在5-30之间', trigger: 'blur' }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道类型是必选项', trigger: 'blur' }]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      console.log(to)
      console.log(from)
      // 如果to的query参数中有id值,应该获取编辑文章的数据
      if (to.query.id) {
        this.getArticles(to.query.id)
      } else {
        // 如果不存在 应该 设置表单数据为空
        // 如果是发布文章 就设置为空对象
        this.FormData = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面类型,-1自动,0无图,1一张,3三张
            images: []//
          },
          channel_id: null// 文章所属频道
        }
      }
    }
  },
  methods: {
    // 获取频道数据
    async getChannels () {
      const res = await getChannels()
      this.channels = res.data.channels
    },
    // 获取文章信息
    async getArticles (id) {
      try {
        const res = await getArticles(id)
        this.FormData = res.data
      } catch (error) {
        this.$message.error('获取文章信息失败')
      }
    },

    // 此方法用来zai手动校验规则hou
    // 发布正式文章  发布草稿文章    修改正式文章  修改草稿文章
    publish (darft) {
      this.$refs.MyForm.validate().then(async () => {
        const { id } = this.$route.query
        // 表单手动校验成功后,要发请求,进行下面的操作
        try {
          await this.$axios({
            url: id ? `/articles/${id}` : '/articles',
            method: id ? 'PUT' : 'POST',
            params: {
              draft: darft
            },
            data: this.FormData
          })
          // 请求成功后
          this.$message.success('操作成功')
          this.$router.push('/home/articles')
        } catch (error) {
          this.$message.error('操作失败')
        }
      })
    },

    // 此方法用来:根据FormData.cover.type的值,来生成对应长度的FormData.cover.images数组
    // 即根据封面类型,生成对应长度的封面长度.  无图/自动的长度为0  一图的长度是1  三图的长度时3
    changeType () {
      if (this.FormData.cover.type === 3) {
        this.FormData.cover.images = ['', '', '']
      } else if (this.FormData.cover.type === 1) {
        this.FormData.cover.images = ['']
      } else {
        this.FormData.cover.images = []
      }
    },

    // 接收子组件传过来的参数
    image (url, index) {
      this.FormData.cover.images.splice(index, 1, url)
    }
  },
  created () {
    this.getChannels()
    // 获取从文章列表传过来的id参数
    const { id } = this.$route.query
    id && this.getArticles(id)
  }

}
</script>

<style lang='less' scoped>
.MyForm {
  padding-left: 50px;
  .MyEditor {
    margin: 10px 65px;
    width: 70%;
    height: 300px;
  }
  .MyCover {
    margin-top: 100px;
    margin-left: 10px;
  }
  .btns {
    margin-left: 55px;
  }
}
</style>
