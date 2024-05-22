import request from '@/utils/request'
export const artGetChannelsService = () => {
  return request.get('/my/cate/list')
}
// 添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)
// 编辑文章分类
export const artEditChannelService = (data) => request.put('/my/cate/info', data)
export const artDelChannelService = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}
//文章相关:获取文章列表
export const artGetListService = (params) => {
  return request.get('/my/article/list', {
    params
  })
}
//data必须是formData格式的对象
export const artPublishService = (data) => {
  return request.post('/my/article/add', data)
}
//获取文章详情
export const artGetDetailService = (id) =>
  request.get('/my/article/info', { params: { id } })
//更新文章
export const artEditService = (data) => {
  return request.put('/my/article/info', data)
}
//文章删除
export const artDelService = (id) => request.delete('my/article/info', { params: { id } })
