<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores/repo'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
//页面已经加载了加载个人信息
onMounted(() => {
  userStore.getUser()
})
//如果要退出登录，需要清空登录相关的信息,pinia对象清空
const handleCommand = async (key) => {
  if (key === 'logout') {
    await ElMessageBox.confirm('你确认要退出登录吗', 'Warning', {
      confirmButtonText: '确认退出',
      cancelButtonText: '取消退出',
      type: 'warning'
    })
    router.push('/login')
    userStore.removeToken()
    userStore.setUser({})
  } else {
    router.push(`user/${key}`)
  }
}
</script>
<!--el-menu 整个菜单组件:defualt-active="$router.path" $route访问当前激活的路由信息
设置默认激活的菜单项 $符号用作访问vue实例的内置属性或者插件提供的属性-->
<template>
  <!--el-container布局容器,el-menu-item 里面index代表跳转路径
  #dropdown是一个插槽的缩写语法,定义了一个名字叫dropdown的插槽
  #符号是v-slot指令缩写，在组件的某个插槽里面可以选择性的插入内容-->
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <!--多级菜单,el-sub-menu,#title配置标题-->
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <!--多级菜单的内容-->
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          Vue3-Demo<strong> {{ userStore.user.nickname || userStore.user.username }}</strong>
        </div>
        <!--@command可以监听菜单上的选择,
          每个菜单选项上的菜单标识会在点击时放到接收的形参里面，决心处理-->
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <!--下拉菜单，默认是Hover触发，设置trigger-->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!--router-view根据当前的路由地址，渲染对应的组件。-->
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer
        >Demo ©2024Created by {{ userStore.user.nickname || userStore.user.username }}</el-footer
      >
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
