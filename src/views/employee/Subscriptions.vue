<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-shothodzo-green-dark text-white shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <router-link to="/" class="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
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
                <button @click="manageSubscription(item)" class="text-shothodzo-green hover:text-shothodzo-green-dark mr-4">
                  {{ item.subscription_id ? 'Manage' : 'Create' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Manage Subscription Modal -->
      <div v-if="showManageModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">
            {{ selectedSubscription ? 'Manage Subscription' : 'Create Subscription' }}
          </h3>
          
          <form @submit.prevent="handleSaveSubscription" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <input
                  :value="selectedClient?.client_name || ''"
                  type="text"
                  disabled
                  class="input-field bg-gray-100"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Plan Type *</label>
                <select v-model="subscriptionForm.planType" @change="updatePremium" required class="input-field">
                  <option value="individual">Individual (R500/month)</option>
                  <option value="family">Family (R1,200/month)</option>
                </select>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Monthly Premium (R) *</label>
                <input
                  v-model.number="subscriptionForm.monthlyPremium"
                  type="number"
                  step="0.01"
                  required
                  class="input-field"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  v-model="subscriptionForm.startDate"
                  type="date"
                  required
                  class="input-field"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
              <select v-model="subscriptionForm.status" required class="input-field">
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div class="flex gap-4 pt-4">
              <button type="submit" class="flex-1 btn-primary">Save Changes</button>
              <button type="button" @click="closeModal" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg">Cancel</button>
            </div>
          </form>
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
import { checkPaymentStatus, markOverdueClients } from '../../utils/paymentTracking'

const router = useRouter()
const authStore = useAuthStore()

const subscriptions = ref([])
const searchQuery = ref('')
const showManageModal = ref(false)
const selectedClient = ref(null)
const selectedSubscription = ref(null)
const subscriptionForm = ref({
  planType: 'individual',
  monthlyPremium: 500,
  startDate: new Date().toISOString().split('T')[0],
  status: 'active'
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
  
  // Get all subscriptions
  const allSubscriptions = JSON.parse(localStorage.getItem('shothodzo_subscriptions') || '[]')
  
  subscriptions.value = clients.map(client => {
    const subscription = allSubscriptions.find(s => s.client_id === client.id)
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

const updatePremium = () => {
  subscriptionForm.value.monthlyPremium = subscriptionForm.value.planType === 'family' ? 1200 : 500
}

const manageSubscription = (item) => {
  selectedClient.value = item
  const allSubscriptions = JSON.parse(localStorage.getItem('shothodzo_subscriptions') || '[]')
  selectedSubscription.value = item.subscription_id ? allSubscriptions.find(s => s.id === item.subscription_id) : null
  
  if (selectedSubscription.value) {
    subscriptionForm.value = {
      planType: selectedSubscription.value.plan_type,
      monthlyPremium: selectedSubscription.value.monthly_premium,
      startDate: selectedSubscription.value.start_date,
      status: selectedSubscription.value.status
    }
  } else {
    subscriptionForm.value = {
      planType: 'individual',
      monthlyPremium: 500,
      startDate: new Date().toISOString().split('T')[0],
      status: 'active'
    }
  }
  
  showManageModal.value = true
}

const closeModal = () => {
  showManageModal.value = false
  selectedClient.value = null
  selectedSubscription.value = null
}

const handleSaveSubscription = () => {
  try {
    const subscriptionsTable = db.getTable('subscriptions')
    const clientsTable = db.getTable('clients')
    
    if (selectedSubscription.value) {
      // Update existing subscription
      const index = subscriptionsTable.findIndex(s => s.id === selectedSubscription.value.id)
      if (index !== -1) {
        subscriptionsTable[index] = {
          ...subscriptionsTable[index],
          plan_type: subscriptionForm.value.planType,
          monthly_premium: subscriptionForm.value.monthlyPremium,
          start_date: subscriptionForm.value.startDate,
          status: subscriptionForm.value.status
        }
        db.setTable('subscriptions', subscriptionsTable)
      }
    } else {
      // Create new subscription
      const newSubscription = {
        id: subscriptionsTable.length > 0 ? Math.max(...subscriptionsTable.map(s => s.id || 0)) + 1 : 1,
        client_id: selectedClient.value.client_id,
        plan_type: subscriptionForm.value.planType,
        monthly_premium: subscriptionForm.value.monthlyPremium,
        start_date: subscriptionForm.value.startDate,
        end_date: null,
        status: subscriptionForm.value.status,
        created_at: new Date().toISOString()
      }
      subscriptionsTable.push(newSubscription)
      db.setTable('subscriptions', subscriptionsTable)
    }
    
    // Update client subscription status
    const clientIndex = clientsTable.findIndex(c => c.id === selectedClient.value.client_id)
    if (clientIndex !== -1) {
      clientsTable[clientIndex].subscription_status = subscriptionForm.value.status
      db.setTable('clients', clientsTable)
    }
    
    closeModal()
    loadSubscriptions()
    alert('Subscription saved successfully!')
  } catch (error) {
    console.error('Error saving subscription:', error)
    alert('Error saving subscription: ' + error.message)
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  if (!authStore.isEmployee) {
    router.push('/login')
    return
  }
  loadSubscriptions()
})
</script>

