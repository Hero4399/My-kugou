<template>
  <div class="songList">
  <ul class="panel-img-list">
    <li v-for="(item, index) in songListInfo" :key="item.id">
    <router-link :to="'/songList/info/' + item.specialid" tag="a">
      <div class="panel-img-left">
        <img :src="item.imgurl.replace('{size}', '400')">
      </div>
      <div class="panel-img-content">
        <p class="panel-img-content-first">{{item.specialname}}</p>
        <p class="panel-img-content-sub">
          <i class="icon-music"></i>
          {{item.playcount}}
        </p>
      </div>
      <div class="panel-img-right"></div>
    </router-link>
     </li>
  </ul>
</div>
</template>
<script>
import { Indicator } from 'mint-ui'
export default {
  created () {
    this.getSongList()
  },
  data () {
    return {
      songListInfo: []
    }
  },
  methods: {
    getSongList () {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'triple-bounce'
      })
      this.$http.get('/proxy/plist/index&json=true')
        .then(res => {
          this.songListInfo = res.data.plist.list.info
          console.log(this.songListInfo)
        })
        .then(() => {
          Indicator.close()
        })
    }
  }
}
</script>
<style>
.songList{
  width: 100%;
  padding-top: 6.4286rem;
}
.songList .panel-img-content-first {
    padding-top: 1.4286rem;
}
.songList .panel-img-content-sub {
    color: #9b9b9b;
    font-size: .7857rem;
}
.icon-music {
    width: .7143rem;
    height: .7143rem;
    margin-top: .10714rem;
    margin-right: .2857rem;
    display: inline-block;
    background: url('images/icon_music.png') no-repeat;
    background-size: 100%;
}
.songList .panel-img-content {
    line-height: 1.5;
    font-size: 1rem;
}
</style>
