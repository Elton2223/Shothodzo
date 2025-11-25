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
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors text-sm font-semibold"
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
            class="px-4 py-3 border-b-2 border-shothodzo-green text-shothodzo-green font-semibold text-sm"
          >
            Subscriptions
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Client Subscriptions</h2>
        <div class="flex gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search clients..."
            class="input-field w-64"
          />
        </div>
      </div>

      <!-- Subscriptions Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-shothodzo-green-dark text-white">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Client</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Plan Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Monthly Premium</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Start Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in filteredSubscriptions" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.client_name }}</div>
                <div class="text-sm text-gray-500">{{ item.client_email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-shothodzo-green">{{ item.plan_type?.toUpperCase() || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-shothodzo-purple">R{{ item.monthly_premium?.toLocaleString() || '0' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ item.start_date ? new Date(item.start_date).toLocaleDateString() : 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <span v-if="item.subscription_status" :class="getStatusClass(item.subscription_status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                    {{ item.subscription_status }}
                  </span>
                  <span v-else class="text-sm text-gray-400">No Subscription</span>
                  <span v-if="item.isOverdue" class="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full" :title="`Overdue: ${item.paymentStatus.monthsOverdue} months - ${item.paymentStatus.reason}`">
                    ⚠️ {{ item.paymentStatus.monthsOverdue }}M
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <router-link 
                  :to="`/employee/subscriptions/${item.client_id}`" 
                  class="text-shothodzo-green hover:text-shothodzo-green-dark mr-4"
                >
                  {{ item.subscription_id ? 'Manage' : 'Create' }}
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
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
import { checkPaymentStatus, markOverdueClients } from '../../utils/paymentTracking'

const router = useRouter()
const authStore = useAuthStore()

const subscriptions = ref([])
const searchQuery = ref('')

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

const employeeName = computed(() => {
  if (authStore.currentUser) {
    return `${authStore.currentUser.first_name} ${authStore.currentUser.last_name}`
  }
  return 'Employee'
})

const filteredSubscriptions = computed(() => {
  if (!searchQuery.value) return subscriptions.value
  
  const query = searchQuery.value.toLowerCase()
  return subscriptions.value.filter(item => 
    item.client_name?.toLowerCase().includes(query) ||
    item.client_email?.toLowerCase().includes(query)
  )
})

const getStatusClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    suspended: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const loadSubscriptions = () => {
  const employeeId = getEmployeeId(authStore.currentUser)
  if (!employeeId) {
    console.error('Employee ID not found')
    return
  }
  
  // Mark overdue clients automatically
  markOverdueClients(employeeId)
  
  // Get all clients for this employee with their subscription info
  const clients = db.prepare(`
    SELECT c.*, u.email as client_email
    FROM clients c
    JOIN users u ON c.user_id = u.id
    WHERE c.employee_id = ?
    ORDER BY c.first_name, c.last_name
  `).all(employeeId)
  
  // Get all subscriptions from database (via db.prepare)
  const dbSubscriptions = db.prepare('SELECT * FROM subscriptions').all() || []
  
  // Get all subscriptions from localStorage (for backward compatibility)
  const localStorageSubscriptions = JSON.parse(localStorage.getItem('shothodzo_subscriptions') || '[]')
  
  // Merge both sources, prioritizing database subscriptions
  const allSubscriptions = [...dbSubscriptions]
  localStorageSubscriptions.forEach(localSub => {
    if (!allSubscriptions.find(s => s.id === localSub.id && s.client_id === localSub.client_id)) {
      allSubscriptions.push(localSub)
    }
  })
  
  subscriptions.value = clients.map(client => {
    // Try to find subscription from database first, then localStorage
    let subscription = dbSubscriptions.find(s => s.client_id === client.id)
    if (!subscription) {
      subscription = localStorageSubscriptions.find(s => s.client_id === client.id)
    }
    
    const paymentStatus = checkPaymentStatus(client.id)
    
    return {
      id: client.id,
      client_id: client.id,
      client_name: `${client.first_name} ${client.last_name}`,
      client_email: client.client_email,
      subscription_id: subscription?.id || null,
      plan_type: subscription?.plan_type || null,
      monthly_premium: subscription?.monthly_premium || null,
      start_date: subscription?.start_date || null,
      status: subscription?.status || null,
      subscription_status: client.subscription_status || subscription?.status || null,
      paymentStatus: paymentStatus,
      isOverdue: paymentStatus.isOverdue && paymentStatus.monthsOverdue >= 3
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
  loadSubscriptions()
})
</script>

