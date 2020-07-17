import {fetch} from './index'

export let getBaiduAcessToken = fetch('get', '/ocr/token')
export let analysisOcrFile = fetch('post', '/ocr/analysis')