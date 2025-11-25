<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-shothodzo-green-dark text-white shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <router-link :to="logoRoute" class="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
            <div class="w-[310px] h-[150px] bg-white rounded-lg flex items-center justify-center p-2 shadow-md overflow-hidden">
              <img src="/images/Shothodzo.jpg" alt="Shothodzo Logo" class="w-full h-full object-cover rounded" />
            </div>
          </router-link>
          <div class="flex items-center gap-4">
            <span class="text-sm">Welcome, Admin</span>
            <button @click="handleLogout" class="btn-secondary text-sm">Logout</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <div class="flex gap-6">
          <router-link
            to="/admin"
            class="px-4 py-3 border-b-2 border-shothodzo-green text-shothodzo-green font-semibold text-sm"
          >
            Dashboard
          </router-link>
          <router-link
            to="/admin/employees"
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors text-sm font-semibold"
          >
            Employees
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">Total Employees</p>
              <p class="text-3xl font-bold text-shothodzo-green mt-2">{{ stats.totalEmployees }}</p>
            </div>
            <div class="w-12 h-12 bg-shothodzo-green-light rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">Total Clients</p>
              <p class="text-3xl font-bold text-shothodzo-purple mt-2">{{ stats.totalClients }}</p>
            </div>
            <div class="w-12 h-12 bg-shothodzo-purple-light rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">Total Revenue</p>
              <p class="text-3xl font-bold text-shothodzo-green mt-2">R{{ stats.totalRevenue.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-shothodzo-green rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="w-10 h-10 bg-shothodzo-green-light rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-800">{{ activity.description }}</p>
              <p class="text-sm text-gray-500">{{ activity.timestamp }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import db from '../../database/db'

const router = useRouter()
const authStore = useAuthStore()

const logoRoute = computed(() => {
  if (authStore.isAuthenticated) {
    if (authStore.isAdmin) {
      return '/admin'
    } else if (authStore.isEmployee) {
      return '/employee'
    } else if (authStore.isClient) {
      return '/client'
    }
  }
  return '/'
})

const stats = ref({
  totalEmployees: 0,
  totalClients: 0,
  totalRevenue: 0
})

const recentActivity = ref([])

const loadStats = () => {
  stats.value.totalEmployees = db.prepare('SELECT COUNT(*) as count FROM employees').get().count
  stats.value.totalClients = db.prepare('SELECT COUNT(*) as count FROM clients').get().count
  
  const revenueResult = db.prepare('SELECT SUM(amount) as total FROM payments WHERE status = ?').get('completed')
  stats.value.totalRevenue = revenueResult.total || 0
}

const loadRecentActivity = () => {
  // Get recent payments
  const payments = db.prepare(`
    SELECT p.*, c.first_name || ' ' || c.last_name as client_name, e.first_name || ' ' || e.last_name as employee_name
    FROM payments p
    JOIN clients c ON p.client_id = c.id
    JOIN employees e ON p.employee_id = e.id
    ORDER BY p.created_at DESC
    LIMIT 5
  `).all()

  recentActivity.value = payments.map(p => ({
    id: p.id,
    description: `Payment of R${p.amount} from ${p.client_name} processed by ${p.employee_name}`,
    timestamp: new Date(p.created_at).toLocaleString()
  }))
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  if (!authStore.isAdmin) {
    router.push('/login')
    return
  }
  loadStats()
  loadRecentActivity()
})
</script>

