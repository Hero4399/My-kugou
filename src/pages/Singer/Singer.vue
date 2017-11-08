<template>
  <div class="singer" :class="{'bd-bottom': showPlayBol}">
  <ul class="singer-class-list">
    <li>
      <router-link :to="'/singer/list/' + list[0].classid">
        <i class="singer-list-arrow"></i>
        热门歌手
      </router-link>
    </li>
  </ul>
  <ul class="singer-class-list">
    <li>
      <router-link :to="'/singer/list/' + list[1].classid">
        <i class="singer-list-arrow"></i>
        华语男歌手
      </router-link>
    </li>
    <li>
      <router-link :to="'/singer/list/' + list[2].classid">
        <i class="singer-list-arrow"></i>
        华语女歌手
      </router-link>
    </li>
    <li>
      <router-link :to="'/singer/list/' + list[3].classid">
        <i class="singer-list-arrow"></i>
        华语组合
      </router-link>
    </li>
  </ul>
  <ul class="singer-class-list">
    <li>
      <router-link :to="'/singer/list/' + list[4].classid">
        <i class="singer-list-arrow"></i>
        日韩男歌手
      </router-link>
    </li>
    <li>
      <router-link :to="'/singer/list/' + list[5].classid">
        <i class="singer-list-arrow"></i>
        日韩女歌手
      </router-link>
    </li>
    <li>
      <router-link :to="'/singer/list/' + list[6].classid">
        <i class="singer-list-arrow"></i>
        日韩组合
      </router-link>
    </li>
  </ul>
  <ul class="singer-class-list">
    <li>
      <router-link :to="'/singer/list/' + list[7].classid">
        <i class="singer-list-arrow"></i>
        欧美男歌手
      </router-link>
    </li>
    <li>
      <router-link :to="'/singer/list/' + list[8].classid">
        <i class="singer-list-arrow"></i>
        欧美女歌手
      </router-link>
    </li>
    <li>
      <router-link :to="'/singer/list/' + list[9].classid">
        <i class="singer-list-arrow"></i>
        欧美组合
      </router-link>
    </li>
  </ul>
</div>
</template>
<script>

export default {
  created () {
    this.$http.get('/proxy/singer/class&json=true')
      .then(res => {
        this.list = res.data.list
        console.log(this.list)
      })
  },
  data () {
    return {
      list: [{ classid: '' }, { classid: '' }, { classid: '' }, { classid: '' }, { classid: '' }, { classid: '' }, { classid: '' }, { classid: '' }, { classid: '' }, { classid: '' }]
    }
  },
  computed: {
    showPlayBol () {
      return this.$store.state.showPlayBol
    }
  }
}
</script>
<style>
.singer{
  width: 100%;
  padding-top: 6.4286rem;
}
.singer-class-list{
  margin: 1rem .7143rem 1.0714rem;
  background: #fbfbfb;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
}
.singer-class-list li:first-child {
    border-top: none;
}
.singer-class-list li {
    border-top: 1px solid #e4e4e4;
}
.singer-class-list a {
    padding: .8rem;
    display: block;
    font-size: 1rem;
    color: #333;
}
.singer-list-arrow {
    width: .57143rem;
    height: 1rem;
    margin-top: .2rem;
    background: url('arrow_icon.png') no-repeat;
    background-size: 100%;
    float: right;
    display: block;
}
</style>
