<template>
  <div class="login">
    <!-- 卡片部分 -->
    <el-card class="login-card">
        <!-- 头部logo部分 -->
        <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单部分 -->
        <el-form>
            <!-- 手机号码 -->
            <el-form-item>
                <el-input placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item>
                <el-input style="width:60%" placeholder="验证码"></el-input>
                <el-button plain style="float:right ;width:36%">发送验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

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
