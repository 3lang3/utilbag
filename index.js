(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.autils = factory());
}(this, (function () { 'use strict';

  /**
   * 检查是否为浏览器环境
   */
  const isBrowser = () => ![typeof window, typeof document].includes('undefined');

  /**
   * 检测是否移动设备
   */
  const isMobile = () => /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(window.navigator.userAgent);

  /**
   * 检测安卓环境
   */
  const isAndroid = () => /android/i.test(window.navigator.userAgent);

  /**
   * 检测iOs环境
   */
  const isIos = () => /(iPhone|iPod|iPad);?/i.test(window.navigator.userAgent);


  /**
   * 平滑滚动到顶部
   */
  const scrollToTop = () => {
    if (!isBrowser()) throw Error('there is not browser env');
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };

  /**
   * 返回当前滚动位置
   * @param {element} el
   * @return {number}
   */
  const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
  });

  var browser = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isBrowser: isBrowser,
    isMobile: isMobile,
    isAndroid: isAndroid,
    isIos: isIos,
    scrollToTop: scrollToTop,
    getScrollPosition: getScrollPosition
  });

  /**
   * 生成指定位数的随机字符串
   * @param {number} len
   */
  const randomStr = len => {
    let rdmString = '';
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len).toUpperCase();
  };
  /**
   * 生成动态不重复的16位唯一标识
   */
  const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0;
      let v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }).toUpperCase();
  };

  var number = /*#__PURE__*/Object.freeze({
    __proto__: null,
    randomStr: randomStr,
    uuid: uuid
  });

  /**
   * 禁用键盘事件
   * @returns {object} { disable, destory }
   */
  const disableKeydown = () => {
    let wrapper;
    const disable = keyCode => {
      wrapper = event => {
        if (compareKeycode(event, keyCode)) {
          event.returnValue = false;
        }
      };
      window.addEventListener('keydown', wrapper);
    };
    const destory = () => window.removeEventListener('keydown', wrapper);

    const control = {
      disable,
      destory
    };
    return control
  };
  function compareKeycode(event, key) {
    const _keys = Array.isArray(key) ? key : [key];
    return _keys.some(el => {
      if (typeof el === 'number') {
        return event.keyCode === el
      } else if (typeof el === 'string') {
        if (!el.includes('&')) return false
        const [k1, k2] = el.split('&');
        return event[k1] && event.keyCode == k2
      }
    })
  }

  var keyboard = /*#__PURE__*/Object.freeze({
    __proto__: null,
    disableKeydown: disableKeydown
  });

  var index = {
    keyboard,
    number,
    browser
  };

  return index;

})));
