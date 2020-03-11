<template>
  <el-card class="account">
    <!-- 面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form label-width="100px" v-bind:model="info" v-bind:rules="rules" ref="MyForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="info.name"></el-input>
      </el-form-item>

      <el-form-item label="简介" prop="intro">
        <el-input v-model="info.intro"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="info.email"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="mobile">
        <el-input disabled v-model="info.mobile"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="check">保存</el-button>
      </el-form-item>
    </el-form>

    <!-- 头像 -->
    <el-upload action :http-request="uploadImg" :show-file-list='false'>
      <img :src="info.photo?info.photo:defaultImg" alt />
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      // 表单数据
      info: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      // 校验规则
      rules: {
        name: [
          { require: true, message: '用户名是必填项', trigger: blur },
          { min: 1, max: 7, trigger: blur, message: '用户名的长度在1-7之间' }
        ],
        email: [
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ]
      },
      // 默认头像
      defaultImg: require('../../assets/img/014fc05986c009a8012156035abd38.gif')
    }
  },

  methods: {
    // 获取用户个人信息
    getInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        console.log(res)
        this.info = res.data
      })
    },

    // 编辑用户头像
    uploadImg (params) {
      // alert(params)
      const fd = new FormData()
      fd.append('photo', params.file)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data: fd
      }).then(res => {
        this.info.photo = res.data.photo
        eventBus.$emit('changeInfo')// 编辑用户头像之后,触发公共实例
        this.$message.success('操作成功')
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },

    // 手动校验表单
    check () {
      this.$refs.MyForm.validate().then(() => {
        this.$axios({
          url: '/user/profile',
          data: this.info,
          method: 'PATCH'
        })
          .then(() => {
            this.$message.success('保存成功')
            eventBus.$emit('changeInfo')// 手动校验表单后,触发公共实例
          })
          .catch(() => {
            this.$message.error('保存失败')
          })
      })
    }
  },

  created () {
    this.getInfo()
  }
}
</script>

<style lang='less' scoped>
.account {
  .el-input {
    width: 40%;
  }
  img {
    position: absolute;
    top: 150px;
    right: 400px;
    width: 200px;
    height: 200px;
    border: 1px solid #cccccc;
    border-radius: 50%;
  }
}
</style>
