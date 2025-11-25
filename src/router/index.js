import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../views/admin/Dashboard.vue'),
    meta: { requiresAuth: true, requiresRole: 'admin' }
  },
  {
    path: '/admin/employees',
    name: 'AdminEmployees',
    component: () => import('../views/admin/Employees.vue'),
    meta: { requiresAuth: true, requiresRole: 'admin' }
  },
  {
    path: '/employee',
    name: 'EmployeeDashboard',
    component: () => import('../views/employee/Dashboard.vue'),
    meta: { requiresAuth: true, requiresRole: 'employee' }
  },
  {
    path: '/employee/clients',
    name: 'EmployeeClients',
    component: () => import('../views/employee/Clients.vue'),
    meta: { requiresAuth: true, requiresRole: 'employee' }
  },
  {
    path: '/employee/payments',
    name: 'EmployeePayments',
    component: () => import('../views/employee/Payments.vue'),
    meta: { requiresAuth: true, requiresRole: 'employee' }
  },
  {
    path: '/employee/subscriptions',
    name: 'EmployeeSubscriptions',
    component: () => import('../views/employee/Subscriptions.vue'),
    meta: { requiresAuth: true, requiresRole: 'employee' }
  },
  {
    path: '/employee/subscriptions/:clientId',
    name: 'ManageClientSubscription',
    component: () => import('../views/employee/ManageClientSubscription.vue'),
    meta: { requiresAuth: true, requiresRole: 'employee' }
  },
  {
    path: '/client',
    name: 'ClientDashboard',
    component: () => import('../views/client/Dashboard.vue'),
    meta: { requiresAuth: true, requiresRole: 'client' }
  },
  {
    path: '/client/subscription',
    name: 'ClientSubscription',
    component: () => import('../views/client/Subscription.vue'),
    meta: { requiresAuth: true, requiresRole: 'client' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Always try to initialize auth if there's saved data, even if isAuthenticated is false
  // This handles page refreshes where the store might not be initialized yet
  if (localStorage.getItem('shothodzo_current_user') && localStorage.getItem('shothodzo_user_role')) {
    if (!authStore.isAuthenticated) {
      try {
        authStore.initializeAuth()
      } catch (error) {
        console.error('Error initializing auth:', error)
      }
    }
  }
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresRole && authStore.userRole !== to.meta.requiresRole) {
    // Redirect to appropriate dashboard
    if (authStore.isAdmin) {
      next({ name: 'AdminDashboard' })
    } else if (authStore.isEmployee) {
      next({ name: 'EmployeeDashboard' })
    } else if (authStore.isClient) {
      next({ name: 'ClientDashboard' })
    } else {
      next({ name: 'Home' })
    }
  } else {
    next()
  }
})

export default router

