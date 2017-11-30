<template>
  <div class="panel-play">
    <div class="bg-overlay" :style="{'background-image': 'url(' + audioInfo.audioImg + ')'}"></div>
    <div class="play-overlay"></div>
    
    <!--主体部分-->
    <div class="panel-play-bd">
      <div class="panel-play-img">
        <img :src='audioInfo.audioImg'>
      </div>
      <!--显示歌词-->
      <div class="panel-play-lrc-box">
        <div class="panel-play-lrc" :style="{'marginTop': lrcoffset + 'px'}">
          <p v-for="(item, index) in lrc" :key="index"
          :class="{'cur': (item.substr(1,2) * 60 + Math.ceil(item.substr(4,5))) > parseInt(currentTime) || (parseInt(currentTime) > (item.substr(1,2) * 60 + parseInt(item.substr(4,5))) && parseInt(currentTime) < (index < lrc.length - 1 ? lrc[index + 1].substr(1, 2) * 60 + parseInt(lrc[index + 1].substr(4, 5)) : audioInfo.songLength))}">
          {{item.split(']')[1]}}</p>
          <!-- <p v-for="(item, index) in lrc" :key="index"
          :class="{'cur':lrcActive(item, index)}">
          {{item}}</p> -->
          <!-- item.split(']')[1] -->

        </div>
      </div>
      <!--显示进度条-->
      <div class="time-wrap">
        <div class="tiem-start">{{nowM}}:{{nowS}}</div>
        <div class="progress-wrap">
          <div class="progress-bar" @click="toHere($event)">
            <div class="preview-progress" ></div>
            <div class="progress" :style="{'width': updateProgress * 100 + '%'}" >
              <span></span>
            </div>
          </div>
        </div>
        <div class="tiem-end">{{m}} : {{s}}</div>
      </div>
      <!--播放操作-->
      <div class="play-operate">
        <i class="btn-prev" @click="prevMusic"></i>
        <i class="btn-play" :class="{'btn-pause': isPlay, 'btn-play': !isPlay}" @click="pause"></i>
        <i class="btn-next" @click="nextMusic"></i>
      </div>
      <!--下载这首歌-->
      <!-- <div class="download-box" @click="downloadMusic">
        <i></i>
        <a :href="audioInfo.audioSrc" download="music">下载这首歌</a>
      </div> -->
      <a :href="audioInfo.audioSrc" download="music" class="download-box">
        <i></i>下载这首歌</a>
    </div>

  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
