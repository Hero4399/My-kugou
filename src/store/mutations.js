export default {
  // 保存音乐信息
  SAVE_AUDIO (state, newObj) {
    state.audio = newObj
  },
  // 展示底部栏同时播放
  SHOW_PLAY (state) {
    state.showPlayBol = true
    state.isPlay = true
  },
  // 点击播放或暂停时切换播放暂停图片
  CHANGE_IS_PLAY (state, bol) {
    state.isPlay = !bol
  },
  // 点击前一首或后一首时切换播放暂停图片
  CHANGE_PLAY (state) {
    // 如果暂停改为播放
    if (!state.isPlay) {
      state.isPlay = true
    }
  },
  // 头部名字赋值
  GET_HEAD_NAME (state, data) {
    // state.headName = ''
    state.headName = data
  },
  // 歌单赋值
  SAVE_SONG_LIST (state, data) {
    state.songList = data
  },
  // 下标赋值
  GET_INDEX (state, index) {
    state.index = index
  },
  // 歌词显示
  SHOW_DETAIL_BOL (state) {
    state.showDetailBol = !state.showDetailBol
  },
  // 设置当前播放时间是否发生变化
  SET_CURRENT (state, data) {
    state.audio.currentFlag = data
  },
  // 设置当前时间
  SET_AUDIO_TIME (state, data) {
    state.audio.currentLength = data
  }
}
