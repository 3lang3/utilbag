/**
 * 平滑滚动到顶部
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}

/**
 * 返回当前滚动位置
 * @param {element} el
 * @return {number}
 */
export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
})

/**
 * 移动端dialog滚动穿透
 * dialog调起时 调用active, 隐藏时调用disable
 * @return {{ active:() => void, disable:() => void }} 
 */
export const lockBody = () => {
  const active = () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px;'
  }
  const disable = () => {
    const body = document.body
    body.style.position = ''
    const top = body.style.top
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top)
    body.style.top = ''
  }
  return { active, disable }
}

/**
 * 禁用右键 选择 复制事件
 * @return {{ active: () => void, disable: () => void }}
 */
export const disableCopyEvent = () => {
  const events = ['contextmenu', 'selectstart', 'copy']
  let funcRef;
  const active = () => {
    funcRef = []
    events.forEach(ev => {
      let fn = event => event.returnValue = false
      funcRef.push(fn)
      document.addEventListener(ev, fn)
    })
  }
  const disable = () => {
    events.forEach((ev, i) => {
      document.removeEventListener(ev, funcRef[i])
    })
  }
  return { active, disable }
}

/**
 * 禁用键盘事件
 * @returns {{ active: () => void, disable: () => void }}
 */
export const disableKeydown = () => {
  let wrapper;
  const active = keyCode => {
    wrapper = event => {
      if (_compareKeycode(event, keyCode)) event.returnValue = false
    }
    window.addEventListener('keydown', wrapper)
  }
  const disable = () => window.removeEventListener('keydown', wrapper)

  return { active, disable }
}

/**
 * @private
 * @param {event} event 
 * @param {(string|number)[]|number} key 
 */
function _compareKeycode(event, key) {
  const _keys = Array.isArray(key) ? key : [key]
  return _keys.some(el => {
    if (typeof el === 'number') {
      return event.keyCode === el
    } else if (typeof el === 'string') {
      if (!el.includes('&')) return false
      const [k1, k2] = el.split('&')
      return event[k1] && event.keyCode == k2
    }
  })
}