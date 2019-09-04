import {fetch} from './index'

export let requestUserInfo = fetch('get', '/backstage/getuser')
export let requestArea = fetch('get', '/backstage/selectrepair/get_area')
export let requestQiniuToken = fetch('get', '/qiuniu_token')
export let getRouterAuth = fetch('get', '/backstage/getuserauth') // 获取的自己有权限的路由