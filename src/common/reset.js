// 重置HTML的font-size
function resetFontSize () {
  // 获取屏幕的宽度
  var windowW = document.documentElement.clientWidth
  // 获取比例,以iPhone6为例
  var scale = windowW / 375
  // 获取新字体大小
  var newFontSize = 18 * scale
  // 赋值
  document.getElementsByTagName('html')[0].style.fontSize = newFontSize + 'px'
}
// 监听浏览器大小的变化
window.addEventListener('resize', function () {
  resetFontSize()
}, false)
resetFontSize()
