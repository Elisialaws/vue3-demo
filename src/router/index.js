import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/repo'
//createRouter创建路由实例 ,createWebHistory为history模式
const router = createRouter({
  //import.meta.env.BASE_URL获取项目的基础URL ,默认为/，用于处理路由的路径
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //导入路由规则
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayOutContainer.vue'),
      redirect: '/article/manage', //重定向
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        { path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue') },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})
//登录访问拦截,beforeEach(to,from),to是即将进入的目标，from当前导航正要离开的路由
//根据返回值决定是放行还是拦截,默认为放行，undefined/true是放行
//false 拦截回from页面,如果是返回具体的路径或者路径对象会拦截到对应的地址
router.beforeEach((to) => {
  const useStore = useUserStore()
  if (!useStore.token && to.path != '/login') return '/login'
  return true
})
export default router
