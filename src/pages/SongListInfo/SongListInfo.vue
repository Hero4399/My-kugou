<template>
  <div class="songInfo" :class="{'bd-bottom': showPlayBol}">
    <div class="img-box">
      <img :src="songListInfo.imgurl.replace('{size}', '400')">
    </div>
    <div class="intro-box" :class="{'auto': isOpen}">
      <p>{{songListInfo.intro}}</p>
      <div class="intro-icon-box">
        <i class="intro-icon" :class="{'open': isOpen}" @click="showIntro"></i>
      </div>
    </div>
    <!--音乐列表-->
    <ul class="panel-songsList">
      <li class="songs-item" v-for="(item, index) in songList" :key="index">
        <div class="songs-item-name" @click="playMusic(index)">
          <span>{{item.filename}}</span>
        </div>
        <div class="songs-item-download" @click="downloadMusic"></div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Indicator, MessageBox } from 'mint-ui'
export default {
  created () {
    this.id = this.$route.params.id
    this.getSongLists()
    console.log(this.id)
  },
  data () {
    return {
      songList: [],
      songListInfo: {
        imgurl: ''
      },
      isOpen: false,
      headName: ''
    }
  },
  methods: {
    getSongLists () {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'triple-bounce'
      })
      this.$http.get(`/proxy/plist/list/${this.id}?json=true`)
        .then(res => {
          this.songList = res.data.list.list.info
          this.songListInfo = res.data.info.list
          this.headName = res.data.info.list.specialname
          if (this.songList.length > 0) {
            this.$store.dispatch('saveSongList', this.songList)
          }
          this.$store.dispatch('getHeadName', this.headName)
          console.log(this.songList)
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
    },
    showIntro () {
      this.isOpen = !this.isOpen
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
.songInfo{
  padding-top: 3.2143rem;
}
</style>
