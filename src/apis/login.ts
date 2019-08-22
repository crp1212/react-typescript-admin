import {fetch} from './index'

export let requestLogin = fetch('post', '/login')
export let requestLogout = fetch('get', '/logout')