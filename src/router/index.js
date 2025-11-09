import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', hideInMenu: true }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/components/Layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'House' }
      }
    ]
  },
  // 系统管理（暂时隐藏，等页面创建后再开启）
  // {
  //   path: '/system',
  //   name: 'System',
  //   component: () => import('@/components/Layout/index.vue'),
  //   meta: { title: '系统管理', icon: 'Setting' },
  //   children: [
  //     {
  //       path: 'user',
  //       name: 'SystemUser',
  //       component: () => import('@/views/system/user/index.vue'),
  //       meta: { title: '用户管理', icon: 'User' }
  //     }
  //   ]
  // },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/dashboard',
    meta: { hideInMenu: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 社区物业管理系统` : '社区物业管理系统'

  const token = localStorage.getItem('token')

  if (to.path === '/login') {
    if (token) {
      next('/')
    } else {
      next()
    }
  } else {
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router