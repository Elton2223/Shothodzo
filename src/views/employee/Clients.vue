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
            class="px-4 py-3 border-b-2 border-shothodzo-green text-shothodzo-green font-semibold text-sm"
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
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">My Clients</h2>
        <div class="flex gap-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search clients..."
            class="input-field w-64"
          />
        </div>
      </div>

      <!-- Clients Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-shothodzo-green-dark text-white">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID Number</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Family Plan</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="client in filteredClients" :key="client.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ client.first_name }} {{ client.last_name }}</div>
                <div class="text-sm text-gray-500">{{ client.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ client.id_number }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ client.phone || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <span :class="getStatusClass(client.subscription_status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                    {{ client.subscription_status }}
                  </span>
                  <span v-if="client.isOverdue" class="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full" title="Overdue: {{ client.paymentStatus.monthsOverdue }} months">
                    ⚠️ {{ client.paymentStatus.monthsOverdue }}M
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="client.is_family_member" class="text-sm text-shothodzo-purple font-semibold">Yes</span>
                <span v-else class="text-sm text-gray-400">No</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="viewClient(client.id)" class="text-shothodzo-green hover:text-shothodzo-green-dark mr-4">View</button>
                <router-link :to="`/employee/payments?client=${client.id}`" class="text-shothodzo-purple hover:text-shothodzo-purple-dark mr-4">Payments</router-link>
                <router-link :to="`/employee/subscriptions`" class="text-shothodzo-green hover:text-shothodzo-green-dark">Subscription</router-link>
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

const clients = ref([])
const searchQuery = ref('')

const employeeName = computed(() => {
  if (authStore.currentUser) {
    return `${authStore.currentUser.first_name} ${authStore.currentUser.last_name}`
  }
  return 'Employee'
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

const filteredClients = computed(() => {
  if (!searchQuery.value) return clients.value
  
  const query = searchQuery.value.toLowerCase()
  return clients.value.filter(client => 
    client.first_name.toLowerCase().includes(query) ||
    client.last_name.toLowerCase().includes(query) ||
    client.id_number?.toLowerCase().includes(query) ||
    client.email?.toLowerCase().includes(query)
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

const loadClients = () => {
  const employeeId = getEmployeeId(authStore.currentUser)
  if (!employeeId) {
    console.error('Employee ID not found', authStore.currentUser)
    return
  }
  
  console.log('Loading clients for employee ID:', employeeId, 'Type:', typeof employeeId)
  
  // Mark overdue clients automatically
  markOverdueClients(employeeId)
  
  // Get all clients first to debug
  const allClients = db.getTable('clients')
  console.log('All clients in database:', allClients)
  console.log('Clients with employee_id:', allClients.filter(c => c.employee_id))
  
  const clientsData = db.prepare(`
    SELECT c.*, u.email
    FROM clients c
    JOIN users u ON c.user_id = u.id
    WHERE c.employee_id = ?
    ORDER BY c.created_at DESC
  `).all(employeeId)
  
  console.log('Clients found for employee:', clientsData)
  
  // Also try with string conversion in case of type mismatch
  if (clientsData.length === 0) {
    const clientsDataString = db.prepare(`
      SELECT c.*, u.email
      FROM clients c
      JOIN users u ON c.user_id = u.id
      WHERE c.employee_id = ?
      ORDER BY c.created_at DESC
    `).all(String(employeeId))
    
    if (clientsDataString.length > 0) {
      console.log('Found clients using string employee_id:', clientsDataString)
      clientsData.push(...clientsDataString)
    }
  }
  
  // Add payment status to each client
  clients.value = clientsData.map(client => {
    const paymentStatus = checkPaymentStatus(client.id)
    return {
      ...client,
      paymentStatus,
      isOverdue: paymentStatus.isOverdue && paymentStatus.monthsOverdue >= 3
    }
  })
}

const viewClient = (id) => {
  // Show client details modal or navigate
  console.log('View client:', id)
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
  loadClients()
})
</script>

