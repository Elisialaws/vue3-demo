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
//修改用户基本信息
export const userUpdateInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })
//更新用户头像
export const userUpdateAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', { avatar })
}
export const userUpdatePasswordService = ({ old_pwd, new_pwd, re_pwd }) => {
  return request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
}
