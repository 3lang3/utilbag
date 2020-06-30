/**
 * 禁用键盘事件
 * @returns {object} { disable, destory }
 */
export const disableKeydown = () => {
  let wrapper;
  const disable = keyCode => {
    wrapper = event => {
      if (compareKeycode(event, keyCode)) {
        event.returnValue = false
      }
    }
    window.addEventListener('keydown', wrapper)
  }
  const destory = () => window.removeEventListener('keydown', wrapper)

  const control = {
    disable,
    destory
  }
  return control
}
function compareKeycode(event, key) {
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