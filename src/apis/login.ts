import {fetch} from './index'

export let requestLogin = fetch('post', '/api/login')
export let requestLogout = fetch('post', '/api/logout')