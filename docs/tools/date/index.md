- 时间戳转年月日

```js
format({ date: 1653629034235 })
```
```ts
const format = ({ date, format = 'YYYY-MM-DD' }) => {
  if (!date) return ''
  return dayjs(Number(date)).format(format)
} 
```