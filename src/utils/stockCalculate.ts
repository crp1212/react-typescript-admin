export function stockAverage (dayCount: number, dataList: string[] | number[]) {
  dataList = [...dataList].map((val:string | number) => Number(val))
  let length = dataList.length
  if (length < dayCount) { return dataList }
  let cacheValue = dataList.slice(0, dayCount - 1).reduce((sum: number, val: string | number) => {
    return sum + Number(val)
  }, 0)
  let dayCountArr: number[] = []
  for (let i = 0; i < dataList.length - 5; i++) {
    let sum = cacheValue + dataList[i + dayCount - 1]
    dayCountArr.push(Number((sum / dayCount).toFixed(2)))
    cacheValue = sum - dataList[i]
  }
  return dayCountArr.concat(dataList.slice(-1 * dayCount))
}
