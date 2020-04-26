function createReader (type: string) {

  return new Promise((resolve, reject) => {
    
  })
}
export function readAsDataURL (file: File) {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = function (data) {
      resolve(data.target ? data.target.result : null)
    }
    reader.readAsDataURL(file)
  })
}
export async function getFileBase64Code (file: File) {
  let data = await readAsDataURL(file)
  return data
}