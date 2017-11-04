import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/Home/Home'
import Rank from '@/pages/Rank/Rank'
import SongList from '@/pages/SongList/SongList'
import Singer from '@/pages/Singer/Singer'
import RankInfo from '@/pages/RankInfo/RankInfo'
import SongListInfo from '@/pages/SongListInfo/SongListInfo'
import SingerList from '@/pages/SingerList/SingerList'
import SingerInfo from '@/pages/SingerInfo/SingerInfo'
import ShowDetail from '@/pages/ShowDetail/ShowDetail'
import Search from '@/pages/Search/Search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/songList',
      name: 'songList',
      component: SongList
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    },
    {
      path: '/rank/info/:id',
      name: 'RankInfo',
      component: RankInfo
    },
    {
      path: '/songList/info/:id',
      name: 'songListInfo',
      component: SongListInfo
    },
    {
      path: '/singer/list/:id',
      name: 'singerList',
      component: SingerList
    },
    {
      path: '/singer/info/:id',
      name: 'singerInfo',
      component: SingerInfo
    },
    {
      path: '/lrc',
      name: 'showDetail',
      component: ShowDetail
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
