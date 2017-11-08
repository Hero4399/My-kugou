<template>
  <div class="top-fixed">
    <!--头部,所有页面都有-->
    <div class="top-hd">
      <a class="logo" href="/" title='酷狗音乐'></a>
      <div class="download-app">
        <span>下载酷狗</span>
      </div>
      <router-link class="btn-search" to="/search"></router-link>
    </div>
    <!--导航页,仅四个页面共有-->
    <div class="top-nav" v-if="isNav">
      <ul>
        <li :class="{'cur': navIndex===0}" @click="changeToHome(0)">
          <span>新歌</span>
        </li>
        <li :class="{'cur': navIndex===1}" @click="changeToRank(1)">
          <span>排行</span>
        </li>
        <li :class="{'cur': navIndex===2}" @click="changeToSong(2)">
          <span>歌单</span>
        </li>
        <li :class="{'cur': navIndex===3}" @click="changeToSinger(3)">
          <span>歌手</span>
        </li>
      </ul>   
    
    
    </div>
    <!--详情页-->
    <div v-else class="top-goback" :class="{'top-color': getBgColor==='white' }" :style="{'background': bgcolor}">
      <p class="page-title">{{headTitle}}</p>
      <div class="goback">
        <i @click="goback" :class="{'grayPic': getBgColor==='white' }"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created () {
    console.log(this.getBgColor)
  },
  data () {
    return {
      navIndex: 0
    }
  },
  props: ['headTitle', 'bgcolor'],
  methods: {
    changeToHome (index) {
      this.$router.push('/')
      this.navIndex = index
    },
    changeToRank (index) {
      this.$router.push('/rank')
      this.navIndex = index
    },
    changeToSong (index) {
      this.$router.push('/songlist')
      this.navIndex = index
    },
    changeToSinger (index) {
      this.$router.push('/singer')
      this.navIndex = index
    },
    goback () {
      this.$router.go(-1)
    }
  },
  computed: {
    isNav () {
      return this.$store.state.isNav
    },
    getBgColor () {
      return this.$store.state.bgcolor
    }
  }
}
</script>
<style scoped>
.top-fixed{
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  z-index: 15;
}
.top-hd{
  position: relative;
  width: 100%;
  padding-top: .0357rem;
  height: 3.2143rem;
  line-height: 3rem;
  background: #2ca2f9;
}
.top-hd .download-app, .top-hd .logo {
  display: inline-block;
  vertical-align: middle;
}
.top-hd .logo{
  width: 7.286rem;
  height: 1.67857rem;
  margin-left: .7143rem;
  background: url(images/logo.png) no-repeat;
  background-size: 100%;
}
.top-hd .download-app span{
  width: 5.7143rem;
  height: 1.7143rem;
  line-height: 1.7143rem;
  margin-left: .7143rem;
  border: 1px solid #fff;
  border-radius: .3571rem;
  display: block;
  text-align: center;
  color: #fff;
  font-size: .8571rem;
}
.top-hd .btn-search{
  width: 1.2143rem;
  height: 1.2143rem;
  background: url(images/search.png) no-repeat;
  background-size: 100%;
  position: absolute;
  top: 1rem;
  right: .7143rem;
  cursor: pointer;
}
.top-nav{
  width: 100%;
  background: #fff;
  height: 3.2143rem;
  line-height: 3rem;
  box-shadow: 0 0.1785rem 0.1785rem 0 #f4f4f4;
}
.top-nav ul{
  width: 100%;
  padding: 0 .7143rem;
  display: -webkit-box;
  display: box;
  box-sizing: border-box;
}
.top-nav li{
  width: 20%;
  text-align: center;
  -webkit-box-flex: 1.0;
  list-style: none;
  font-size: 1.1429rem;
}
/*.top-nav li a{
  display: block;
  color: #333;
  font-size: 1.1429rem;
  box-sizing: border-box;
}*/
.cur{
  border-bottom: .2143rem solid #33a3f5
}
.top-goback{
  width: 100%;
  line-height: 3rem;
  background: -webkit-linear-gradient(top,rgba(0,0,0,.6),transparent);
  padding: 0 2.1429rem;
  position: relative;
  text-align: center;
  color: #fff;
  box-sizing: border-box;
}
.top-color{
  color: #000;
  box-shadow: 0 0.1785rem 0.1785rem 0 #f4f4f4;
}
.page-title {
  height: 3rem;
  line-height: 3rem;
  font-size: 1rem;
}
.goback {
  width: 2.1429rem;
  height: 2.8031rem;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  cursor: pointer;
}
.goback>i{
  width: .85714rem;
  height: 1.42857rem;
  margin-top: .687265rem;
  display: inline-block;
  background: url('images/goback_1.png') no-repeat;
  background-size: 100%;
}
.goback>i.grayPic{
  background: url('images/goback.png') no-repeat;
  background-size: 100%;
}
/*.top-nav li.cur a{
  border-bottom: .2143rem solid #33a3f5
}*/
</style>
