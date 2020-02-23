import {fetch} from './index'

export let requestUserInfo = fetch('get', '/backstage/getuser')
export let requestArea = fetch('get', '/backstage/selectrepair/get_area')
export let requestQiniuToken = fetch('get', '/qiuniu_token')
export let getRouterAuth = fetch('get', '/backstage/getuserauth') // 获取的自己有权限的路由
export let getWarehouseList = fetch('get', '/backstage/selectwarehouse/get_warehouse')
// 获取人员数据
export const getUserInfo = fetch('get', '/backstage/user/getuserinfo')
// 创建工作人员
export const createAftersalePointPeople = fetch('post', '/backstage/user/create')
