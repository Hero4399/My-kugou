<template>
  <div id="app">
    
    <top-fixed :headTitle="titleName" :bgcolor="bgcolor"></top-fixed>
    <keep-alive>

     <router-view/>
    </keep-alive>
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
    bgcolor () {
      return this.$store.state.bgcolor
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
