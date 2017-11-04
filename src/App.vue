<template>
  <div id="app">
    
    <top-fixed :headTitle="titleName"></top-fixed>
    
      <!--<router-view :class="{'hide': showDetailBol}"/>
    <bottom-fixed :class="{'hide': showDetailBol}"></bottom-fixed>
    <show-detail :class="{'hide': !showDetailBol}"></show-detail>-->
     <router-view/>
    <bottom-fixed></bottom-fixed>
  </div>
</template>

<script>
import TopFixed from '@/components/TopFixed/TopFixed'
import BottomFixed from '@/components/BottomFixed/BottomFixed'
// import ShowDetail from '@/components/ShowDetail/ShowDetail'
export default {
  components: {
    TopFixed,
    BottomFixed
    // ShowDetail
  },
  computed: {
    titleName () {
      return this.$store.state.headName
    },
    showDetailBol () {
      return this.$store.state.showDetailBol
    }
  }
}
</script>

<style>
#app {
  
}
</style>
