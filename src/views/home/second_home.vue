<template>
  <div class="second-home">
    <!-- 日历组件 -->
    <el-aside class="Mytime">
      <el-calendar v-model="value"></el-calendar>
    </el-aside>
    <!-- 每日一汤 -->
    <div class="MyContent">
      <h2>壮士,可要来一碗毒鸡汤</h2>
      <div>{{list[index]}} </div>
      <el-button @click="getnum" icon="el-icon-refresh" round type="warning" >换一碗</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: new Date(),
      list: [
        '每天多一点点的努力，不为别的，只为了日后能够多一些选择，选择云卷云舒的小日子，选择自己喜欢的人。',
        '如果再见不用红着脸，是否还能借点钱。',
        '我亲眼看着你走上台，不知道你是将要献丑，还是出丑。',
        ' 你所有的忧伤，都来自于你的余额。',
        '你是转角遇到爱，可你想过对方吗？他是转角遇到鬼呀哈哈哈哈哈哈。',
        '人生不如意何止八九，可与人言者何至二三。',
        '女为悦己者容，男为悦己者穷!',
        '当你觉得又丑又穷的时候，不要悲伤，至少你的判断还是正确的。',
        '你之所以活得累，是因为心里装了多余的东西，跟吃饱了撑的是一个道理。',
        '你羡慕的生活背后，都有你吃不了的苦。道理都懂，但是就像鱼活在水里，也死在水里。',
        '不怕自己没能耐，就怕自己以为能耐。',
        '幸亏当事者迷，不然真的看清事实真相，很多人是承受不来的。',
        '你我都渴望成功，哪怕要付出很多，但我们连冬天早点起床都做不到。',
        '没有男朋友就要减肥，不然，“对不起，让一下，你挡住我了”，就是你的偶遇方式。',
        '人生很多事，终究是会随着时间好起来的。像很多人原本只是胖，久了就变好胖。',
        '我们无法拉伸生命的长度，但是我们可以拓宽生命的宽度，这句话就是告诉你，这辈子，长高就别想了，长胖是可以的，努力吧。',
        '人们都说陪伴是最长情的告白，其实，长得好看是陪伴，长得丑就是纠缠。',
        '别不好意思拒绝别人，反正那些好意思难为你的人，都不是什么好人。'
      ],
      index: 0
    }
  },
  methods: {
    getnum () {
      this.index = Math.floor(Math.random() * this.list.length)
      // alert(index)
    }
  }
}
</script>

<style lang='less' scoped>
.second-home {
  position: relative;
  background-image: url("../../assets/img/second_bg.gif");
  background-size: cover;
  height: calc(100vh - 60px);
  /deep/.Mytime {
    margin-top: 100px;
    position: absolute;
    top: 0;
    right: 0;
    height: 400px;
    width: 400px;
    background-color: rgba(1, 1, 1, 0.2);
    .el-calendar {
      // height: 300px;
      line-height: 15px;
      height: 400px;
      background-color: rgba(1, 1, 1, 0.2);

      .el-calendar__header {
        // background-color: rgba(1, 1, 1, 0.2);
        // display: flex;
        text-align: center;
        .el-calendar__title {
          height: 80px;
          line-height: 100px;
        }
        .el-button-group {
          width: 150px;
          padding-top: 35px;
          .el-button--plain{
            // margin-bottom: 5px;
            margin:5px;
            width: 40px;
            padding: 2px;
          }
        }
      }
      .el-calendar__body {
        th{
          color:cornflowerblue
        }
        .el-calendar-table__row {
          .el-calendar-day {
            height: 30px;
          }
        }
      }
    }
  }
  .MyContent{
    background-color: rgba(1, 1, 1, 0.3);
    position: absolute;
    top: 130px;
    padding: 20px 20px 40px;
    width: 300px;
    height: 330px;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    div{
      height: 200px;
    }
    .el-button{
      margin-top: 30px;
    }
  }
}
</style>
