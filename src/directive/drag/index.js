import Vue from 'vue'
Vue.directive('drag', {
  bind(el, binding, vnode, oldVnode) {
    el.style.position = 'absolute'
    el.style.cursor = 'move'
    el.onmousedown = function(ev) {
      // 用元素距离视窗的X、Y坐标，减去el元素最近的相对定位父元素的left、top值
      const sX = ev.clientX - el.offsetLeft
      const sY = ev.clientY - el.offsetTop
      document.onmousemove = function(ev) {
        const eX = ev.clientX - sX
        const eY = ev.clientY - sY
        // 不断地更新元素的left、top值
        if (eX < 15) {
          el.style.left = 15 + 'px'
        } else {
          el.style.left = eX + 'px'
        }
        if (eY < 15) {
          el.style.top = 15 + 'px'
        } else {
          el.style.top = eY + 'px'
        }
      }
      document.onmouseup = function() {
        // 清除mousemove事件
        document.onmousemove = null
      }
    }
  }
})
