<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Family Plan Popup -->
    <div v-if="showFamilyPlanPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-lg w-full mx-4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 bg-shothodzo-purple-light rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-shothodzo-purple">Family Plan Detected</h3>
        </div>
        
        <div class="mb-6">
          <p class="text-gray-700 mb-4">
            You are currently registered under a family member's plan:
          </p>
          <div class="bg-shothodzo-purple-light bg-opacity-10 p-4 rounded-lg mb-4">
            <p class="font-semibold text-shothodzo-purple">Plan Holder: {{ familyPlanInfo.holderName }}</p>
            <p class="text-sm text-gray-600 mt-1">You are currently covered under this family plan.</p>
          </div>
          <p class="text-gray-700 mb-4">
            If you register for your own subscription, you will be <strong class="text-red-600">terminated from the family plan</strong> and will need to start your own individual or family plan.
          </p>
        </div>

        <div class="flex gap-4">
          <button @click="handleTerminateFamilyPlan" class="flex-1 btn-primary">
            Terminate & Start My Own Plan
          </button>
          <button @click="showFamilyPlanPopup = false" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg">
            Keep Family Plan
          </button>
        </div>
      </div>
    </div>

    <!-- Header -->
    <header class="bg-shothodzo-green-dark text-white shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <router-link to="/" class="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span class="text-shothodzo-green-dark font-bold text-xl">S</span>
            </div>
            <div>
              <h1 class="text-xl font-bold">SHOTHODZO CLIENT</h1>
              <p class="text-xs text-shothodzo-green-light">Funeral Service</p>
            </div>
          </router-link>
          <div class="flex items-center gap-4">
            <span class="text-sm">Welcome, {{ clientName }}</span>
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
            to="/client"
            class="px-4 py-3 border-b-2 border-shothodzo-green text-shothodzo-green font-semibold text-sm"
          >
            Dashboard
          </router-link>
          <router-link
            to="/client/subscription"
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors text-sm font-semibold"
          >
            My Subscription
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Subscription Status Card -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Subscription Status</h2>
            <div class="flex items-center gap-4">
              <span :class="getStatusClass(clientInfo.subscription_status)" class="px-4 py-2 text-sm font-semibold rounded-full">
                {{ clientInfo.subscription_status?.toUpperCase() || 'PENDING' }}
              </span>
              <span v-if="clientInfo.is_family_member" class="px-4 py-2 bg-shothodzo-purple-light bg-opacity-20 text-shothodzo-purple text-sm font-semibold rounded-full">
                Family Plan Member
              </span>
            </div>
          </div>
          <div v-if="clientInfo.subscription_status === 'pending' || clientInfo.is_family_member" class="text-right">
            <p class="text-sm text-gray-600 mb-2">Ready to start your own plan?</p>
            <router-link to="/client/subscription" class="btn-primary">Apply for Subscription</router-link>
          </div>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">My Employee</p>
              <p class="text-xl font-bold text-shothodzo-green mt-2">{{ employeeInfo.name || 'N/A' }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ employeeInfo.code || '' }}</p>
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
              <p class="text-gray-600 text-sm">Total Payments</p>
              <p class="text-3xl font-bold text-shothodzo-purple mt-2">R{{ totalPayments.toLocaleString() }}</p>
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
              <p class="text-gray-600 text-sm">Member Since</p>
              <p class="text-xl font-bold text-shothodzo-green mt-2">{{ memberSince }}</p>
            </div>
            <div class="w-12 h-12 bg-shothodzo-green rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Payments -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Recent Payments</h2>
        <div v-if="recentPayments.length === 0" class="text-center py-8 text-gray-500">
          <p>No payments recorded yet.</p>
        </div>
        <div v-else class="space-y-4">
          <div v-for="payment in recentPayments" :key="payment.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-semibold text-gray-800">R{{ payment.amount.toLocaleString() }}</p>
              <p class="text-sm text-gray-500">{{ new Date(payment.payment_date).toLocaleDateString() }} - {{ payment.payment_method }}</p>
            </div>
            <span :class="getStatusClass(payment.status)" class="px-3 py-1 text-xs font-semibold rounded-full">
              {{ payment.status }}
            </span>
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
import { getClientId } from '../../utils/client'

const router = useRouter()
const authStore = useAuthStore()

const clientInfo = ref({})
const employeeInfo = ref({})
const totalPayments = ref(0)
const recentPayments = ref([])
const showFamilyPlanPopup = ref(false)
const familyPlanInfo = ref({})

const clientName = computed(() => {
  if (authStore.currentUser) {
    return `${authStore.currentUser.first_name} ${authStore.currentUser.last_name}`
  }
  return 'Client'
})

const memberSince = computed(() => {
  if (clientInfo.value.created_at) {
    return new Date(clientInfo.value.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  }
  return 'N/A'
})

const getStatusClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    suspended: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800',
    completed: 'bg-green-100 text-green-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const loadClientInfo = () => {
  const clientId = getClientId(authStore.currentUser)
  if (!clientId) {
    console.error('Client ID not found')
    return
  }
  
  // Get client details
  const client = db.prepare(`
    SELECT c.*, u.email
    FROM clients c
    JOIN users u ON c.user_id = u.id
    WHERE c.id = ?
  `).get(clientId)
  
  clientInfo.value = client || {}

  // Get employee info
  if (client?.employee_id) {
    const employee = db.prepare(`
      SELECT e.first_name || ' ' || e.last_name as name, e.employee_code as code
      FROM employees e
      WHERE e.id = ?
    `).get(client.employee_id)
    
    employeeInfo.value = employee || {}
  }

  // Get payments
  const payments = db.prepare(`
    SELECT * FROM payments
    WHERE client_id = ?
    ORDER BY payment_date DESC, created_at DESC
  `).all(clientId)
  
  recentPayments.value = payments.slice(0, 5)
  
  const paymentsResult = db.prepare(`
    SELECT SUM(amount) as total FROM payments
    WHERE client_id = ? AND status = ?
  `).get(clientId, 'completed')
  
  totalPayments.value = paymentsResult.total || 0

  // Check for family plan info from localStorage (set during registration)
  const storedFamilyPlan = localStorage.getItem('familyPlanInfo')
  if (storedFamilyPlan && client.is_family_member) {
    familyPlanInfo.value = JSON.parse(storedFamilyPlan)
    showFamilyPlanPopup.value = true
    localStorage.removeItem('familyPlanInfo')
  }
}

const handleTerminateFamilyPlan = () => {
  try {
    const clientId = getClientId(authStore.currentUser)
    if (!clientId) {
      alert('Client ID not found. Please log out and log back in.')
      return
    }
    
    // Remove from family_members table
    db.prepare('DELETE FROM family_members WHERE client_id = ?').run(clientId)
    
    // Update client record
    db.prepare(`
      UPDATE clients 
      SET is_family_member = 0, family_plan_holder_id = NULL
      WHERE id = ?
    `).run(clientId)
    
    showFamilyPlanPopup.value = false
    
    // Reload client info
    loadClientInfo()
    
    // Redirect to subscription page
    router.push('/client/subscription')
  } catch (error) {
    alert('Error terminating family plan: ' + error.message)
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  if (!authStore.isClient) {
    router.push('/login')
    return
  }
  loadClientInfo()
})
</script>

