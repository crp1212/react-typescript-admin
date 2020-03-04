import {fetch} from './index'

export let getStockOptionalList = fetch('get', '/stock/list/optional')
export let requestStockOptionalListAdd = fetch('post', '/stock/list/optional/add')
export let requestStockOptionalListDel = fetch('post', '/stock/list/optional/del')
export let getStockRandomList = fetch('get', '/stock/list/random')
export let updateStockRandomList = fetch('post', '/stock/list/random/update')
export let getStockForecaseList = fetch('get', '/stock/list/forecase')
export let requestStockForecaseListAdd = fetch('post', '/stock/list/forecase/add')
export let requestStockForecaseListDel = fetch('post', '/stock/list/forecase/del')