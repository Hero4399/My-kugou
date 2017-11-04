<template>
  <!--底部播放-->
  <div class="ft-player" v-show="showPlayBol" :class="{'hide': hideBol}">
    <div id="player" style="display: none;">
    <audio id="kugou" width="100%" controls :src="audioInfo.audioSrc" autoplay @timeupdate="change()"  @ended="next()"></audio>
    </div>
    <router-link to="/lrc" class="ft-go-info">
      <div class="ft-left">
        <img :src="audioInfo.audioImg">
      </div>
      <div class="ft-center">
        <p class="ftSongName">{{audioInfo.fileName}}</p>
        <p class="ftUserName">{{audioInfo.singerName}}</p>
      </div>
    </router-link>
    <div class="ft-right">
      <i :class="{'btn-pause': isPlay, 'btn-play': !isPlay}" @click="pause"></i>
      <i class="btn-next" @click="nextMusic"></i>
      <i class="btn-download" @click="downloadMusic"></i>
    </div>
    
  </div>
  <!--底部播放结束-->
</template>
<script>
import { MessageBox } from 'mint-ui'
export default {
  computed: {
    audioInfo () {
      return this.$store.state.audio
    },
    showPlayBol () {
      return this.$store.state.showPlayBol
    },
    isPlay () {
      return this.$store.state.isPlay
    },
    index () {
      return this.$store.state.index
    },
    showDetailBol () {
      return this.$store.state.showDetailBol
    },
    hideBol () {
      return this.$store.state.hideBol
    }
  },
  methods: {
    pause () {
      if (this.isPlay) {
        document.getElementById('kugou').pause()
      } else {
        document.getElementById('kugou').play()
      }
      this.$store.commit('CHANGE_IS_PLAY', this.isPlay)
    },
    nextMusic () {
      this.$store.dispatch('nextMusic')
    },
    downloadMusic () {
      MessageBox({
        title: '温馨提示',
        message: '请在您在手机客户端下载',
        showCancelButton: true
      })
    },
    change () {
      var time = document.getElementById('kugou').currentTime
      if (this.audioInfo.currentFlag) {
        // 注意:此处不能使用time, 因为值发生变化
        document.getElementById('kugou').currentTime = this.audioInfo.currentLength
        this.$store.commit('SET_CURRENT', false)
      } else {
        this.$store.commit('SET_AUDIO_TIME', time)
      }
    },
    // 当前歌曲结束自动下一首
    next () {
      this.$store.dispatch('nextMusic')
    }
  }
}
</script>
<style scoped>
.ft-player{
  width: 100%;
  height: 4.2143rem;
  position: fixed;
  left: 0;
  bottom: 0;
  background: rgba(0,0,0,.9);
  color: #fff;
  font-size: 0;
}
.hide{
  display: none;
}
.ft-go-info {
  width: 65%;
  display: block;
}
.ft-left {
  width: 3.75rem;
  height: 3.75rem;
  margin: .2143rem .535rem .2143rem .2143rem;
}
.ft-left img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.ft-center{
  width: 65%;
}
.ft-center, .ft-left{
  display: inline-block;
  vertical-align: middle;
}
.ftSongName{
  width: 100%;
  line-height: 1.7;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: .8571rem;
  color: #fff;
}
.ftUserName{
  line-height: 1.3;
  font-size: .7143rem;
  color: #888;
}
.ft-right {
  position: absolute;
  top: 1.0714rem;
  right: .7143rem;
}
.btn-pause, .btn-next, .btn-download, .btn-play{
  width: 1.786rem;
  height: 1.786rem;
  margin-left: 1rem;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
.btn-pause {
  background: url(images/pause_icon.png) no-repeat;
  background-size: 100%;
}
.btn-play{
  background: url(images/play_icon.png) no-repeat;
  background-size: 100%;
}
.btn-next{
  background: url(images/next_icon.png) no-repeat;
  background-size: 100%;
}
.btn-download{
  background: url(images/download_icon.png) no-repeat;
  background-size: 100%;
}
</style>
