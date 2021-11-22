const get = (key: string) => {
  if (localStorage && localStorage.getItem(key)) {
    const data: any = localStorage.getItem(key)
    return JSON.parse(data)
  }
  return null
}

const update = (data: any, key: string) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const remove = (key: string) => {
  localStorage.removeItem(key)
}


export default {
  get,
  update,
  remove
}