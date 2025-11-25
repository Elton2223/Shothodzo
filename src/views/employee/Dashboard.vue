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
            <span class="text-sm">Welcome, {{ employeeName }}</span>
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
            to="/employee"
            class="px-4 py-3 border-b-2 border-shothodzo-green text-shothodzo-green font-semibold text-sm"
          >
            Dashboard
          </router-link>
          <router-link
            to="/employee/clients"
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors text-sm font-semibold"
          >
            My Clients
          </router-link>
          <router-link
            to="/employee/payments"
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors text-sm font-semibold"
          >
            Payments
          </router-link>
          <router-link
            to="/employee/subscriptions"
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors text-sm font-semibold"
          >
            Subscriptions
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
              <p class="text-gray-600 text-sm">My Clients</p>
              <p class="text-3xl font-bold text-shothodzo-green mt-2">{{ stats.totalClients }}</p>
            </div>
            <div class="w-12 h-12 bg-shothodzo-green-light rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border-l-4" :class="stats.overdueClients > 0 ? 'border-red-500' : 'border-green-500'">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">Overdue Clients</p>
              <p class="text-3xl font-bold mt-2" :class="stats.overdueClients > 0 ? 'text-red-600' : 'text-green-600'">
                {{ stats.overdueClients }}
              </p>
              <p class="text-xs text-gray-500 mt-1">3+ months unpaid</p>
            </div>
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="stats.overdueClients > 0 ? 'bg-red-100' : 'bg-green-100'">
              <svg class="w-6 h-6" :class="stats.overdueClients > 0 ? 'text-red-600' : 'text-green-600'" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">Total Payments</p>
              <p class="text-3xl font-bold text-shothodzo-purple mt-2">R{{ stats.totalPayments.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-shothodzo-purple-light rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">Employee Code</p>
              <p class="text-xl font-bold text-shothodzo-green mt-2">{{ employeeCode }}</p>
            </div>
            <div class="w-12 h-12 bg-shothodzo-green rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Overdue Clients Alert -->
      <div v-if="overdueClients.length > 0" class="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md mb-6">
        <div class="flex items-center gap-3 mb-4">
          <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <h2 class="text-xl font-bold text-red-800">Overdue Clients (3+ Months Unpaid)</h2>
        </div>
        <div class="space-y-2">
          <div v-for="client in overdueClients" :key="client.id" class="flex items-center justify-between p-3 bg-white rounded-lg">
            <div>
              <p class="font-semibold text-gray-800">{{ client.first_name }} {{ client.last_name }}</p>
              <p class="text-sm text-gray-600">
                {{ client.paymentStatus.monthsOverdue }} months overdue
                <span v-if="client.paymentStatus.lastPaymentDate" class="text-gray-500">
                  • Last payment: {{ new Date(client.paymentStatus.lastPaymentDate).toLocaleDateString() }}
                </span>
                <span v-else class="text-gray-500">• No payments recorded</span>
              </p>
            </div>
            <span class="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">SUSPENDED</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Recent Client Activity</h2>
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="w-10 h-10 bg-shothodzo-green-light rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
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
import { getEmployeeId } from '../../utils/employee'
import { markOverdueClients, getOverdueClients } from '../../utils/paymentTracking'

const router = useRouter()
const authStore = useAuthStore()

const stats = ref({
  totalClients: 0,
  totalPayments: 0,
  overdueClients: 0
})

const recentActivity = ref([])
const overdueClients = ref([])

const employeeName = computed(() => {
  if (authStore.currentUser) {
    return `${authStore.currentUser.first_name} ${authStore.currentUser.last_name}`
  }
  return 'Employee'
})

const employeeCode = computed(() => {
  return authStore.currentUser?.employee_code || 'N/A'
})

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

const loadStats = () => {
  const employeeId = getEmployeeId(authStore.currentUser)
  if (!employeeId) {
    console.error('Employee ID not found')
    return
  }
  
  // Mark overdue clients automatically
  markOverdueClients(employeeId)
  
  // Get overdue clients
  overdueClients.value = getOverdueClients(employeeId)
  
  const countResult = db.prepare('SELECT COUNT(*) as count FROM clients WHERE employee_id = ?').get(employeeId)
  stats.value.totalClients = countResult?.count || 0
  
  const paymentsResult = db.prepare(`
    SELECT SUM(amount) as total FROM payments 
    WHERE employee_id = ? AND status = ?
  `).get(employeeId, 'completed')
  
  stats.value.totalPayments = paymentsResult?.total || 0
  stats.value.overdueClients = overdueClients.value.length
}

const formatDate = (dateValue) => {
  if (!dateValue) {
    return 'Date not available'
  }
  
  try {
    const date = new Date(dateValue)
    if (isNaN(date.getTime())) {
      return 'Date not available'
    }
    return date.toLocaleString()
  } catch (error) {
    console.error('Error formatting date:', dateValue, error)
    return 'Date not available'
  }
}

const loadRecentActivity = () => {
  const employeeId = getEmployeeId(authStore.currentUser)
  if (!employeeId) {
    console.error('Employee ID not found')
    return
  }
  
  const clients = db.prepare(`
    SELECT c.*, u.email, u.created_at as user_created_at
    FROM clients c
    JOIN users u ON c.user_id = u.id
    WHERE c.employee_id = ?
    ORDER BY COALESCE(c.created_at, u.created_at) DESC
    LIMIT 5
  `).all(employeeId)

  recentActivity.value = clients.map(c => {
    // Use client created_at if available, otherwise fall back to user created_at
    const dateValue = c.created_at || c.user_created_at
    return {
      id: c.id,
      description: `New client registered: ${c.first_name} ${c.last_name}`,
      timestamp: formatDate(dateValue)
    }
  })
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  if (!authStore.isEmployee) {
    router.push('/login')
    return
  }
  loadStats()
  loadRecentActivity()
})
</script>

