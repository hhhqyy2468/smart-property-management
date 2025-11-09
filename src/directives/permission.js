import { useUserStore } from '@/stores/user'

/**
 * 权限指令 v-permission
 * 用法：
 * v-permission="'user:add'" - 检查是否有指定权限
 * v-permission="['user:add', 'user:edit']" - 检查是否有其中任一权限
 * v-permission="{ permission: 'user:add', mode: 'all' }" - 检查是否拥有所有权限（mode: 'all'/'any'，默认'any'）
 */
export const permission = {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  updated(el, binding) {
    checkPermission(el, binding)
  }
}

function checkPermission(el, binding) {
  const userStore = useUserStore()
  const { value } = binding

  if (!value) {
    return
  }

  let hasPermission = false
  const permissions = userStore.permissions

  // 处理不同格式的权限值
  if (typeof value === 'string') {
    // 单个权限
    hasPermission = permissions.includes(value)
  } else if (Array.isArray(value)) {
    // 权限数组
    hasPermission = value.some(permission => permissions.includes(permission))
  } else if (typeof value === 'object') {
    // 对象格式 { permission: string|array, mode: 'all'|'any' }
    const { permission, mode = 'any' } = value
    const permList = Array.isArray(permission) ? permission : [permission]

    if (mode === 'all') {
      // 需要拥有所有权限
      hasPermission = permList.every(permission => permissions.includes(permission))
    } else {
      // 拥有任一权限即可
      hasPermission = permList.some(permission => permissions.includes(permission))
    }
  }

  // 如果没有权限，隐藏元素
  if (!hasPermission) {
    // 添加样式隐藏元素而不是直接删除，这样可以保持DOM结构
    el.style.display = 'none'
    // 或者完全移除元素（根据需要选择）
    // el.parentNode && el.parentNode.removeChild(el)
  } else {
    el.style.display = ''
  }
}

/**
 * 角色指令 v-role
 * 用法：
 * v-role="'admin'" - 检查是否为指定角色
 * v-role="['admin', 'manager']" - 检查是否为其中任一角色
 * v-role="{ role: 'admin', mode: 'all' }" - 检查是否拥有所有角色
 */
export const role = {
  mounted(el, binding) {
    checkRole(el, binding)
  },
  updated(el, binding) {
    checkRole(el, binding)
  }
}

function checkRole(el, binding) {
  const userStore = useUserStore()
  const { value } = binding

  if (!value) {
    return
  }

  let hasRole = false
  const roles = userStore.roles

  if (typeof value === 'string') {
    // 单个角色
    hasRole = roles.includes(value)
  } else if (Array.isArray(value)) {
    // 角色数组
    hasRole = value.some(role => roles.includes(role))
  } else if (typeof value === 'object') {
    // 对象格式 { role: string|array, mode: 'all'|'any' }
    const { role, mode = 'any' } = value
    const roleList = Array.isArray(role) ? role : [role]

    if (mode === 'all') {
      // 需要拥有所有角色
      hasRole = roleList.every(role => roles.includes(role))
    } else {
      // 拥有任一角色即可
      hasRole = roleList.some(role => roles.includes(role))
    }
  }

  // 如果没有角色权限，隐藏元素
  if (!hasRole) {
    el.style.display = 'none'
  } else {
    el.style.display = ''
  }
}

/**
 * 用户类型指令 v-user-type
 * 用法：
 * v-user-type="1" - 检查是否为指定用户类型
 * v-user-type="[1, 2]" - 检查是否为其中任一用户类型
 */
export const userType = {
  mounted(el, binding) {
    checkUserType(el, binding)
  },
  updated(el, binding) {
    checkUserType(el, binding)
  }
}

function checkUserType(el, binding) {
  const userStore = useUserStore()
  const { value } = binding

  if (!value) {
    return
  }

  const currentUserType = userStore.userType
  let hasPermission = false

  if (typeof value === 'number') {
    // 单个用户类型
    hasPermission = currentUserType === value
  } else if (Array.isArray(value)) {
    // 用户类型数组
    hasPermission = value.includes(currentUserType)
  }

  // 如果没有权限，隐藏元素
  if (!hasPermission) {
    el.style.display = 'none'
  } else {
    el.style.display = ''
  }
}