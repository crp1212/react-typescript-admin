export function setLocalStorage (key: string, value: string | CommonObject | any[]) {
  localStorage.setItem(key, JSON.stringify(value))
}
export function getLocalStorage (key: string) {
  let value = localStorage.getItem(key + '')
  return value ? JSON.parse(value) : ''
}
export function getOnceLocalStorage (key: string) {
  let value = getLocalStorage(key)
  localStorage.removeItem(key + '')
  return value
}
export function removeLocalStorage (key: string) {
  localStorage.removeItem(key + '')
}
export function setSessionStorage (key: string, value: string | CommonObject | any[]) {
  sessionStorage.setItem(key, JSON.stringify(value))
}
export function getSessionStorage (key: string) {
  let value = sessionStorage.getItem(key + '')
  return value ? JSON.parse(value) : ''
}
export function getOnceSessionStorage (key: string) {
  let value = getSessionStorage(key)
  sessionStorage.removeItem(key + '')
  return value
}
export function removeSessionStorage (key: string) {
  sessionStorage.removeItem(key + '')
}