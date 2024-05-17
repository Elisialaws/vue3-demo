//响应拦截
import axios from 'axios'
import { useUserStore } from '@/stores/repo'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = 'http://big-event-vue-api-t.itheima.net'
//const axios = require('axios');
//axios拦截请求器，创建http请求，支持promise
// 创建默认实例
const instance = axios.create({
  //ToDo 1，基础时间，超时时间
  baseURL,
  timeout: 10000 //超时时间
})
instance.interceptors.request.use(
  (config) => {
    //ToDo2 携带Token
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)
//响应拦截器
instance.interceptors.response.use(
  (res) => {
    //Todo 3 ，处理业务失败
    //4 摘取核心相应数据,看接口文档
    if (res.data.code == 0) {
      return res
    }
    //处理业务失败
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    //处理401错误,?.是可选链操作符，安全带访问对象的嵌套属性，如果引用为null或者undefined，提前停止
    if (err.response?.status == 401) {
      router.push('/login')
    }
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)
export default instance
export { baseURL }
