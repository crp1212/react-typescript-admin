interface DownloadOption {
  filename: string;
  [propName: string]: string;
}
export function formDownloadFile (url: string, options: DownloadOption) {
  /* 
    优: 兼容性极好
    缺: 1.png,jpg之类浏览器可预览的文件无法下载
        2.无下载进度
        3.可跨域
  */
  let filename = options.filename
  const formObj = document.createElement('form')
  formObj.action = url
  formObj.method = 'get'
  formObj.style.display = 'none'
  // 创建input，主要是起传参作用
  const formItem = document.createElement('input')
  formItem.value = filename // 传参的值
  formItem.name = 'filename' // 传参的字段名
  // 插入到网页中
  formObj.appendChild(formItem)
  document.body.appendChild(formObj)
  formObj.submit() // 发送请求
  document.body.removeChild(formObj) // 发送完清除掉
}
export function aTagDownloadFile (url: string, options: DownloadOption) {
  /* 
    优: 非跨域的情况下可以下载 png,jpg之类浏览器可预览的文件
    缺: 1.跨域的浏览器可预览文件无法下载, 而是直接预览
        2.无下载进度
  */
  let el = document.createElement('a')
  el.href = url
  el.download = options.filename // 必须
  let event = document.createEvent('MouseEvents')
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  el.dispatchEvent(event)
}
export function useBlobTypeDownloadFile (url: string, options: DownloadOption) {
  /* 
    优: ajax能请求回来的blob数据都能下载
    缺: 1.ajax跨域时无法下载
        2.至少IE10, safari浏览器上有缺陷
  */
  const xhr = new XMLHttpRequest()
  xhr.open('get', url)
  xhr.responseType = 'blob' // 必须
  xhr.send()
  xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
      const url = URL.createObjectURL(this.response)
      aTagDownloadFile(url, options)
      URL.revokeObjectURL(url)
    }
  }

}
const browserPreviewFileReg = /\.png|\.jpeg|\.jpg|\.gif|\.txt/
export function normalDownloadFile (url: string, options: DownloadOption) {
  let filename = options.filename
  let canUseFormDownload = !browserPreviewFileReg.test(filename)
  return canUseFormDownload ? formDownloadFile(url, options) : useBlobTypeDownloadFile(url, options)
}