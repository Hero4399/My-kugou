import http from 'axios'
export default {
  // 播放音乐
  playMusic (store, index) {
    // store.commit('SHOW_PLAY')
    store.commit('GET_INDEX', index)
    let song = store.state.songList[index]
    let hash = song.hash
    return http.get(`/bproxy/yy/index.php?r=play/getdata&hash=${hash}`)
      .then(res => {
        let data = res.data.data
        console.log(data)
        let newObj = {
          audioSrc: data.play_url,
          audioImg: data.img,
          title: data.audio_name,
          singerName: data.author_name,
          fileName: data.song_name,
          songLength: data.timelength / 1000,
          lrc: data.lyrics,
          currentLength: 0
        }
        store.commit('SAVE_AUDIO', newObj)
        // store.state.audio.audioSrc = data.play_url
        // store.state.audio.audioImg = data.img
        // store.state.audio.title = data.audio_name
        // store.state.audio.singerName = data.author_name
        // store.state.audio.fileName = data.song_name
        // store.state.audio.lrc = data.lyrics
        // store.state.audio.songLength = data.timelength / 1000
      })
  },
  // 获取头部名称
  getHeadName ({commit}, data) {
    commit('GET_HEAD_NAME', data)
  },
  // 存储歌单
  saveSongList ({commit}, data) {
    commit('SAVE_SONG_LIST', data)
  },
  // 下一首
  nextMusic (store) {
    let songList = store.state.songList
    if (store.state.index < songList.length - 1) {
      store.state.index++
    } else {
      store.state.index = 0
    }
    let index = store.state.index
    store.dispatch('playMusic', index)
  },
  // 上一首
  prevMusic (store) {
    let songList = store.state.songList
    if (store.state.index > 0) {
      store.state.index--
    } else {
      store.state.index = songList.length - 1
    }
    let index = store.state.index
    store.dispatch('playMusic', index)
  },
  // 显示歌词
  showDetailBol ({commit}) {
    commit('SHOW_DETAIL_BOL')
  }
}
