import ClipboardJS from 'clipboard'

export function initCopyElement (el: HTMLDivElement | null = null, success?: Function, error?: Function) { // 初始化元素的点击复制内容功能
  if (!el) { 
    console.error('初始化点击复制功能失败, 没有可执行的元素')
    return
  }
  var clipboard = new ClipboardJS(el)

  clipboard.on('success', function (e: any) {
    success && success()
  })

  clipboard.on('error', function(e: any) {
    error && error()
  })
}