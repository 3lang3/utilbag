/**
 * 生成指定位数的随机字符串
 * @param {number} len
 * @return {string}
 */
export const randomStr = len => {
  let rdmString = '';
  for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
  return rdmString.substr(0, len).toUpperCase();
}

/**
 * 生成动态不重复的16位唯一标识
 * @return {string}
 */
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }).toUpperCase();
}

/**
 * 截取字符串并加身略号
 * @param {string} str 需要截取的字符串
 * @param {number} [len='0'] 截取长度
 */
export const subText = (str, len = 0) => {
  if (!str.length) return ''
  if (str.length > len) {
    return `${str.substr(0, len)}...`
  }
  return str
}

/**
 * 金钱格式化，三位加逗号
 * @param {number} num 
 */
export const formatMoney = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * 校验是否为http或者https的绝对路径地址
 * @param {string} str 需校验的字符串
 * @return {boolean}
 */
export const isAbusoluteUrl = str => /^https?:\/\//.test(str)

/**
 * 将query字符串转换为object
 * @param {string} query 需解析的字符串
 * @return {object}
 */
export const parseQuery = (query = window.location.search.substring(1)) => {
  if (!query) return null;
  return query.split('&').reduce((prev, params) => {
    let [key, value] = params.split('=');
    prev[key] = decodeURIComponent(value);
    return prev
  }, {})
}

/**
 * object转换为query字符串
 * @param {object} obj key-value对象
 * @param {string} [separator='&'] 分隔符
 * @return {string}
 */
export const query = (obj, separator = '&') => {
  const [u, r] = [encodeURIComponent, []]
  for (let k in obj) r.push(`${u(k)}=${u(obj[k])}`)
  return r.join(separator)
}

/**
 * 比较两个数字字符串大小
 * eg: 版本号对比 1.1.5 < 1.10.0
 * @param {string} a 
 * @param {string} b 
 * @return {-1 | 0 | 1} 
 */
export const compare = (a, b) => {
  if (typeof a !== 'string' || typeof b !== 'string') throw TypeError('the args must be string')
  const arr1 = a.split('.')
  const arr2 = b.split('.')
  let rs = 0
  for (let index = 0; index < arr1.length; index++) {
    const av = parseInt(arr1[index])
    const bv = parseInt(arr2[index] || 0)
    if (av > bv) {
      rs = 1
      break
    } else if (av < bv) {
      rs = -1
      break
    }
  }
  return rs
}