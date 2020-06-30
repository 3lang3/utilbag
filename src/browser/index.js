/**
 * 检查是否为浏览器环境
 */
export const isBrowser = () => ![typeof window, typeof document].includes('undefined');

/**
 * 检测是否移动设备
 */
export const isMobile = () => /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(window.navigator.userAgent)

/**
 * 检测安卓webview环境
 */
export const isAndroid = () => /android/i.test(window.navigator.userAgent)

/**
 * 检测iOSwebview环境
 */
export const isIos = () => /(iPhone|iPod|iPad);?/i.test(window.navigator.userAgent)


/**
 * 平滑滚动到顶部
 */
export const scrollToTop = () => {
  if (!isBrowser()) throw Error('there is not browser env');
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