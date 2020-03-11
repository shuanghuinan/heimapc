// 主页的顶部,用到了elementui组件库的布局
// el-row表示行,el-col表示列(分成了24份)
// 要设置对齐方式的话,就要先为el-row的type设置为flex ,然后垂直对齐方式是用align,水平对齐方式是用justify
<template>
  <!-- 只有一行 -->
  <el-row type="flex" align="middle" class="layout-header">
    <!-- 左面,即第一列 -->
    <el-col class="left" :span="12">
      <!-- 图标 -->
      <i @click="fold=!fold" :class="{'el-icon-s-fold':!fold , 'el-icon-s-unfold': fold}"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>

    <!-- 右面,即第二列 -->
    <el-col class="right" :span="12">
      <!-- 因为要为右侧设置对齐样式,所以再放一个el-row标签 -->
      <el-row type="flex" align="middle" justify="end">
        <!-- 头像 -->
        <img :src="this.userInfo.photo" alt />
        <!-- 下拉菜单 -->
        <el-dropdown trigger="click" @command="clickMenu">
          <span class="el-dropdown-link">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">github地址</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      userInfo: '',
      fold: false // 用来控制导航栏是否折叠,默认不折叠
    }
  },
  watch: {
    // 监听fold,当fold发生改变时, 触发公共实例
    fold () {
      eventBus.$emit('changeFold', this.fold)
    }
  },
  methods: {
    // 下拉菜单的点击事件
    clickMenu (command) {
      // 如果点的是info
      if (command === 'info') {
        //
      } else if (command === 'git') {
        // 如果点的是git,则跳转到github地址
        // alert(11)
        window.location.href = 'https://github.com/shuanghuinan/heimapc'
      } else {
        // 如果点击的是exit,则代表退出,要删除token令牌,并进行页面的跳转
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    },

    // 获取个人信息
    getInfo () {
      this.$axios({
        url: '/user/profile'
        // headers: {
        //   Authorization: `Bearer ${token}` // 格式要求 Bearer +token
        // }
      }).then(res => {
        // console.log(res)
        this.userInfo = res.data
      })
    }
  },
  created () {
    // const token = localStorage.getItem('user-token') // 从兜里拿钥匙 也就是从缓存中取token

    // 在页面渲染完以后查询头部的个人信息(头像, 名字), 并显示在主页
    // 请求体参数是Bearer+空格+令牌
    this.getInfo()
    // 在页面触发后,开启监听
    eventBus.$on('changeInfo', () => {
      this.getInfo()
    })
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  height: 60px;
  // background-color: (62, 90, 116);
  .left {
    i {
      font-size: 20px;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 0 5px;
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
}
</style>
