<template>
  <div class="search">
    <!--搜索框-->
    <div class="search-box">
      <div class="search-form-box">
        <form class="searchform">
          <span class="search-icon"></span>
          <input type="text" placeholder="歌手/歌名/拼音" name="keyword"
           class="search-keyword" v-model="keyword" @focus="focus" 
           @blur="blur">
           <input type="button" value="搜索" class="search-btn" :class="{'search-disabled-btn': !searchBol}" :disabled="!searchBol"  @click="searchResult">
        </form>
      </div>
    </div>
    <!--热门-->
    <div class="hot-search" v-show="!resultBol">
      <div class="hot-search-hd">
        最近热门
      </div>
      <ul class="hot-search-list">
        <li v-for="(item, index) in searchList" :key="index">
          <span class="hot-keyword" @click="searchHot(item.keyword)">{{item.keyword}}</span>
        </li>
      </ul>
    </div>
    <!--搜索结果-->
    <div class="search-result" v-show="resultBol">
      <div class="search-result-hd">
        共有{{songsList.length}}条结果
      </div>
      <ul class="panel-songsList">
        
      <li class="songs-item" v-for="(item, index) in songsList" :key="index">
        <div class="songs-item-name" @click="playMusic(index)">
          <span>{{item.filename}}</span>
        </div>
        <div class="songs-item-download" @click="downloadMusic"></div>
      </li>
    </ul>
    </div>
    <!--结束搜索结果-->
  </div>
</template>
<script>
import { Indicator, MessageBox } from 'mint-ui'
export default {
  created () {
    this.getInfo()
    this.$store.dispatch('getHeadName', this.headName)
    // console.log(this.keyword)
  },
  components: {
  },
  data () {
    return {
      // 歌单
      songsList: [],
      // 搜索条
      searchList: [],
      // 标题
      headName: '搜索',
      // 显示搜索结果
      resultBol: false,
      // 搜索框是否可点击
      searchBol: false,
      keyword: ''
    }
  },
  methods: {
    focus () {
      this.searchBol = true
    },
    blur () {
      this.searchBol = false
    },
    getInfo () {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'triple-bounce'
      })
      this.$http.get('/aproxy/api/v3/search/hot?format=json&plat=0&count=30')
        .then(res => {
          console.log(res.data)
          this.searchList = res.data.data.info
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
    searchResult () {
      if (this.keyword !== '') {
        Indicator.open({
          text: 'Loading...',
          spinnerType: 'snake'
        })
        this.$http.get(`/aproxy/api/v3/search/song?format=json&keyword=${this.keyword}&page=1&pagesize=20&showtype=1`)
       .then(res => {
         if (res.data.data.info.length > 0) {
           this.resultBol = true
           this.songsList = res.data.data.info
           this.$store.dispatch('saveSongList', this.songsList)
         }
         console.log(res.data.data.info)
       })
       .then(() => {
         Indicator.close()
       })
        this.searchBol = true
      }
    },
    searchHot (keyword) {
      this.keyword = keyword
      this.searchResult()
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
.search{
  width: 100%;
  padding-top: 6.4286rem;
}
.search-box {
    padding: .7143rem;
    background: #fbfbfb;
}
.search-form-box {
    font-size: 0;
}
.searchform {
    position: relative;
    font-size: 0;
}
.search-icon {
    width: 1.2143rem;
    height: 1.9285rem;
    display: block;
    position: absolute;
    top: 1px;
    left: .3714rem;
    background: url(search_icon.png) no-repeat;
    background-size: 100%;
}
.search-btn, .search-keyword {
    display: inline-block;
    vertical-align: middle;
    font-size: 1rem;
}
.search-keyword {
    width: 70%;
    padding: .4rem .0714rem .4rem 1.7rem;
    margin-right: 3%;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
}
.search-btn {
    width: 17.25%;
    height: 2.0714rem;
    line-height: 2.0714rem;
    border: none;
    border-radius: 5px;
    text-align: center;
    background: #2ba2fa;
    color: #fff;
}
.search-disabled-btn {
    color: #959595;
    background: #e5e5e5;
}
.hot-search-hd {
    height: 2.8571rem;
    line-height: 2.8571rem;
    padding-left: .8929rem;
    border-bottom: 1px solid #ccc;
    font-size: .8571rem;
    color: #2ca3f5;
}
.hot-search-list {
    margin-left: .7143rem;
    overflow: scroll;
}
.hot-search-list span{
    height: 3.5714rem;
    line-height: 3.5714rem;
    border-bottom: 1px solid #e5e5e5;
    display: block;
    color: #333;
    font-size: 1.1429rem;
    text-indent: .1786rem;
    position: relative;
}
.search-result-hd {
    height: 1.5714rem;
    line-height: 1.5714rem;
    background: #e6e6e6;
    padding-left: .9rem;
    font-size: .7857rem;
    color: #5d5d5d;
}
</style>
