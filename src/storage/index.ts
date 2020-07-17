let historyStorage: StockHistoryItem[] = []
let historyStorageMap: CommonObject = {}
let historyStorageKey = 'transactionHistroyStorage'
let historyEvent = new CustomEvent('historyChange')
export function getStockTransactionHistoryStorage () {
  return historyStorage.map((item: StockHistoryItem) => ({ ...item }))
}
export function setStockTransactionHistoryStorage () {
  localStorage.setItem(historyStorageKey, JSON.stringify(historyStorage))
}
export function addStockTransactionHistoryStorage (info: StockHistoryItem) {
  let code = info.code
  if (historyStorageMap[code]) { // 已存在, 把此项优先级提高
    historyStorage = historyStorage.filter((item: StockHistoryItem) => item.code !== code)
  } else { // 不存在
    if (historyStorage.length === 10) { // 多于10个清掉最后一个 
      historyStorage = historyStorage.slice(0, 9)
    }
  }
  historyStorage = [info].concat(historyStorage)
  setStockTransactionHistoryStorage()
  updateHistoryMap()
  emitHistoryChange()
}
export function updateHistoryMap () {
  historyStorageMap = historyStorage.reduce((result: CommonObject, item: StockHistoryItem) => {
    let code = item.code
    result[code] = item
    return result
  }, {})
}
function updateHistoryStorage () {
  let data = localStorage.getItem(historyStorageKey)
  if (!data) { return }
  historyStorage = JSON.parse(data)
  updateHistoryMap()
}
export function watchHistoryChange (fn: Function) {
  window.addEventListener('historyChange', () => {
    fn && fn()
  })
}
export function emitHistoryChange () {
  window.dispatchEvent(historyEvent)
}
updateHistoryStorage()