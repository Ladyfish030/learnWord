<template>
  <div class="all">
    <div class="header">
      <div class="top">个人中心</div>
      <div class="avater">
        <img src="../assets/头像.png" />
      </div>
      <div class="username">{{ username }}</div>
    </div>

    <div class="content">
      基本设置
      <div class="box1">
        <div class="title">
          每组单词量
          <input
            type="number"
            class="num"
            v-model="num"
            @blur="setNum()"
            oninput="if(value.length>1)value=value.slice(0,2)"
          />
        </div>
      </div>
      <div class="box2">
        <div class="title">测试题型</div>

        <label
          ><input
            name="type"
            type="radio"
            value="1"
            v-model="type"
            @click="changeType(1)"
          />中文释义拼词汇
        </label>
        <label
          ><input
            name="type"
            type="radio"
            value="2"
            v-model="type"
            @click="changeType(2)"
          />英文释义选词
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'My',
  data() {
    return {
      username: 324,
      num: null,
      type: null,
    }
  },
  methods: {
    setNum() {
      localStorage.setItem('num', this.num)
      axios({
        method: 'post',
        url: 'http://47.113.186.74/api/change_plan.html',
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          // 'Content-Type': 'application/raw',
          'Content-Type': 'text/plain',
        },
        data: {
          username: 'user20',
          plan: this.num,
        },
      }).then(function (res) {
        console.log(res)
      })
    },
    changeType(v) {
      localStorage.setItem('type', v)
    },
  },
  mounted() {
    this.type = localStorage.getItem('type')
    this.num = localStorage.getItem('num')
  },
}
</script>
<style scoped>
.all {
  padding: 0;
  margin: 0;
  font-size: 17px;
}
.top {
  height: 60px;
  line-height: 60px;
  width: 100%;
  text-align: center;
  color: white;
}
.header {
  background: rgb(110, 209, 156);
  padding: 0 30px 30px 30px;
}
img {
  border-radius: 50%;
  border: white 2px solid;
  height: 60px;
  width: 60px;
  vertical-align: bottom;
}
.avater {
  display: inline-block;
}
.username {
  color: white;
  display: inline-block;
  font-size: 18px;
  margin: 0 10px;
  height: 60px;
  vertical-align: middle;
}
.num {
  width: 80px;
}
</style>
