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
    return {
      token,
      setToken,
      removeToken
    }
  },
  {
    persist: {
      key: 'token', //存储的唯一标识，名字
      paths: ['token'] //存储哪些数据
    }
  }
)
