(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.utilbag = factory());
}(this, (function () { 'use strict';

  /**
   * 检查是否为浏览器环境
   */
  const isBrowser = () => ![typeof window, typeof document].includes('undefined');

  /**
   * 检测是否移动设备
   */
  const isMobileBrowser = () => /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(window.navigator.userAgent);

  /**
   * 检测是否在webview
   * 如果想要判断是否用特定app浏览器可以进一步判断ua
   * 例如wechat的ua包含micromessenger Fb的ua包含FBAN或者FBAV
   * ref: https://developers.whatismybrowser.com/useragents/explore/software_type_specific/in-app-browser/
   */
  const isWebview = () => (
    /WebView|(iPhone|iPod|iPad)(?!.*Safari\/)|Android.*(wv|\.0\.0\.0)/ig.test(window.navigator.userAgent)
  );

  /**
   * 检测安卓webview环境
   */
  const isAndroidBrowser = () => /android/i.test(window.navigator.userAgent);

  /**
   * 检测iOSwebview环境
   */
  const isIosBrowser = () => /(iPhone|iPod|iPad);?/i.test(window.navigator.userAgent);

  /**
   * 检测是否为微信浏览器环境
   */
  const isWechatBrowser = () => /micromessenger/.test(navigator.userAgent.toLowerCase());

  var browser = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isBrowser: isBrowser,
    isMobileBrowser: isMobileBrowser,
    isWebview: isWebview,
    isAndroidBrowser: isAndroidBrowser,
    isIosBrowser: isIosBrowser,
    isWechatBrowser: isWechatBrowser
  });

  const
    _aSecond = 1000,
    _aMinute = 60 * _aSecond,
    _aHour = 60 * _aMinute,
    _aDay = 24 * _aHour;

  /**
   * 格式化时间,转化为指定的fmt格式
   * @param {date} [date=new Date]
   * @param {string} [fmt='YYYY-MM-DD HH:mm:ss'] 
   * @return {string}
   */
  const format = (date = (new Date), fmt = 'YYYY-MM-DD HH:mm:ss') => {
    const o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/i.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o)
      if (new RegExp("(" + k + ")", "i").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  };

  /**
   * 取得某个时间
   * @param  {object} [setting] - {偏移值 offset, 基准时间 from, 是否置为0点 zeroTime, 是否置为1日 clean}
   * @return {date}
   */
  const getTime = (setting) => {
    const ops = Object.assign({
      offset: 0,
      zeroTime: false,
      clean: false,
      from: new Date
    }, setting);
    let { offset, zeroTime, clean, from } = ops;
    let d = new Date(from);
    if (zeroTime) {
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
    }
    if (clean) {
      d.setDate(1); // 注意顺序 否则2月可能在遇到30号时出错
    }
    if (offset) {
      d.setTime(d.getTime() + offset);
    }
    return d;
  };

  /**
   * 取得当天
   * @param  {boolean} [zeroTime=true] 是否置为0点
   * @return {date}
   */
  const today = (zeroTime = true) => getTime({ zeroTime });

  /**
   * 取得明天
   * @param  {boolean} [zeroTime=true] 是否置为0点
   * @return {date}
   */
  const tomorrow = (zeroTime = true) => getTime({ zeroTime, offset: _aDay });

  /**
   * 取得昨天
   * @param  {boolean} [zeroTime=true] 是否置为0点
   * @return {date}
   */
  const yesterday = (zeroTime = true) => getTime({ zeroTime, offset: -_aDay });

  /**
   * 取得一个某年某月1号0时的干净日期
   * @param  {number} [month=1]
   * @param  {number} [year=今年]
   * @return {date}
   */
  const getCleanDate = (month = 1, year = (new Date).getFullYear()) => {
    let d = getTime({ clean: true, zeroTime: true });
    d.setFullYear(year);
    d.setMonth(month - 1);
    return d;
  };

  /**
   * 取得某月的日历
   * @param  {number} year
   * @param  {number} [month=1]
   * @return {array} 列为星期,行为日期的二维矩阵
   */
  const calender = (month = 1, year = (new Date).getFullYear()) => {
    let matrix = [[]];
    let putDay = (d, isLastRow = false) => {
      matrix[matrix.length - 1].push(d == null ? null : d.toISOString());
      if (!isLastRow && matrix[matrix.length - 1].length == 7) {
        matrix[matrix.length] = [];
      }
    };
    let day = getCleanDate(month, year);
    for (var i = 0, lng = day.getDay(); i < lng; i++) {
      putDay(null);
    }
    while (day.getMonth() == month - 1) {
      putDay(day);
      day.setDate(day.getDate() + 1);
    }
    if (!matrix[matrix.length - 1].length) {
      matrix.pop();
    }
    while (matrix[matrix.length - 1].length < 7) {
      putDay(null, true);
    }
    return matrix;
  };

  /**
   * 取得开始-结束的日期范围
   * @param  {number} rangeNums - 开始到结束的天数
   * @param  {date} [from=今天] - 基准日期
   * @return {object}
   */
  const dateRange = (rangeNums, from = today()) => {
    let
      days = parseInt(rangeNums) * _aDay,
      endDay = getTime({ from, offset: days }),
      arr = [from, endDay];
    arr.sort((a, b) => a - b);
    return {
      start: arr[0],
      end: arr[1]
    };
  };

  /**
   * 是否闰年
   * @param  {number} [year=null] 年份
   * @return {boolean}
   */
  const isLeapYear = (year = null) => {
    let currY = (new Date).getFullYear();
    let y = parseInt(year || currY);
    if (isNaN(y)) y = currY;
    return !!(((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0));
  };

  /**
   * 比较两个date是否全等
   * @param {date} a 
   * @param {date} b 
   */
  const isSameTime = (a, b) => a.getTime() === b.getTime();

  /**
   * 比较两个日期是否在同一天(同年同月)
   * @param {date} a 
   * @param {date} b 
   */
  const isSameDay = (a, b) => (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );

  var date = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _aSecond: _aSecond,
    _aMinute: _aMinute,
    _aHour: _aHour,
    _aDay: _aDay,
    format: format,
    getTime: getTime,
    today: today,
    tomorrow: tomorrow,
    yesterday: yesterday,
    getCleanDate: getCleanDate,
    calender: calender,
    dateRange: dateRange,
    isLeapYear: isLeapYear,
    isSameTime: isSameTime,
    isSameDay: isSameDay
  });

  /**
   * 平滑滚动到顶部
   */
  const scrollToTop = () => {
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

  /**
   * 移动端dialog滚动穿透
   * dialog调起时 调用active, 隐藏时调用disable
   * @return {{ active:() => void, disable:() => void }} 
   */
  const lockBody = () => {
    const active = () => {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px;';
    };
    const disable = () => {
      const body = document.body;
      body.style.position = '';
      const top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
      body.style.top = '';
    };
    return { active, disable }
  };

  /**
   * 禁用右键 选择 复制事件
   * @return {{ active: () => void, disable: () => void }}
   */
  const disableCopyEvent = () => {
    const events = ['contextmenu', 'selectstart', 'copy'];
    let funcRef;
    const active = () => {
      funcRef = [];
      events.forEach(ev => {
        let fn = event => event.returnValue = false;
        funcRef.push(fn);
        document.addEventListener(ev, fn);
      });
    };
    const disable = () => {
      events.forEach((ev, i) => {
        document.removeEventListener(ev, funcRef[i]);
      });
    };
    return { active, disable }
  };

  /**
   * 禁用键盘事件
   * @returns {{ active: () => void, disable: () => void }}
   */
  const disableKeydown = () => {
    let wrapper;
    const active = keyCode => {
      wrapper = event => {
        if (_compareKeycode(event, keyCode)) event.returnValue = false;
      };
      window.addEventListener('keydown', wrapper);
    };
    const disable = () => window.removeEventListener('keydown', wrapper);

    return { active, disable }
  };

  /**
   * @private
   * @param {event} event 
   * @param {(string|number)[]|number} key 
   */
  function _compareKeycode(event, key) {
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

  var event = /*#__PURE__*/Object.freeze({
    __proto__: null,
    scrollToTop: scrollToTop,
    getScrollPosition: getScrollPosition,
    lockBody: lockBody,
    disableCopyEvent: disableCopyEvent,
    disableKeydown: disableKeydown
  });

  /**
   * 指定范围生成随机整数
   * @param {number} min 
   * @param {number} max 
   * @return {number}
   */
  const randomNumInteger = (min = 0, max = 10) => {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
  };

  /**指定范围生成随机数
   * @param {number} min 
   * @param {number} max 
   * @return {number}
   */
  const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  /**
   * 补全数字左侧的0
   * @param  {number} num 目标数字
   * @param  {number} [len=2] 最终位数
   * @return {string}
   */
  const padLeftZero = function (num, len = 2) {
    let lng = len,
      zeroStr = '',
      n = num.toString();
    while (lng--) zeroStr += '0';
    if (n.length < len) return zeroStr.substr(0, len - n.length) + n;
    return n;
  };

  /**
   * 两数相加(精度丢失问题)
   * @param {number} a 
   * @param {number} b 
   * @return {number}
   */
  const plus = (a, b) => {
    let r1, r2, m;
    try { r1 = a.toString().split(".")[1].length; } catch (e) { r1 = 0; }
    try { r2 = b.toString().split(".")[1].length; } catch (e) { r2 = 0; }
    m = Math.pow(10, Math.max(r1, r2));
    return (a * m + b * m) / m
  };

  /**
   * 两数相减(精度丢失问题)
   * @param {number} a 
   * @param {number} b 
   * @return {number}
   */
  const minus = (a, b) => {
    let r1, r2, m, n;
    try { r1 = a.toString().split(".")[1].length; } catch (e) { r1 = 0; }
    try { r2 = b.toString().split(".")[1].length; } catch (e) { r2 = 0; }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return Number(((a * m - b * m) / m).toFixed(n))
  };

  /**
   * 两数相乘(精度丢失问题)
   * @param {number} a 
   * @param {number} b 
   * @return {number}
   */
  const times = (a, b) => {
    let m = 0, s1 = a.toString(), s2 = b.toString();
    try { m += s1.split(".")[1].length; } catch (e) { }
    try { m += s2.split(".")[1].length; } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  };

  /**
   * 两数相除(精度丢失问题)
   * @param {number} a 
   * @param {number} b 
   * @return {number}
   */
  const division = (a, b) => {
    let t1, t2, r1, r2;
    try {
      t1 = a.toString().split('.')[1].length;
    } catch (e) {
      t1 = 0;
    }
    try {
      t2 = b.toString().split(".")[1].length;
    } catch (e) {
      t2 = 0;
    }
    r1 = Number(a.toString().replace(".", ""));
    r2 = Number(b.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  };

  var number = /*#__PURE__*/Object.freeze({
    __proto__: null,
    randomNumInteger: randomNumInteger,
    randomNum: randomNum,
    padLeftZero: padLeftZero,
    plus: plus,
    minus: minus,
    times: times,
    division: division
  });

  /**
   * @property {reg} phone 手机号(宽松)
   * @property {reg} phoneStrict 验证手机号中国(严谨), 根据工信部2019年最新公布的手机号段
   * @property {reg} email 邮箱
   * @property {reg} url url string
   * @property {reg} idCard 身份证(支持15和18位校验)
   * @property {reg} passport 护照
   * @property {reg} bankNumber 银行卡
   * @property {reg} specialChar 特殊字符
   * @property {reg} withCn 包含中文
   */
  const reg = {
    phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g,
    phoneStrict: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g,
    email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    url: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    idCard: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g,
    passport: /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g,
    bankNumber: /^[1-9]\d{9,29}$/g,
    specialChar: /[~!@#$%^&*()/\|,.<>?"'();:_\+\-=\[\]\{\}·！#￥（——）：；“”‘、，《。》？、【】[\]]/g,
    withCn: /[\u4E00-\u9FA5]/,
  };

  var reg$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': reg
  });

  /**
   * 生成指定位数的随机字符串
   * @param {number} len
   * @return {string}
   */
  const randomStr = len => {
    let rdmString = '';
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len).toUpperCase();
  };

  /**
   * 生成动态不重复的16位唯一标识
   * @return {string}
   */
  const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0;
      let v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }).toUpperCase();
  };

  /**
   * 截取字符串并加身略号
   * @param {string} str 需要截取的字符串
   * @param {number} [len='0'] 截取长度
   */
  const subText = (str, len = 0) => {
    if (!str.length) return ''
    if (str.length > len) {
      return `${str.substr(0, len)}...`
    }
    return str
  };

  /**
   * 金钱格式化，三位加逗号
   * @param {number} num 
   */
  const formatMoney = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  /**
   * 校验是否为http或者https的绝对路径地址
   * @param {string} str 需校验的字符串
   * @return {boolean}
   */
  const isAbusoluteUrl = str => /^https?:\/\//.test(str);

  /**
   * 将query字符串转换为object
   * @param {string} query 需解析的字符串
   * @return {object}
   */
  const parseQuery = (query = window.location.search.substring(1)) => {
    if (!query) return null;
    return query.split('&').reduce((prev, params) => {
      let [key, value] = params.split('=');
      prev[key] = decodeURIComponent(value);
      return prev
    }, {})
  };

  /**
   * object转换为query字符串
   * @param {object} obj key-value对象
   * @param {string} [separator='&'] 分隔符
   * @return {string}
   */
  const query = (obj, separator = '&') => {
    const [u, r] = [encodeURIComponent, []];
    for (let k in obj) r.push(`${u(k)}=${u(obj[k])}`);
    return r.join(separator)
  };

  /**
   * 比较两个数字字符串大小
   * eg: 版本号对比 1.1.5 < 1.10.0
   * @param {string} a 
   * @param {string} b 
   * @return {-1 | 0 | 1} 
   */
  const compare = (a, b) => {
    if (typeof a !== 'string' || typeof b !== 'string') throw TypeError('the args must be string')
    const arr1 = a.split('.');
    const arr2 = b.split('.');
    let rs = 0;
    for (let index = 0; index < arr1.length; index++) {
      const av = parseInt(arr1[index]);
      const bv = parseInt(arr2[index] || 0);
      if (av > bv) {
        rs = 1;
        break
      } else if (av < bv) {
        rs = -1;
        break
      }
    }
    return rs
  };

  var string = /*#__PURE__*/Object.freeze({
    __proto__: null,
    randomStr: randomStr,
    uuid: uuid,
    subText: subText,
    formatMoney: formatMoney,
    isAbusoluteUrl: isAbusoluteUrl,
    parseQuery: parseQuery,
    query: query,
    compare: compare
  });

  const utilbag = {
    browser,
    date,
    event,
    number,
    reg: reg$1,
    string
  };

  return utilbag;

})));
//# sourceMappingURL=utilbag.js.map
