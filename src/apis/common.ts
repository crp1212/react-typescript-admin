import {fetch} from './index'

export let requestUserInfo = fetch('get', '/backstage/getuser')
export let requestArea = fetch('get', '/backstage/selectrepair/get_area')
export let requestQiniuToken = fetch('get', '/qiuniu_token')