<template>
<div>
  <div class="home" :class="{'bd-bottom': showPlayBol}">
    <!--焦点轮播图-->
    <div class="mod-slider">
          <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in banner" :key="index">
            <a :href="item.extra.tourl">
              <img :src="item.imgurl" :title="item.title">
            </a>
      </mt-swipe-item>
    </mt-swipe> 
    </div>
    <!--轮播图结束-->
    <!--音乐列表-->
    <ul class="panel-songsList">
      <li class="songs-item" v-for="(item, index) in songsList" :key="index">
        <div class="songs-item-name" @click="playMusic(index)">
          <span>{{item.filename}}</span>
        </div>
        <div class="songs-item-download" @click="downloadMusic"></div>
      </li>
    </ul>
  </div>
  </div>
</template>
<script>
import { Indicator, MessageBox } from 'mint-ui'
export default {
  created () {
    this.getInfo()
  },
  components: {
  },
  data () {
    return {
      banner: [],
      songsList: []
    }
  },
  methods: {
    getInfo () {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'triple-bounce'
      })
      this.$http.get(process.env.API_HOST + '?json=true')
        .then(res => {
          this.banner = res.data.banner
          this.songsList = res.data.data
          if (this.songsList.length > 0) {
            this.$store.dispatch('saveSongList', this.songsList)
          }
        })
        .then(() => {
          Indicator.close()
        })
    },
    playMusic (index) {
      this.$store.commit('SHOW_PLAY')
      this.$store.dispatch('playMusic', index)
    },
    downloadMusic () {
      MessageBox({
        title: '温馨提示',
        message: '请在您在手机客户端下载',
        showCancelButton: true
      })
    }
  },
  computed: {
    showPlayBol () {
      return this.$store.state.showPlayBol
    }
  }
}
</script>
<style scoped>
.home{
  width: 100%;
  padding-top: 6.4286rem;
}
.mod-slider{
  width: 100%;
  overflow: hidden;
  margin-top: .3571rem;
  background: #fff;
  position: relative;
}
.mod-slider .mint-swipe{
  height: 8.5714rem;
}
.swipe-wrap{
  position: relative;
  overflow: hidden;
}
.mint-swipe-item a, .mint-swipe-item a img{
  max-width: 100%;
  height: 8.5714rem;
  margin: 0 auto;
  display: block;
}
/*无效*/
/*.mt-swipe .mint-swipe-indicator{
  width: .5714rem !important;
  height: .5714rem !important;
  display: inline-block;
  border-radius: 100%;
  background: hsla(0,0%,100%,.6);
  box-shadow: 0 1px 1px #f4f4f4;
}*/

</style>
