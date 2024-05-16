import { createRouter, createWebHistory } from 'vue-router'
//createRouter创建路由实例 ,createWebHistory为history模式
const router = createRouter({
  //import.meta.env.BASE_URL获取项目的基础URL ,默认为/，用于处理路由的路径
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //导入路由规则
    { path: '/login', component: () => import('@/views/login/loginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayOutContainer.vue'),
      redirect: '/article/manage', //重定向
      children: [
        { path: '/article/manage', component: () => import('@/views/article/ArticleManage.vue') },
        { path: '/article/channel', component: () => import('@/views/article/ArticleChannel.vue') },
        { path: '/user/profile', component: () => import('@/views/user/UserProfile.vue') },
        { path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue') },
        { path: '/user/password', component: () => import('@/views/user/UserPassword.vue') }
      ]
    }
  ]
})

export default router
