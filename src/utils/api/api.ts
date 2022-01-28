import axios from 'axios'

export const AxiosApi = axios.create({
  baseURL: 'http://152.136.155.113:8989',
  // baseURL: 'http://123.56.223.217:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})