export default {
  created () {
    // this.getCurrentTime()
  },
  data () {
    return {
      // 共分钟
      m: 0,
      // 共秒钟
      s: 0,
      // 当前分钟
      nowM: 0,
      // 当前秒钟
      nowS: 0,
      // 播放进度
      updateProgress: 0
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
    prevMusic () {
      this.$store.dispatch('prevMusic')
    },
    downloadMusic () {
      MessageBox({
        title: '温馨提示',
        message: '请在您在手机客户端下载',
        showCancelButton: true
      })
    },
    // 点击控制条
    toHere (event) {
      // 获取点击位置距父容器坐标的距离
      let offset = event.offsetX
      // 获取总的长度
      let progressBar = document.getElementsByClassName('preview-progress')[0].clientWidth
      // 计算当前点击的时所对应的时间
      let nowTime = Math.floor((offset * this.audioInfo.songLength) / progressBar)
      if (nowTime < this.audioInfo.songLength) {
        this.$store.commit('SET_AUDIO_TIME', nowTime)
        this.$store.commit('SET_CURRENT', true)
        // console.log(nowTime, this.currentTime)
      }
    }
    // 歌词是会否被激活
    // lrcActive (item, index) {
    //   // console.log(item)

    //   if (index < this.lrc.length - 1) {
    //     let lrcTime1 = item.substr(1, 2) * 60 + Math.ceil(item.substr(4, 5))
    //     let lrcTime2 = this.lrc[index + 1].substr(1, 2) * 60 + Math.ceil(this.lrc[index + 1].substr(4, 5))
    //     if (lrcTime1 > parseInt(this.currentTime) || (parseInt(this.currentTime) > lrcTime1 && parseInt(this.currentTime) < lrcTime2)) {
    //       return true
    //     }
    //     // if (parseInt(this.currentTime) > lrcTime1 && parseInt(this.currentTime) < lrcTime2) {
    //     //   return true
    //     // }
    //   } else {
    //     // return true
    //   }
    //   //  else {
    //   //   lrcTime2 = this.audioInfo.songLength
    //   // }
    // }

  },
  computed: {
    // 获取音乐信息
    audioInfo () {
      let audio = this.$store.state.audio
      this.$store.dispatch('getHeadName', audio.fileName)
      // 整首歌的时长
      if (audio.songLength % 60 > 9) {
        this.s = parseInt(audio.songLength % 60)
      } else {
        this.s = '0' + parseInt(audio.songLength % 60)
      }
      let minute = parseInt(audio.songLength / 60)
      if (minute > 9) {
        this.m = minute
      } else {
        this.m = '0' + minute
      }
      // 获取当前进度
      this.updateProgress = audio.currentLength / audio.songLength
      // 当前播放时间
      if (parseInt(audio.currentLength % 60) > 9) {
        this.nowS = parseInt(audio.currentLength % 60)
      } else {
        this.nowS = '0' + parseInt(audio.currentLength % 60)
      }
      let minute1 = parseInt(audio.currentLength / 60)
      if (minute1 > 9) {
        this.nowM = minute
      } else if (minute1 > 0 && minute1 < 9) {
        this.nowM = '0' + minute1
      } else {
        this.nowM = '00'
      }
      return audio
    },
    lrc () {
      // 最后一个空数组减去
      let lrcArr = this.audioInfo.lrc.split('\r\n')
      lrcArr = lrcArr.splice(0, lrcArr.length - 1)
      return lrcArr
    },
    currentTime () {
      let currentTime = this.audioInfo.currentLength
      return currentTime
    },
    isPlay () {
      return this.$store.state.isPlay
    },
    lrcoffset () {
      if (this.lrc) {
        let offset = (this.lrc.length - document.querySelectorAll('.cur').length - 1) * -32
          // console.log(offset, this.lrc.length, document.querySelectorAll('.cur').length)
        return offset
      }
    }
  }
}
</script>
<style scoped>
.panel-play, .bg-overlay{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /*display: none;*/
}
.panel-play{
  z-index: 6;
}
.play-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.6);
}
.bg-overlay{
  background: url('images/logo_kugou.png') no-repeat 50%;
  /*background-image: url('http://singerimg.kugou.com/uploadpic/softhead/200/20170222/20170222103548740893.jpg');*/
  background-size: cover;
  -webkit-filter: blur(15px);
  filter: blur(15px);
}
.top-fixed{
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  z-index: 5;
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
  background: url(../../components/TopFixed/images/logo.png) no-repeat;
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
  background: url(../../components/TopFixed/images/search.png) no-repeat;
  background-size: 100%;
  position: absolute;
  top: 1rem;
  right: .7143rem;
  cursor: pointer;
}
.panel-play, .top-goback{
  background: -webkit-linear-gradient(top,rgba(0,0,0,.6),transparent);
}
.top-goback {
  width: 100%;
  line-height: 3rem;
  padding: 0 2.1429rem;
  position: relative;
  text-align: center;
  color: #fff;
  box-sizing: border-box;
}
.page-title{
  height: 3rem;
  line-height: 3rem;
  font-size: 1rem;
}
.goback{
  width: 2.1429rem;
  height: 2.8031rem;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  cursor: pointer;
}
.goback i {
  width: .85714rem;
  height: 1.42857rem;
  margin-top: .687265rem;
  display: inline-block;
  background: url(images/goback_1.png) no-repeat;
  background-size: 100%;
}
.panel-play-bd {
  width: 100%;
  padding-top: 6.0174rem;
  padding-bottom: 2.5rem;
  position: relative;
}
.panel-play-img{
    width: 10.7143rem;
    height: 10.7143rem;
    margin: 1.4286rem auto 0;
}
.panel-play-img>img{
  width:100%;
}
.panel-play-lrc-box {
  margin-top: .8928rem;
  text-align: center;
  color: #afabac;
  height: 3.8rem;
  overflow: hidden;
}
.panel-play-lrc{
  transition: all .5s;
  transform: translateZ(0)
}
.panel-play-lrc p{
  width: 100%;
  height: 1.7857rem;
  line-height: 1.7857rem;
  vertical-align: top;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: .8571rem;
}
.panel-play-lrc p.cur{
  color: #d1c90e;
}
.progress-wrap, .time-wrap {
    -webkit-box-flex: 1;
}
.time-wrap {
  width: 100%;
  padding: .8928rem .7143rem;
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  -webkit-box-orient: horizontal;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.tiem-start, .tiem-end{
    font-size: .7rem;
    color: #dcdcdc;
}
.progress-wrap{
  height: .1785rem;
  margin: 0 .5357rem;
  background: #232228;
  position: relative;
  z-index: 2;
}
.progress-bar {
  width: 100%;
  height: 100%;
}
.preview-progress, .progress {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 0;
  height: 100%;
}
.preview-progress {
  background: #6c6b70;
  width: 100%;
  /* z-index: 50; */
}
.progress, .progress span {
    background: #3195fd;
}
.progress span {
    position: absolute;
    top: 50%;
    right: -.4rem;
    margin-top: -.3572rem;
    width: .7143rem;
    height: .7143rem;
    display: block;
    border-radius: 100%;
}
.play-operate {
    margin: 0 auto;
    font-size: 0;
    text-align: center;
}
.play-operate .btn-download, .play-operate .btn-next, .play-operate .btn-prev {
    width: 2.3214rem;
    height: 2.4rem;
    margin: 0 .8929rem;
    display: inline-block;
    vertical-align: middle;
}
.play-operate .btn-prev {
    background: url(images/play_prev.png) no-repeat;
    background-size: 100%;
}
.play-operate .btn-next {
    background: url(images/play_next.png) no-repeat;
    background-size: 100%;
}
.play-operate .btn-play{
    background: url(images/play_play.png) no-repeat;
    background-size: 100%;
}
.play-operate .btn-pause{
    background: url(images/play_pause.png) no-repeat;
    background-size: 100%;
}
.play-operate .btn-loading, .play-operate .btn-pause, .play-operate .btn-play {
    width: 3.2143rem;
    height: 3.2143rem;
    margin: 0 .8929rem;
    display: inline-block;
    vertical-align: middle;
}
.download-box {
    width: 56.25%;
    height: 2.5rem;
    line-height: 2.5rem;
    margin: 1.0714rem auto 0;
    text-align: center;
    color: #fff;
    background: #259ef7;
    font-size: 1rem;
    border-radius: 5px;
    display: block;
}
.download-box i {
    width: 1.6rem;
    height: 1.6rem;
    display: inline-block;
    vertical-align: middle;
    background: url(../../components/BottomFixed/images/download_icon.png) no-repeat;
    background-size: 100%;
}
</style>
