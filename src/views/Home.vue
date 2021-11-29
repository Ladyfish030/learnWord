<template>
    <div class="home">
        <Login v-if="showLogin" @close="showLogin=false" />
        <div v-else class="main">
            <div class="header">两周搞定四级单词</div>
            <img src="../static/icons/logo.svg" />
            <div class="start" @click="start">现在开始</div>
        </div>
        <div class="info" @click="goGit">© 2021-2022 Ladyfish030@GitHub</span></div>
    </div>
</template>

<script>
import Login from '@/components/Login'

export default {
  name: 'home',
  components: {
    Login
  },
  mounted () {
    console.log(this.user.uaername);
    this.showLogin = this.user.uaername?false:true
    console.log(this.showLogin);
    // this.$event.on('login', this, () => { this.showLogin = true })
    // console.log(this.showLogin);
  },
  data () {
    return {
      showLogin: true,
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    goGit () {
      window.location.href = 'https://github.com/Ladyfish030/learnWord'
    },
    start(){
      console.log(this.user.uaername);
      if (this.user.username){
        this.$router.push('/learn')
      }
      else{
        this.showLogin = true
      }
    }
  }
}
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  background: #F0F0F0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.main {
  height: fit-content;
  padding: 110px 30px;
  box-sizing: border-box;
  max-width: 1000px;
  margin: 0 auto;
}

img{
  width: 150px;
  height: 150px;
}

.header {
  width: 100%;
  color: #40BC96;
  text-align: center;
  font-size: 36px;
  letter-spacing: 2px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 50px;
}

.start {
  width: 240px;
  height: 64px;
  margin: 50px auto 0 auto;
  background: #3CCFCF;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 2px;
  text-decoration: none;
  transition: all 0.5s ease;
  cursor: pointer;
}

.start:hover {
  background: #F9CC28;
  color: #455358;
}

.info {
  position: absolute;
  bottom: 0;
  height: 80px;
  width: 100%;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 500;
  color: #999999;
  line-height: 30px;
  cursor: pointer;
}

.info span {
  font-size: 14px;
}
</style>
