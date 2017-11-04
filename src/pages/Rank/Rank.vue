<template>
<div class="rank">
  <ul class="panel-img-list">
    <li v-for="(item, index) in rankLists" :key="item.id">
    <router-link :to="'/rank/info/' + item.rankid" tag="a">
      <div class="panel-img-left">
        <img :src="item.imgurl.replace('{size}', '400')">
      </div>
      <div class="panel-img-content">
        <p>{{item.rankname}}</p>
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
    this.getRankLists()
  },
  data () {
    return {
      rankLists: []
    }
  },
  methods: {
    getRankLists () {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'triple-bounce'
      })
      this.$http.get('/proxy/rank/list&json=true')
        .then(res => {
          this.rankLists = res.data.rank.list
          // console.log(this.rankLists)
        })
        .then(() => {
          Indicator.close()
        })
    }
  }
}
</script>
<style>
.rank{
  width: 100%;
  padding-top: 6.4286rem;
}
/*.panel-img-list li a{
  display: block;
  position: relative;
  margin-left: .7143rem;
  padding: .7143rem 2.14286rem .7143rem 6.4286rem;
  border-bottom: 1px solid #e5e5e5;
}
.panel-img-left{
  position: absolute;
  top: .7143rem;
  left: 0;
  width: 5.3751rem;
  height: 5.3751rem;
}
.panel-img-left img{
  width: 100%;
}
.panel-img-content{
  min-height: 5.3751rem;
  line-height: 5.3751rem;
  display: block;
  font-size: 1.0714rem;
  color: #333;
}
.panel-img-right{
  position: absolute;
  top: 0;
  right: 0;
  width: 2.14286rem;
  height: 100%;
  text-align: center;
  display: block;
  background: url(images/arrow_icon.png) no-repeat center center;
  background-size: 30%;
}*/
</style>
