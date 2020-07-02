# utilbag
web mobile 常用开发工具包

### Install
```bash
# npm
npm install utilbag
# yarn
yarn add utilbag
```

### Usage
#### umd:
```js
import { browser, date, event, number, reg, string } from 'utilbag'
console.log(date.today())
```
#### commonjs
```js
const utilbag = require('utilbag')
console.log(utilbag.date.today())
```
#### browser script tag
```html
<script src="./lib/utilbag.js"></script>
<script>
  const { browser, date, event, number, reg, string } = utilbag
  console.log(date.today())
</script>
```

### API
[./types.d.ts][utilbag types]
