<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/repo' //仓库统一导出
import { storeToRefs } from 'pinia'
//得到路由实例，路由参数
const router = useRouter()
const route = useRoute()
const goList = () => {
  router.push('/list')
  console.log(route, router)
}
const userStore = useUserStore()
//得到实例后解构数据
const { token } = storeToRefs(userStore)
const { setToken, removeToken } = userStore
console.log(userStore)
</script>

<template>
  <div>demo</div>
  <el-button @click="goList">跳到首页</el-button>
  <el-button type="success">token</el-button>
  <p>{{ token }}</p>
  <el-button @click="setToken('bell')">登陆</el-button>
  <el-button @click="removeToken()">退出</el-button>
</template>

<style scoped></style>
