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
export const format = (date = (new Date), fmt = 'YYYY-MM-DD HH:mm:ss') => {
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
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o)
    if (new RegExp("(" + k + ")", "i").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 取得某个时间
 * @param  {object} [setting] - {偏移值 offset, 基准时间 from, 是否置为0点 zeroTime, 是否置为1日 clean}
 * @return {date}
 */
export const getTime = (setting) => {
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
}

/**
 * 取得当天
 * @param  {boolean} [zeroTime=true] 是否置为0点
 * @return {date}
 */
export const today = (zeroTime = true) => getTime({ zeroTime })

/**
 * 取得明天
 * @param  {boolean} [zeroTime=true] 是否置为0点
 * @return {date}
 */
export const tomorrow = (zeroTime = true) => getTime({ zeroTime, offset: _aDay })

/**
 * 取得昨天
 * @param  {boolean} [zeroTime=true] 是否置为0点
 * @return {date}
 */
export const yesterday = (zeroTime = true) => getTime({ zeroTime, offset: -_aDay })

/**
 * 取得一个某年某月1号0时的干净日期
 * @param  {number} [month=1]
 * @param  {number} [year=今年]
 * @return {date}
 */
export const getCleanDate = (month = 1, year = (new Date).getFullYear()) => {
  let d = getTime({ clean: true, zeroTime: true });
  d.setFullYear(year);
  d.setMonth(month - 1);
  return d;
}

/**
 * 取得某月的日历
 * @param  {number} year
 * @param  {number} [month=1]
 * @return {array} 列为星期,行为日期的二维矩阵
 */
export const calender = (month = 1, year = (new Date).getFullYear()) => {
  let matrix = [[]]
  let putDay = (d, isLastRow = false) => {
    matrix[matrix.length - 1].push(d == null ? null : d.toISOString());
    if (!isLastRow && matrix[matrix.length - 1].length == 7) {
      matrix[matrix.length] = [];
    }
  }
  let day = get_clean_date(month, year);
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
}

/**
 * 取得开始-结束的日期范围
 * @param  {number} rangeNums - 开始到结束的天数
 * @param  {date} [from=今天] - 基准日期
 * @return {object}
 */
export const dateRange = (rangeNums, from = today()) => {
  let
    days = parseInt(rangeNums) * _aDay,
    endDay = getTime({ from, offset: days }),
    arr = [from, endDay];
  arr.sort((a, b) => a - b);
  return {
    start: arr[0],
    end: arr[1]
  };
}

/**
 * 是否闰年
 * @param  {number} [year=null] 年份
 * @return {boolean}
 */
export const isLeapYear = (year = null) => {
  let currY = (new Date).getFullYear();
  let y = parseInt(year || currY);
  if (isNaN(y)) y = currY;
  return !!(((y % 4 == 0) && (y % 100 != 0)) || (y % 400 == 0));
}

/**
 * 比较两个date是否全等
 * @param {date} a 
 * @param {date} b 
 */
export const isSameTime = (a, b) => a.getTime() === b.getTime()

/**
 * 比较两个日期是否在同一天(同年同月)
 * @param {date} a 
 * @param {date} b 
 */
export const isSameDay = (a, b) => (
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()
)