<template>
  <div class="background">
    <div class="login">
      <div class="header">
        <div class="title">
          <span :class="log" @click="isLogin">登录</span>
          <span>|</span>
          <span :class="reg" @click="isReg">注册</span>
        </div>
        <img @click="close" src="../static/icons/close.png" />
      </div>
      <div class="main">
        <input v-model="username" placeholder="至少4位用户名" spellcheck="false" type="text" />
        <div class="line" />
        <span>用户名</span>
        <input v-model="password" placeholder="至少6位密码" type="password" />
        <div class="line" />
        <span>密码</span>
        <input v-model="passwordAgain" v-if="reg=='selected'" placeholder="再重复一遍密码" type="password" />
        <div class="line" v-if="reg=='selected'" />
        <span v-if="reg=='selected'">重复密码</span>
        <div class="button" v-if="log=='selected'" @click="login">登录</div>
        <div class="button" v-if="reg=='selected'" @click="register">注册</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        log: 'selected',
        reg: 'unSelected',
        username: '',
        password: '',
        passwordAgain: ''
      }
    },
    methods: {
      isLogin() {
        this.reg = 'unSelected'
        this.log = 'selected'
      },
      isReg() {
        this.log = 'unSelected'
        this.reg = 'selected'
      },
      close() {
        this.$emit('close')
      },
      login() {
        const username = this.username
        const password = this.password
        if (!username) return alert('请填写用户名')
        if (!password) return alert('请填写密码')
        if (username.length < 4) return alert('用户名至少需要4位')
        if (password.length < 6) return alert('密码至少需要6位')
        this.$axios({
          url: '/api/login.html',
          headers: {
            'Content-Type': 'text/plain'
          },
          method: 'post',
          data: {
            username,
            password,
          }
        }).then(
          (res) => {
            console.log("@获取返回信息", res.data);
            if (res.data[0].ret == 1) {
              console.log("登陆失败");
              alert("用户名或密码错误")
            } else {
              console.log("登陆成功");
              this.$store.commit('setUser', res.data[0])
              this.close()
            }
          }
        )
      },
      register() {
        const username = this.username
        const password = this.password
        const passwordAgain = this.passwordAgain
        if (!username) return alert('请填写用户名')
        if (!password || !passwordAgain) return alert('请填写密码')
        if (username.length < 4) return alert('用户名至少需要4位')
        if (password.length < 6) return alert('密码至少需要6位')
        if (password !== passwordAgain) return alert('前后密码不一致')
        this.$axios({
          url: '/api/reg.html',
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'post',
          data: {
            username,
            password,
            plan: 50
          }
        }).then(
          (res) => {
            console.log("@获取返回信息", res.data);
            if (res.data[0].ret == 1) {
              console.log("注册失败");
              alert("用户名或密码错误")
            } else {
              console.log("注册成功");
              this.$store.commit('setUser', res.data[0])
              this.close()
            }
          }
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  .background {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0, 0.5);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .login {
      width: 80vw;
      max-width: 500px;
      height: fit-content;

      .header {
        width: 100%;
        background: #40BC96;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 35px;
        box-sizing: border-box;

        .title {
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            font-size: 28px;
            color: #FFFFFF;
            font-weight: 700;
            letter-spacing: 3px;
          }

          .log {
            color: #F9CC28;
          }

          .selected {
            color: #F9CC28;
          }
        }

        img {
          height: 28px;
          width: 28px;
          cursor: pointer;
        }
      }

      .main {
        width: 100%;
        background: #FFFFFF;
        display: flex;
        flex-direction: column;
        padding: 35px 35px 25px 35px;
        box-sizing: border-box;

        input {
          width: 100%;
          height: 32px;
          border: none;
          box-shadow: none;
          outline: none;
          font-size: 18px;

          &::-webkit-input-placeholder {
            color: #C1CACE;
          }
        }

        span {
          width: 100%;
          color: #97a5aa;
          font-weight: 600;
          font-size: 12px;
          margin-bottom: 25px;
          text-align: left;
        }

        .line {
          width: 100%;
          height: 3px;
          background: #455358;
          margin-top: 2px;
          margin-bottom: 6px;
        }

        .button {
          width: 100%;
          height: 70px;
          background: #3CCFCF;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.5s ease;

          &:hover {
            background: #F9CC28;
            color: #455358;
          }
        }
      }
    }
  }
</style>
