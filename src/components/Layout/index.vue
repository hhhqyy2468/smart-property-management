<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <div class="sidebar-container" :class="{ 'sidebar-collapsed': !sidebarOpened }">
      <div class="sidebar-logo">
        <img src="@/assets/images/logo.png" alt="Logo" class="logo-img" />
        <h1 v-show="sidebarOpened" class="logo-title">物业管理系统</h1>
      </div>

      <el-menu
        :default-active="activeMenu"
        :collapse="!sidebarOpened"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#409eff"
        router
      >
        <el-menu-item index="/dashboard">
          <el-icon><House /></el-icon>
          <template #title>首页</template>
        </el-menu-item>

        <!-- 系统管理 -->
        <el-sub-menu index="/system" v-permission="{ permission: ['system:user:view', 'system:role:view', 'system:menu:view'], mode: 'any' }">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item
            index="/system/user"
            v-permission="'system:user:view'"
          >
            用户管理
          </el-menu-item>
          <el-menu-item
            index="/system/role"
            v-permission="'system:role:view'"
          >
            角色管理
          </el-menu-item>
          <el-menu-item
            index="/system/menu"
            v-permission="'system:menu:view'"
          >
            菜单管理
          </el-menu-item>
        </el-sub-menu>

        <!-- 物业管理 -->
        <el-sub-menu index="/property" v-permission="{ permission: ['property:building:view', 'property:house:view'], mode: 'any' }">
          <template #title>
            <el-icon><OfficeBuilding /></el-icon>
            <span>物业管理</span>
          </template>
          <el-menu-item
            index="/property/building"
            v-permission="'property:building:view'"
          >
            楼栋管理
          </el-menu-item>
          <el-menu-item
            index="/property/unit"
            v-permission="'property:unit:view'"
          >
            单元管理
          </el-menu-item>
          <el-menu-item
            index="/property/house"
            v-permission="'property:house:view'"
          >
            房产管理
          </el-menu-item>
          <el-menu-item
            index="/property/resident"
            v-permission="'property:resident:view'"
          >
            住户管理
          </el-menu-item>
        </el-sub-menu>

        <!-- 财务管理 -->
        <el-sub-menu index="/finance" v-permission="{ permission: ['finance:feeType:view', 'finance:bill:view', 'finance:wallet:view'], mode: 'any' }">
          <template #title>
            <el-icon><Money /></el-icon>
            <span>财务管理</span>
          </template>
          <el-menu-item
            index="/finance/feetype"
            v-permission="'finance:feeType:view'"
          >
            费用类型
          </el-menu-item>
          <el-menu-item
            index="/finance/bill"
            v-permission="'finance:bill:view'"
          >
            账单管理
          </el-menu-item>
          <el-menu-item
            index="/finance/wallet"
            v-permission="'finance:wallet:view'"
          >
            钱包管理
          </el-menu-item>
        </el-sub-menu>

        <!-- 服务管理 -->
        <el-sub-menu index="/service" v-permission="{ permission: ['service:complaint:view', 'service:repair:view'], mode: 'any' }">
          <template #title>
            <el-icon><Tools /></el-icon>
            <span>服务管理</span>
          </template>
          <el-menu-item
            index="/service/complaint"
            v-permission="'service:complaint:view'"
          >
            投诉管理
          </el-menu-item>
          <el-menu-item
            index="/service/repair"
            v-permission="'service:repair:view'"
          >
            维修管理
          </el-menu-item>
        </el-sub-menu>

        <!-- 资源管理 -->
        <el-sub-menu index="/resource" v-permission="{ permission: ['property:parking:view', 'property:notice:view'], mode: 'any' }">
          <template #title>
            <el-icon><Van /></el-icon>
            <span>资源管理</span>
          </template>
          <el-menu-item
            index="/resource/parking"
            v-permission="'property:parking:view'"
          >
            停车管理
          </el-menu-item>
          <el-menu-item
            index="/resource/notice"
            v-permission="'property:notice:view'"
          >
            公告管理
          </el-menu-item>
        </el-sub-menu>

        <!-- 数据分析 -->
        <el-sub-menu index="/analytics" v-permission="{ permission: ['analytics:dashboard:view', 'analytics:report:view'], mode: 'any' }">
          <template #title>
            <el-icon><TrendCharts /></el-icon>
            <span>数据分析</span>
          </template>
          <el-menu-item
            index="/analytics/dashboard"
            v-permission="'analytics:dashboard:view'"
          >
            数据大屏
          </el-menu-item>
          <el-menu-item
            index="/analytics/reports"
            v-permission="'analytics:report:view'"
          >
            报表管理
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>

    <!-- 主容器 -->
    <div class="main-container">
      <!-- 顶部导航 -->
      <div class="navbar">
        <div class="navbar-left">
          <el-icon class="toggle-sidebar" @click="toggleSidebar">
            <Fold v-if="sidebarOpened" />
            <Expand v-else />
          </el-icon>

          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentRoute.meta.title">
              {{ currentRoute.meta.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="navbar-right">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              <el-avatar :size="32" :src="userStore.avatar">
                {{ userStore.realName.charAt(0) }}
              </el-avatar>
              <span class="username">{{ userStore.realName }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item
                  command="portal"
                  v-permission="'portal:view'"
                >
                  业主门户
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="app-main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { ElMessageBox } from 'element-plus'
import {
  House,
  Setting,
  OfficeBuilding,
  Money,
  Tools,
  Van,
  TrendCharts,
  Fold,
  Expand,
  ArrowDown
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const sidebarOpened = computed(() => appStore.sidebarStatus)
const activeMenu = computed(() => route.path)
const currentRoute = computed(() => route)

const toggleSidebar = () => {
  appStore.toggleSidebar()
}

const handleCommand = async (command) => {
  switch (command) {
    case 'profile':
      // 跳转到个人中心
      break
    case 'portal':
      router.push('/portal/index')
      break
    case 'logout':
      try {
        await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await userStore.logout()
        router.push('/login')
      } catch (error) {
        // 用户取消操作
      }
      break
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  height: 100vh;
}

.sidebar-container {
  width: 210px;
  background: #001529;
  transition: width 0.3s;
  overflow: hidden;

  &.sidebar-collapsed {
    width: 64px;
  }

  .sidebar-logo {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    background: rgba(255, 255, 255, 0.1);

    .logo-img {
      width: 32px;
      height: 32px;
    }

    .logo-title {
      margin-left: 12px;
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      white-space: nowrap;
    }
  }

  :deep(.el-menu) {
    border-right: none;
  }

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    height: 50px;
    line-height: 50px;
  }
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.navbar {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;

  .navbar-left {
    display: flex;
    align-items: center;

    .toggle-sidebar {
      font-size: 20px;
      cursor: pointer;
      margin-right: 16px;
      padding: 10px;

      &:hover {
        background: #f0f0f0;
        border-radius: 4px;
      }
    }
  }

  .navbar-right {
    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      transition: background-color 0.3s;

      &:hover {
        background: #f0f0f0;
      }

      .username {
        margin: 0 8px;
      }
    }
  }
}

.app-main {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: #f0f2f5;
}
</style>