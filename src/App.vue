<script setup>
//得到路由实例，路由参数
//const router = useRouter()
//const route = useRoute()
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <!--全局配置-->
  <el-config-provider :locale="zhCn">
    <!--只需要留一个路由出口就行-->
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
