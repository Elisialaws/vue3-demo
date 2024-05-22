import { useGetinfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore(
  //仓库放到modules里面
  'user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const user = ref({})
    const getUser = async () => {
      const res = await useGetinfoService() //这里res.data.data访问的data是由提供的接口定义的，不是自己起的名字
      user.value = res.data.data
    }
    const setUser = (object) => {
      user.value = object
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: {
      key: 'token', //存储的唯一标识，名字
      paths: ['token', 'user'] //存储哪些数据
    }
  }
)
