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
  // 系统管理
  {
    path: '/system',
    name: 'System',
    component: () => import('@/components/Layout/index.vue'),
    meta: { title: '系统管理', icon: 'Setting' },
    children: [
      {
        path: 'user',
        name: 'SystemUser',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: '用户管理', icon: 'User' }
      },
      {
        path: 'role',
        name: 'SystemRole',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: '角色管理', icon: 'Tools' }
      },
      {
        path: 'menu',
        name: 'SystemMenu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: { title: '菜单管理', icon: 'Document' }
      }
    ]
  },
  // 物业管理
  {
    path: '/property',
    name: 'Property',
    component: () => import('@/components/Layout/index.vue'),
    meta: { title: '物业管理', icon: 'OfficeBuilding' },
    children: [
      {
        path: 'building',
        name: 'PropertyBuilding',
        component: () => import('@/views/property/building/index.vue'),
        meta: { title: '楼栋管理', icon: 'OfficeBuilding' }
      },
      {
        path: 'unit',
        name: 'PropertyUnit',
        component: () => import('@/views/property/unit/index.vue'),
        meta: { title: '单元管理', icon: 'OfficeBuilding' }
      },
      {
        path: 'house',
        name: 'PropertyHouse',
        component: () => import('@/views/property/house/index.vue'),
        meta: { title: '房产管理', icon: 'OfficeBuilding' }
      },
      {
        path: 'resident',
        name: 'PropertyResident',
        component: () => import('@/views/property/resident/index.vue'),
        meta: { title: '住户管理', icon: 'OfficeBuilding' }
      }
    ]
  },
  // 财务管理
  {
    path: '/finance',
    name: 'Finance',
    component: () => import('@/components/Layout/index.vue'),
    meta: { title: '财务管理', icon: 'Money' },
    children: [
      {
        path: 'feetype',
        name: 'FinanceFeeType',
        component: () => import('@/views/property/feetype/index.vue'),
        meta: { title: '费用类型', icon: 'Money' }
      },
      {
        path: 'bill',
        name: 'FinanceBill',
        component: () => import('@/views/property/bill/index.vue'),
        meta: { title: '账单管理', icon: 'Money' }
      },
      {
        path: 'wallet',
        name: 'FinanceWallet',
        component: () => import('@/views/property/wallet/index.vue'),
        meta: { title: '钱包管理', icon: 'Money' }
      }
    ]
  },
  // 服务管理
  {
    path: '/service',
    name: 'Service',
    component: () => import('@/components/Layout/index.vue'),
    meta: { title: '服务管理', icon: 'Tools' },
    children: [
      {
        path: 'complaint',
        name: 'ServiceComplaint',
        component: () => import('@/views/property/complaint/index.vue'),
        meta: { title: '投诉管理', icon: 'Message' }
      },
      {
        path: 'repair',
        name: 'ServiceRepair',
        component: () => import('@/views/property/repair/index.vue'),
        meta: { title: '维修管理', icon: 'Tools' }
      }
    ]
  },
  // 资源管理
  {
    path: '/resource',
    name: 'Resource',
    component: () => import('@/components/Layout/index.vue'),
    meta: { title: '资源管理', icon: 'Van' },
    children: [
      {
        path: 'parking',
        name: 'ResourceParking',
        component: () => import('@/views/property/parking/index.vue'),
        meta: { title: '停车管理', icon: 'Van' }
      },
      {
        path: 'notice',
        name: 'ResourceNotice',
        component: () => import('@/views/property/notice/index.vue'),
        meta: { title: '公告管理', icon: 'Bell' }
      }
    ]
  },
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