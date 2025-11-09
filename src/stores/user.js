import { defineStore } from 'pinia'
import { login, logout, getUserInfo } from '@/api/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
    permissions: [],
    roles: []
  }),

  getters: {
    isLogin: (state) => !!state.token,
    username: (state) => state.userInfo.username || '',
    realName: (state) => state.userInfo.realName || '',
    userType: (state) => state.userInfo.userType || '',
    avatar: (state) => state.userInfo.avatar || '',
    hasPermission: (state) => (permission) => {
      return state.permissions.includes(permission)
    },
    hasRole: (state) => (role) => {
      return state.roles.includes(role)
    }
  },

  actions: {
    // 登录
    async login(loginForm) {
      try {
        const response = await login(loginForm)
        const { token } = response.data

        this.token = token
        localStorage.setItem('token', token)

        // 获取用户信息
        await this.getUserInfo()

        return response
      } catch (error) {
        throw error
      }
    },

    // 获取用户信息
    async getUserInfo() {
      try {
        const response = await getUserInfo()
        const { user, permissions, roles } = response.data

        this.userInfo = user
        this.permissions = permissions || []
        this.roles = roles || []

        localStorage.setItem('userInfo', JSON.stringify(user))

        return response
      } catch (error) {
        this.logout()
        throw error
      }
    },

    // 登出
    async logout() {
      try {
        await logout()
      } catch (error) {
        console.error('登出接口调用失败:', error)
      } finally {
        this.token = ''
        this.userInfo = {}
        this.permissions = []
        this.roles = []

        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
      }
    },

    // 重置状态
    resetState() {
      this.token = ''
      this.userInfo = {}
      this.permissions = []
      this.roles = []

      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    },

    // 更新用户信息
    updateUserInfo(userInfo) {
      this.userInfo = { ...this.userInfo, ...userInfo }
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    }
  }
})