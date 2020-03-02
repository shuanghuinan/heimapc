<template>
  <div class="login">
    <!-- 卡片部分 -->
    <el-card class="login-card">
        <!-- 头部logo部分 -->
        <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单部分 -->
        <el-form ref="loginForm" v-bind:model='loginForm' v-bind:rules='loginRules'>
            <!-- 手机号码 -->
            <el-form-item prop='mobile'>
                <el-input v-model='loginForm.mobile' placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item  prop='code'>
                <el-input v-model='loginForm.code' style="width:60%" placeholder="验证码"></el-input>
                <el-button plain style="float:right ;width:36%">发送验证码</el-button>
            </el-form-item>
            <el-form-item prop='checked'>
                <el-checkbox v-model='loginForm.checked'>我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button v-on:click='login' type="primary" style="width:100%">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
// 表单检验分为两个步骤:
// 表单检验的步骤:自动校验(检验单个表单数据)  和  手动校验(提交整个表单时校验整个表单数据)
// 自动校验
//    1.定义两对数据:一个表示表单数据,一个表示校验规则
//    2.将这两对数据赋给el-form表单,格式为 v-bind:model='表单数据' 和 v-bind:rules='校验规则'
//    3.为el-form-item标签添加prop属性,属性值为要校验的字段名
//    4.将表单中的每个表单组件双向绑定我们的表单数据中字段名
//    5.制定校验规则:格式是 rules:{ 字段名:[{规则1},{规则2}] }
//          规则类型: required:校验必填项,如果为true,则表示该字段是必填的,不填无法通过校验,但是它只校验是否为null、undefined和空字符串，不检验布尔
//                    message:当不满足规则时的提示信息
//                    pattern:正则表达式,给pattern一个正则表达式,通过就ok不通过就显示提示信息
//                    validator:自定义校验函数  validator(rule, value, callback){ }
//                              此函数有三个参数,从前到后分别是:当前的校验规则,当前要校验的字段,回调函数
//                              无论成功失败这个回调函数都是要执行的,成功执行callback(),失败执行 callback(new Error('错误信息'))
// 手动校验
//     1.首先要知道什么时候进行手动校验:点提交按钮的时候进行手动校验
//     2.获取el-form表单,用ref属性。  首先为表单设置属性ref='名'  然后是获取this.$refs.名
//     3.el-form表单组件实例有一个方法validate,可以去手动校验整个表单
//            this.$refs.名.validate.then().catch()
//            this.$refs.名.validate(回调)     回调有两个参数,第一个表示校验通过,第二个表示校验失败

export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      loginRules: {
        // 手机号的要求:首先不能为空,然后必须是十一位数
        mobile: [{ required: true, message: '手机号不能为空' }, { pattern: /^1[3-9]\d{9}$/, message: '您的手机号格式错误' }],
        // 验证码的要求:首先不能为空,然后必须是六位数
        code: [{ required: true, message: '验证码不能为空' }, { pattern: /^\d{6}$/, message: '验证码格式错误' }],
        // 必须勾选协议,这里用到了自定义检验函数validator
        // 此函数有三个参数,从前到后分别是:当前的校验规则,当前要校验的字段,回调函数
        // 无论成功失败这个回调函数都是要执行的,成功执行callback(),失败执行 callback(new Error('错误信息'))
        checked: [{ validator (rule, value, callback) { value ? callback() : callback(new Error('登陆之前必须要勾选协议')) } }]
      }

    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate().then(() => {
        console.log('校验成功')
      }).catch(() => {
        console.log('校验失败')
      })
    }
  }
}
</script>

<style lang='less' scoped>
    .login{
        height: 100vh;
        display:flex;
        justify-content: center;
        align-items: center;
        &:before{
            content: '';
            background-image:url('../../assets/img/back.png');
            background-size: cover;
            width: 100%;
            height: 100%;
            position: absolute;
        }
        .login-card{
            z-index: 2;
            width: 440px;
            height: 330px;
            padding:5px;
            // box-sizing: border-box;
            background-color: rgba(0, 0,0,0);
            box-shadow: 6px 6px 6px -6px rgba(250, 112, 0, 0.705);
            .title{
                text-align: center;
                margin-bottom: 20px;
                img{
                    height: 40px;
                }
            }
        }
    }
</style>
