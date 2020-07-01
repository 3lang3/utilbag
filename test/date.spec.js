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

  function getSeconds(time) {
    return parseInt(time / 1000);
  }

  describe('#today()', () => {
    it('test today', () => {
      assert.equal(date.today().getDate(), now.getDate())
      assert.notEqual(getSeconds(date.today().getTime()), getSeconds(now.getTime()))
      assert.equal(getSeconds(date.today(false).getTime()), getSeconds(now.getTime()))
    })
  })

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

  describe('#calender()', () => {
    it('test calender', () => {
      const calender = date.calender(7, 2020)
      assert.equal(calender.length, 5)
      assert.equal(new Date(calender[1][0]).getDay(), 0)
      assert.equal(new Date(calender[2][0]).getDay(), 0)
      assert.equal(new Date(calender[3][0]).getDay(), 0)
      assert.equal(new Date(calender[4][5]).getDate(), 31)
    })
  })

  describe('#dateRange()', () => {
    it('test dateRange params: 10', () => {
      const range = date.dateRange(10)
      assert.equal(getSeconds(range.end.getTime() - range.start.getTime()), getSeconds(date._aDay*10))
    })
    it('test dateRange params: 2, yesterday()', () => {
      const range = date.dateRange(2, date.yesterday())
      assert.equal(range.end.toLocaleString(), date.tomorrow().toLocaleString())
    })
  })

  describe('#isLeapYear()', () => {
    it('test isLeapYear', () => {
      assert.equal(date.isLeapYear(2016), true)
      assert.equal(date.isLeapYear(2017), false)
      assert.equal(date.isLeapYear(2018), false)
      assert.equal(date.isLeapYear(2019), false)
      assert.equal(date.isLeapYear(2020), true)
    })
  })

  describe('#isSameTime()', () => {
    it('test isSameTime', () => {
      const [a, b] = [new Date('1991-06-19'), new Date('1991-06-19')]
      assert.equal(date.isSameTime(a, b), true)
      a.setHours(12)
      assert.equal(date.isSameTime(a, b), false)
    })
  })

  describe('#isSameDay()', () => {
    it('test isSameDay', () => {
      const [a, b] = [new Date('1991-06-19'), new Date('1991-06-19')]
      assert.equal(date.isSameDay(a, b), true)
      a.setHours(12)
      assert.equal(date.isSameDay(a, b), true)
      a.setDate(20)
      assert.equal(date.isSameDay(a, b), false)
      a.setDate(19)
      assert.equal(date.isSameDay(a, b), true)
    })
  })

});