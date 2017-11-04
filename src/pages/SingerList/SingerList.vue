<template>
  <div class="bd singerList">
    <!--歌手列表-->
    <ul class="panel-img-list">
    <li v-for="(item, index) in singerLists" :key="item.singerid">
    <router-link :to="'/singer/info/' + item.singerid" tag="a">
      <div class="panel-img-left">
        <img :src="item.imgurl.replace('{size}', '400')">
      </div>
      <div class="panel-img-content">
        <p class="panel-img-content-first">{{item.singername}}</p>
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
    this.id = this.$route.params.id
    this.getSingerLists()
    console.log(this.id)
  },
  data () {
    return {
      singerLists: [],
      id: 0,
      headName: ''
    }
  },
  methods: {
    getSingerLists () {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'triple-bounce'
      })
      this.$http.get(`/proxy/singer/list/${this.id}?json=true`)
        .then(res => {
          this.singerLists = res.data.singers.list.info
          this.headName = res.data.classname
          this.$store.dispatch('getHeadName', this.headName)
          // this.songListInfo = res.data.info.list
          console.log(res.data.classname)
        })
        .then(() => {
          Indicator.close()
        })
    }
  }
}
</script>
<style scoped>
.bd{
    width: 100%;
    padding-top: 6.4286rem;
}
.singerList .panel-img-left {
    width: 3.3929rem;
    height: 3.3929rem;
}
.singerList .panel-img-content {
    min-height: 3.3929rem;
    line-height: 3.3929rem;
}
</style>
