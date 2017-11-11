<template>
  <div class="rankInfo" :class="{'bd-bottom': showPlayBol}">
    <!--图片-->
    <div class="rankInfo-img">
      <img :src="aboutInfo.imgurl.replace('{size}', '400')">
      <!--更新时间-->
    <div class="rankInfo-time">
      <span>上次更新时间  :  {{updateTime}}</span>
    </div>
    </div>
    
    <!--音乐列表-->
    <ul class="panel-songsList">
      <li class="songs-item" v-for="(item, index) in songsList" :key="index">
        <div class="songs-item-name" @click="playMusic(index)">
          <span>{{item.filename}}</span>
        </div>
        <div class="songs-item-download" @click="downloadMusic"></div>
        <span class="panel-songs-item-num"
        :class="{'red': index===0, 'orange': index===1, 'yellow': index===2}">{{index+1}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { Indicator, MessageBox } from 'mint-ui'
export default {
  activated () {
    console.log(1)
    this.id = this.$route.params.id
    this.getSongLists()
    console.log(this.id)
  },
  data () {
    return {
      id: 0,
      // 所有歌单
      songsList: [],
      // 相关信息
      aboutInfo: {
        imgurl: ''
      },
      // 头部名称
      headName: ''
    }
  },
  computed: {
    showPlayBol () {
      return this.$store.state.showPlayBol
    },
    updateTime () {
      let date = new Date()
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  },
  methods: {
    getSongLists () {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'triple-bounce'
      })
      this.$http.get(`/proxy/rank/info/?rankid=${this.id}&page=1&json=true`)
        .then(res => {
          this.songsList = res.data.songs.list
          this.aboutInfo = res.data.info
          this.headName = res.data.info.rankname
          if (this.songsList.length > 0) {
            this.$store.dispatch('saveSongList', this.songsList)
          }
          this.$store.dispatch('getHeadName', this.headName)
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
  }
}
</script>
<style scoped>
.songs-item-name {
    padding-left: 2.0674rem;
}
.rankInfo{
  padding-top: 3.2143rem;
  widows: 100%;
}
.rankInfo-img{
  width: 100%;
  height: 12.5rem;
  position: relative;
  overflow: hidden;
}
.rankInfo-img>img{
  width: 100%;
  margin-top: -75px;
}
.rankInfo-time{
    width: 100%;
    height: 2.8rem;
    background: -webkit-linear-gradient(bottom,rgba(0,0,0,.6),transparent);
    position: absolute;
    bottom: 0;
    left: 0;
}
.rankInfo-time span{
  position: absolute;
  bottom: 1.25rem;
  left: 1.07143rem;
  color: #fafff2;
  font-size: .85714rem;
}
.panel-songs-item-num {
  padding: 0 .5rem;
  height: 1.0714rem;
  line-height: 1.0714rem;
  border-radius: .5rem;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -.5357rem;
  text-align: center;
  font-size: .7143rem;
  color: #999;
  display: inline-block;
}
.red{
  background: red;
  color: #fff;
}
.orange{
  background: orange;
  color: #fff;
}
.yellow{
  background: yellow;
  color: #fff;
}
</style>
