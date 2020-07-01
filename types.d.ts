interface IBrowser {
  isBrowser(): boolean;
  isMobileBrowser: () => boolean;
  isWebview: () => boolean;
  isAndroidBrowser: () => boolean;
  isIosBrowser: () => boolean;
  isWechatBrowser: () => boolean;
}
export const browser: IBrowser;

type IDateGetTimeSetting = {
  offset?: number,
  zeroTime?: boolean,
  clean?: boolean,
  from?: Date
}

interface IDate {

  format: (date: date, fmt: string) => string;
  getTime: (setting: IDateGetTimeSetting) => Date;
  /**
   * @param {boolean} zeroTime 是否设置为0点
   */
  today: (zeroTime: boolean) => Date;
  yesterday: (zeroTime: boolean) => Date;
  tomorrow: (zeroTime: boolean) => Date;

  getCleanDate: (month: number, year?: number) => Date;
  calender: (month: number, year?: number) => Date[][];

  dateRange: (rangeNums: number, from?: Date) => { start: Date, end: Date };

  isLeapYear: (year: number | null) => boolean;
  isSameDate: (a: Date, b: Date) => boolean;
  isSameDay: (a: Date, b: Date) => boolean;
}

export const date: IDate;

interface IEvent {
  scrollToTop: () => void;
  getScrollPosition: (el?: HTMLElement) => { x: number, y: number };
  lockBody: () => { active: () => void, disable: () => void };
  disableCopyEvent: () => { active: () => void, disable: () => void };
  disableKeydown: () => { active: (keyCode: (string | number)[] | number) => void, disable: () => void };
}
export const event: IEvent;

interface INumber {
  randomNumInteger: (min?: number, max?: number) => number;
  randomNum: (min?: number, max?: number) => number;
  padLeftZero: (num: string | number, len?: number) => string;
  plus: (a: number, b: number) => number;
  minus: (a: number, b: number) => number;
  times: (a: number, b: number) => number;
  division: (a: number, b: number) => number;
}
export const number: INumber;

interface IReg {
  phone: RegExp;
  phoneStrict: RegExp;
  email: RegExp;
  url: RegExp;
  idCard: RegExp;
  passport: RegExp;
  bankNumber: RegExp;
  specialChar: RegExp;
  withCn: RegExp;
}
export const reg: IReg;

interface IString {
  randomStr: (len: number) => string;
  uuid: () => string;
  subText: (text: string, len?: number) => string;
  formatMoney: (num: number) => string;
  isAbusoluteUrl: (url: string) => boolean;
  parseQuery: (query?: string) => object;
  query: (obj: object, separator?: string) => string;
  /**
   * @return {-1|0|1} -1:小于 0:等于 1:大于
   */
  compare: (a: string, b: string) => -1 | 0 | 1;

}

export const string: IString;

export default {
  browser,
  date,
  event,
  number,
  reg,
  string
}

