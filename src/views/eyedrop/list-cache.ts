const cacheKey = 'EyedropCacheListKey'
import moment from 'moment'
export function isSameDay () {

}
export function setCacheData (data: CommonObject[]) {
  localStorage.setItem(cacheKey, JSON.stringify({
    time: Date.now(),
    data
  }))
}
export function getCacheData () {
  let cacheData = localStorage.getItem(cacheKey)
  if (!cacheData) { return [] }
  let { time, data } = JSON.parse(cacheData)
  if (moment(time).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ) {
    return data
  } else {
    return []
  }
}