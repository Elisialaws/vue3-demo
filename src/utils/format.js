import { dayjs } from 'element-plus'
export const formatTime = (time) => {
  return dayjs(time).format('YYYY年MM月DD日')
}
//elemnt-plus自带了格式化时间的插件
