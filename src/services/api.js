import 'babel-polyfill'
import axios from 'axios'

const new_api = (api_url, token) => {
  const api = axios.create({
    baseURL: api_url
  })
  
  api.interceptors.request.use(async config => {
    config.headers.Accept = 'application/vnd.github.v3+json'
    config.headers.Authorization = `token ${token}`
    return config
  })
   
  return api
}

export default new_api
