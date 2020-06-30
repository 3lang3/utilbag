const assert = require('assert');
const { date } = require('../lib/utilbag.js')

describe('Date', function () {
  let now;
  beforeEach(() => {
    now = new Date
  })

  describe('#format()', () => {
    it('test format: YYYY-MM-DD HH:mm:ss', () => {
      assert.equal(date.format(new Date('1999/04/11 16:15:20'), 'YYYY-MM-DD HH:mm:ss'), '1999-04-11 16:15:20');
    })
    it('test format: YYYY年MM月DD日 HH时mm分ss秒', () => {
      assert.equal(date.format(new Date('1999/04/11 16:15:20'), 'YYYY年MM月DD日 HH时mm分ss秒'), '1999年04月11日 16时15分20秒');
    })
    it('test format: YYYY/MM/DD', () => {
      assert.equal(date.format(new Date('1999/04/11 16:15:20'), 'YYYY/MM/DD'), '1999/04/11');
    })
  })

  describe('#getTime()', () => {
    it('test getTime', () => {
      assert.equal(date.getTime().getFullYear(), now.getFullYear())
      assert.equal(date.getTime().getMonth(), now.getMonth())
      assert.equal(date.getTime().getDate(), now.getDate())
      assert.equal(date.getTime().getHours(), now.getHours())
    })
    it('test getTime with params', () => {
      let time = date.getTime({
        from: new Date('1982-05-30'),
        offset: -4 * date._aDay,
        zeroTime: true
      })
      assert.equal(time.getDate(), 26);
      assert.equal(time.getFullYear(), 1982)
      assert.equal(time.getHours(), 0)
    })
  })

  
  describe('#today()', () => {
    it('test today', () => {
      assert.equal(date.today().getDate(), now.getDate())
      assert.notEqual(date.today().getTime(), now.getTime())
      assert.equal(date.today(false).getTime(), now.getTime())
    })
  })

  function getSeconds(time) {
    return parseInt(time / 1000);
  }
  describe('#yesterday()', () => {
    it('test yesterday', () => {
      assert.equal(getSeconds(date.yesterday(false).getTime()), getSeconds(now.getTime() - date._aDay))
    })
  })
  describe('#tomorrow()', () => {
    it('test tomorrow', () => {
      assert.equal(getSeconds(date.tomorrow(false).getTime()), getSeconds(now.getTime() + date._aDay))
    })
  })

});