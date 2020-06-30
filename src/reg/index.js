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
}

export default reg