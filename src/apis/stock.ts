import {fetch} from './index'

export let getStockOptionalList = fetch('get', '/stock/list/optional')
export let requestStockOptionalListAdd = fetch('post', '/stock/list/optional/add')
export let requestStockOptionalListDel = fetch('post', '/stock/list/optional/del')
export let getStockRandomList = fetch('get', '/stock/list/random')
export let updateStockRandomList = fetch('post', '/stock/list/random/update')
export let getStockForecastList = fetch('get', '/stock/list/forecast')
export let requestStockForecastListAdd = fetch('post', '/stock/list/forecast/add')
export let requestStockForecastListDel = fetch('post', '/stock/list/forecast/del')
export let getStockDetail = fetch('get', '/stock/stock_data')