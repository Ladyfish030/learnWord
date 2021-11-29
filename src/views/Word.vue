<template>
  <div>
    <div class="header">
      <img src="../assets/arrow.png" class="backBtn" />
      单词卡片
    </div>
    <div class="wordItem" v-if="!testShow">
      <div class="en">
        {{ en }}
      </div>
      <a :href="`https://dict.youdao.com/dictvoice?audio=${en}&type=2`">
        <img src="../assets/fayinwang.png" class="mp3"
      /></a>
      <div class="cn">
        {{ cn }}
      </div>
    </div>
    <button class="btn" @click="add()" v-if="!testShow">{{ tipTxt }}</button>
    <div class="que" v-if="testShow & (testType == 1)">
      <div class="type1">
        <!-- 显示中文回答英文 -->
        <div class="cnAns">
          {{ cn }}
        </div>
        <div>
          <input
            class="que1Input"
            type="text"
            v-model="enAns"
            placeholder="请输入对应英文"
            :class="[
              statue == 'true' ? 'green' : '',
              statue == 'false' ? 'red' : '',
            ]"
          />
        </div>
        <button @click="submit()" class="submit">{{ btnTxt }}</button>
      </div>
    </div>
    <div class="que" v-if="testShow & (testType == 2)">
      <div class="type1">
        <!-- 显示英文选择中文-->
        <div class="enAns">
          {{ en }}
        </div>
        <div>
          <label :class="[cnIndex == 0 ? 'greenCn' : '']"
            ><input
              name="ans"
              type="radio"
              :value="cnAns[0]"
              v-model="cnAnsU"
            />{{ cnAns[0] }}
          </label>
          <label :class="[cnIndex == 1 ? 'greenCn' : '']"
            ><input
              name="ans"
              type="radio"
              :value="cnAns[1]"
              v-model="cnAnsU"
            />{{ cnAns[1] }}
          </label>
          <label :class="[cnIndex == 2 ? 'greenCn' : '']"
            ><input
              name="ans"
              type="radio"
              :value="cnAns[2]"
              v-model="cnAnsU"
            />{{ cnAns[2] }}
          </label>
          <label :class="[cnIndex == 3 ? 'greenCn' : '']"
            ><input
              name="ans"
              type="radio"
              :value="cnAns[3]"
              v-model="cnAnsU"
            />{{ cnAns[3] }}
          </label>
        </div>
        <button @click="submit2()" class="submit">{{ btnTxt }}</button>
      </div>
    </div>
    <div class="finish" v-if="testType == 3">
      <img class="finishImg" src="../assets/提交成功.png" />
      <div class="finishTxt">测试完成，点击左上角按钮返回首页</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
export default {
  name: 'Word',
  components: {},
  data() {
    return {
      wordList: [
        { cn: 'n. 单词', en: 'word' },
        { cn: '2', en: 'ba' },
        { cn: '3', en: 'ca' },
        { cn: '4', en: 'da' },
        { cn: '5', en: 'ea' },
      ],
      index: 0,
      len: 5,
      testShow: false,
      ansIndex: 0,
      tipTxt: '下一个',
      enAns: '',
      // cnAns: '',
      statue: 'waiting',
      btnTxt: '确定',
      testType: 1,
      cnAnsU: '',
      cnIndex: 5,
    }
  },
  computed: {
    en() {
      return this.wordList[this.index].en
    },
    cn() {
      return this.wordList[this.index].cn
    },
    cnAns() {
      return this.wordList[this.index].cnAns
    },
  },
  methods: {
    // mp3() {
    //   axios({
    //     method: 'get',
    //     url: `https://dict.youdao.com/dictvoice?audio=${this.en}&type=2`,
    //   }).then(function (res) {
    //     console.log(res)
    //     console.log(eval(res))
    //   })
    // },
    add() {
      this.index += 1
      if (this.index == this.len - 1) {
        this.tipTxt = '进入测试'
      }
      if (this.index > this.len - 1) {
        this.testShow = true
        this.index = 0
      }
    },
    submit() {
      if (this.statue == 'waiting') {
        if (this.en.toLowerCase() == this.enAns.toLowerCase()) {
          this.statue = 'true'
        } else {
          this.statue = 'false'
        }
        this.btnTxt = '下一个'
      } else {
        this.enAns = ''
        this.index += 1
        if (this.index > this.len - 1) {
          this.testType = 3
        }
        this.btnTxt = '确定'
        this.statue = 'waiting'
      }
    },
    submit2() {
      if (this.statue == 'waiting') {
        for (let i = 0; i < 4; i++) {
          if (this.cnAns[i] == this.cn) {
            this.cnIndex = i
          }
        }
        this.statue = 'true'
        this.btnTxt = '下一个'
      } else {
        this.cnIndex = 5
        this.cnAnsU = ''
        this.index += 1
        if (this.index > this.len - 1) {
          this.testType = 3
          axios({
            method: 'post',
            url: 'http://47.113.186.74/api/done.html',
            headers: {
              // 'Content-Type': 'application/x-www-form-urlencoded',
              // 'Content-Type': 'application/raw',
              'Content-Type': 'text/plain',
            },
            data: {
              username: 'user20',
            },
          }).then((res) => {
            console.log(res)
          })
        }
        this.btnTxt = '确定'
        this.statue = 'waiting'
      }
    },
  },
  mounted() {
    this.testType = localStorage.getItem('type')
      ? localStorage.getItem('type')
      : 1
  },
  created() {
    let that = this
    axios({
      method: 'post',
      url: 'http://47.113.186.74/api/get_qu.html',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/raw',
        'Content-Type': 'text/plain',
      },
      data: {
        username: 'user20',
      },
    }).then(function (res) {
      that.wordList = eval(res.data)
      that.len = that.wordList.length
    })
  },
}
</script>
<style scoped>
.header {
  height: 50px;
  line-height: 50px;
  background-color: rgb(110, 209, 156);
  color: white;
  font-size: 17px;
  text-align: center;
  position: relative;
}
.wordItem {
  width: 100%;
  height: 70vh;
}
.en,
.cnAns,
.enAns {
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  height: 40vh;
  line-height: 50vh;
}
.cn {
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  height: 30vh;
  /* line-height: 30vh; */
}
.btn,
.submit {
  border: none;
  background-color: rgb(110, 209, 156);
  display: block;
  font-size: 18px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10vh;
  width: 70vw;
  height: 10vh;
  line-height: 10vh;
  color: white;
  position: absolute;
  bottom: 10vh;
}
.que1Input {
  font-size: 22px;
  padding: 3vh;
  width: 50vw;
  display: block;
  margin: 0 auto;
}
.green {
  border: rgb(110, 209, 156) 3px solid;
}
.red {
  border: rgb(209, 110, 110) 3px solid;
}
label {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 23px;
}
.backBtn {
  position: absolute;
  height: 40px;
  width: 40px;
  left: 10px;
  top: 5px;
}
.finish {
  height: calc(80vh - 50px);
  background-color: rgb(110, 209, 156);
  padding: 10vh 0;
}
.finishImg {
  display: block;
  width: 80vw;
  margin: 0 auto;
}
.finishTxt {
  color: white;
  font-size: 17px;
  width: 100%;
  text-align: center;
}
.mp3 {
  width: 40px;
  margin: 0 auto;
  margin-bottom: 5vh;
  display: block;
}
.greenCn {
  color: rgb(110, 209, 156);
}
</style>
