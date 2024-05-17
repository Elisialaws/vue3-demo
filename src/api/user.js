//封装接口
import request from '@/utils/request'
//注册接口
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}
//获取用户基本信息
export const useGetinfoService = () => {
  return request.get('/my/userinfo')
}
