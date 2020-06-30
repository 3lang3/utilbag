/**
 * 指定范围生成随机整数
 * @param {number} min 
 * @param {number} max 
 * @return {number}
 */
export const randomNumInteger = (min = 0, max = 10) => {
  return parseInt(Math.random() * (max - min + 1) + min, 10);
}

/**指定范围生成随机数
 * @param {number} min 
 * @param {number} max 
 * @return {number}
 */
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * 补全数字左侧的0
 * @param  {number} num 目标数字
 * @param  {number} [len=2] 最终位数
 * @return {string}
 */
export const padLeftZero = function (num, len = 2) {
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
export const plus = (a, b) => {
  let r1, r2, m;
  try { r1 = a.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = b.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  return (a * m + b * m) / m
}

/**
 * 两数相减(精度丢失问题)
 * @param {number} a 
 * @param {number} b 
 * @return {number}
 */
export const minus = (a, b) => {
  let r1, r2, m, n;
  try { r1 = a.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = b.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;
  return Number(((a * m - b * m) / m).toFixed(n))
}

/**
 * 两数相乘(精度丢失问题)
 * @param {number} a 
 * @param {number} b 
 * @return {number}
 */
export const times = (a, b) => {
  let m = 0, s1 = a.toString(), s2 = b.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/**
 * 两数相除(精度丢失问题)
 * @param {number} a 
 * @param {number} b 
 * @return {number}
 */
export const division = (a, b) => {
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
}