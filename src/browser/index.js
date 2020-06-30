/**
 * 检查是否为浏览器环境
 */
export const isBrowser = () => ![typeof window, typeof document].includes('undefined');

/**
 * 检测是否移动设备
 */
export const isMobileBrowser = () => /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(window.navigator.userAgent)

/**
 * 检测是否在webview
 * 如果想要判断是否用特定app浏览器可以进一步判断ua
 * 例如wechat的ua包含micromessenger Fb的ua包含FBAN或者FBAV
 * ref: https://developers.whatismybrowser.com/useragents/explore/software_type_specific/in-app-browser/
 */
export const isWebview = () => (
  /WebView|(iPhone|iPod|iPad)(?!.*Safari\/)|Android.*(wv|\.0\.0\.0)/ig.test(window.navigator.userAgent)
)

/**
 * 检测安卓webview环境
 */
export const isAndroidBrowser = () => /android/i.test(window.navigator.userAgent)

/**
 * 检测iOSwebview环境
 */
export const isIosBrowser = () => /(iPhone|iPod|iPad);?/i.test(window.navigator.userAgent)

/**
 * 检测是否为微信浏览器环境
 */
export const isWechatBrowser = () => /micromessenger/.test(navigator.userAgent.toLowerCase())