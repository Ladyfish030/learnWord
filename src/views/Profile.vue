<template>
  <div class="profile">
    <div class="header">
      <!-- <div class="top">个人中心</div> -->
      <div class="avater">
        <img src="../static/icons/头像.png" />
      </div>
      <div class="username">{{ username }}</div>
    </div>

    <div class="content">
      基本设置
      <div class="plan">
        <div class="title">
          每组单词量
          <input
            type="number"
            class="num"
            v-model="num"
            @blur="setNum()"
            oninput="if(value.length>1)value=value.slice(0,2)"
            placeholder="50"
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
  name: 'profile',
  data() {
    return {
      num: null,
      type: null,
    }
  },
  computed: {
    username() {
      return this.$store.state.user
    },
  },
  methods: {
    setNum() {
      localStorage.setItem('num', this.num)
      axios({
        method: 'post',
        url: 'http://47.113.186.74/api/change_plan.html',
        headers: {
          'Content-Type': 'text/plain',
        },
        data: {
          username: this.$store.state.user,
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
.profile {
  /* background-color: #76bc98; */
  /* height: 100%; */
  width: 100%;
  padding: 0;
  margin: 0;
  margin-top: 15vh;
  font-size: 17px;
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
