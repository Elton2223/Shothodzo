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
      <div class="mb-6">
        <button @click="goBack" class="text-shothodzo-green hover:text-shothodzo-green-dark mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Subscriptions
        </button>
        <h2 class="text-3xl font-bold text-gray-800">Manage Client Subscription</h2>
        <p class="text-gray-600 mt-2">{{ clientInfo.first_name }} {{ clientInfo.last_name }}</p>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-shothodzo-green"></div>
        <p class="mt-4 text-gray-600">Loading client information...</p>
      </div>

      <div v-else class="space-y-6">
        <!-- Client Information Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-800">Client Information</h3>
            <button 
              @click="editingClient = !editingClient" 
              class="btn-secondary text-sm"
            >
              {{ editingClient ? 'Cancel Edit' : 'Edit Information' }}
            </button>
          </div>

          <form v-if="editingClient" @submit.prevent="saveClientInfo" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  v-model="clientForm.first_name"
                  type="text"
                  required
                  class="input-field"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  v-model="clientForm.last_name"
                  type="text"
                  required
                  class="input-field"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                <input
                  v-model="clientForm.id_number"
                  type="text"
                  class="input-field"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  v-model="clientForm.phone_number"
                  type="tel"
                  class="input-field"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="clientForm.email"
                type="email"
                class="input-field"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                v-model="clientForm.address"
                rows="3"
                class="input-field"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                v-model="clientForm.date_of_birth"
                type="date"
                class="input-field"
              />
            </div>

            <div class="flex gap-4 pt-4">
              <button type="submit" class="btn-primary">Save Changes</button>
              <button type="button" @click="editingClient = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg">
                Cancel
              </button>
            </div>
          </form>

          <div v-else class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-600">Name</p>
              <p class="font-semibold text-gray-900">{{ clientInfo.first_name }} {{ clientInfo.last_name }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Email</p>
              <p class="font-semibold text-gray-900">{{ clientInfo.email || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Phone</p>
              <p class="font-semibold text-gray-900">{{ clientInfo.phone_number || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">ID Number</p>
              <p class="font-semibold text-gray-900">{{ clientInfo.id_number || 'N/A' }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-sm text-gray-600">Address</p>
              <p class="font-semibold text-gray-900">{{ clientInfo.address || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <!-- Subscription Information Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-800">Subscription Details</h3>
            <div class="flex gap-2">
              <button 
                v-if="subscription && subscription.status !== 'cancelled'"
                @click="showRevokeModal = true" 
                class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg text-sm"
              >
                Revoke Subscription
              </button>
              <button 
                @click="editingSubscription = !editingSubscription" 
                class="btn-secondary text-sm"
              >
                {{ editingSubscription ? 'Cancel Edit' : 'Edit Subscription' }}
              </button>
            </div>
          </div>

          <form v-if="editingSubscription" @submit.prevent="saveSubscription" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Plan Type *</label>
                <select v-model="subscriptionForm.planType" @change="updatePremium" required class="input-field">
                  <option value="individual">Individual (R500/month)</option>
                  <option value="family">Family (R1,200/month)</option>
                </select>
              </div>
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
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  v-model="subscriptionForm.startDate"
                  type="date"
                  required
                  class="input-field"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select v-model="subscriptionForm.status" required class="input-field">
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div class="flex gap-4 pt-4">
              <button type="submit" class="btn-primary">Save Changes</button>
              <button type="button" @click="editingSubscription = false" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg">
                Cancel
              </button>
            </div>
          </form>

          <div v-else>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p class="text-sm text-gray-600">Plan Type</p>
                <p class="font-semibold text-gray-900">{{ subscription?.plan_type?.toUpperCase() || 'N/A' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Monthly Premium</p>
                <p class="font-semibold text-gray-900">R{{ subscription?.monthly_premium?.toLocaleString() || '0' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Start Date</p>
                <p class="font-semibold text-gray-900">{{ subscription?.start_date ? new Date(subscription.start_date).toLocaleDateString() : 'N/A' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Status</p>
                <span :class="getStatusClass(subscription?.status || 'N/A')" class="px-2 py-1 text-xs font-semibold rounded-full">
                  {{ subscription?.status || 'No Subscription' }}
                </span>
              </div>
            </div>
            <div v-if="!subscription" class="text-center py-4">
              <p class="text-gray-600 mb-4">No subscription found for this client.</p>
              <button @click="editingSubscription = true" class="btn-primary">Create Subscription</button>
            </div>
          </div>
        </div>

        <!-- Payment History & Skipped Months Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Payment History & Cash Payments</h3>
          
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-gray-700 mb-3">Mark Skipped Payment Month (Cash Payment)</h4>
            <form @submit.prevent="markSkippedMonth" class="flex gap-4 items-end">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Month & Year</label>
                <input
                  v-model="skippedMonthForm.month"
                  type="month"
                  required
                  class="input-field"
                />
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Amount Paid (R)</label>
                <input
                  v-model.number="skippedMonthForm.amount"
                  type="number"
                  step="0.01"
                  required
                  class="input-field"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Reference Number</label>
                <input
                  v-model="skippedMonthForm.reference"
                  type="text"
                  class="input-field"
                  placeholder="Optional"
                />
              </div>
              <button type="submit" class="btn-primary">Record Cash Payment</button>
            </form>
          </div>

          <div class="border-t pt-4">
            <h4 class="text-lg font-semibold text-gray-700 mb-3">Payment History</h4>
            <div v-if="paymentHistory.length === 0" class="text-center py-8 text-gray-500">
              No payment history available
            </div>
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="payment in paymentHistory" :key="payment.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ new Date(payment.payment_date).toLocaleDateString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      R{{ payment.amount?.toLocaleString() || '0' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ payment.payment_method || 'N/A' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ payment.reference_number || 'N/A' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getPaymentStatusClass(payment.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                        {{ payment.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Send Warning Section -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Send Warning to Client</h3>
          
          <form @submit.prevent="sendWarning" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Warning Type *</label>
              <select v-model="warningForm.type" required class="input-field">
                <option value="">Select warning type...</option>
                <option value="payment_overdue">Payment Overdue</option>
                <option value="subscription_violation">Subscription Violation</option>
                <option value="documentation_required">Documentation Required</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
              <input
                v-model="warningForm.subject"
                type="text"
                required
                class="input-field"
                placeholder="Warning subject"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                v-model="warningForm.message"
                rows="5"
                required
                class="input-field"
                placeholder="Enter warning message to the client..."
              ></textarea>
            </div>

            <div class="flex gap-4 pt-4">
              <button type="submit" class="btn-primary">Send Warning</button>
              <button type="button" @click="resetWarningForm" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg">
                Clear
              </button>
            </div>
          </form>

          <div v-if="clientWarnings.length > 0" class="mt-6 border-t pt-4">
            <h4 class="text-lg font-semibold text-gray-700 mb-3">Previous Warnings</h4>
            <div class="space-y-3">
              <div v-for="warning in clientWarnings" :key="warning.id" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <p class="font-semibold text-gray-900">{{ warning.subject }}</p>
                    <p class="text-sm text-gray-600">{{ warning.type.replace('_', ' ').toUpperCase() }}</p>
                  </div>
                  <span class="text-xs text-gray-500">{{ new Date(warning.created_at).toLocaleDateString() }}</span>
                </div>
                <p class="text-sm text-gray-700">{{ warning.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Revoke Subscription Modal -->
      <div v-if="showRevokeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Revoke Subscription</h3>
          <p class="text-gray-600 mb-6">Are you sure you want to revoke this subscription? This action cannot be undone.</p>
          <div class="flex gap-4">
            <button @click="confirmRevoke" class="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg">
              Yes, Revoke
            </button>
            <button @click="showRevokeModal = false" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import db from '../../database/db'
import { getEmployeeId } from '../../utils/employee'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const loading = ref(true)
const clientId = ref(null)
const clientInfo = ref({})
const subscription = ref(null)
const paymentHistory = ref([])
const clientWarnings = ref([])

const editingClient = ref(false)
const editingSubscription = ref(false)
const showRevokeModal = ref(false)

const clientForm = ref({
  first_name: '',
  last_name: '',
  id_number: '',
  phone_number: '',
  email: '',
  address: '',
  date_of_birth: ''
})

const subscriptionForm = ref({
  planType: 'individual',
  monthlyPremium: 500,
  startDate: new Date().toISOString().split('T')[0],
  status: 'active'
})

const skippedMonthForm = ref({
  month: '',
  amount: 0,
  reference: ''
})

const warningForm = ref({
  type: '',
  subject: '',
  message: ''
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

const employeeName = computed(() => {
  if (authStore.currentUser) {
    return `${authStore.currentUser.first_name} ${authStore.currentUser.last_name}`
  }
  return 'Employee'
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

const getPaymentStatusClass = (status) => {
  const classes = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const loadClientData = () => {
  try {
    clientId.value = parseInt(route.params.clientId)
    
    // Load client information
    const client = db.prepare(`
      SELECT c.*, u.email
      FROM clients c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `).get(clientId.value)
    
    if (!client) {
      alert('Client not found')
      router.push('/employee/subscriptions')
      return
    }
    
    clientInfo.value = client
    
    // Populate client form
    clientForm.value = {
      first_name: client.first_name || '',
      last_name: client.last_name || '',
      id_number: client.id_number || '',
      phone_number: client.phone_number || '',
      email: client.email || '',
      address: client.address || '',
      date_of_birth: client.date_of_birth || ''
    }
    
    // Load subscription
    const sub = db.prepare('SELECT * FROM subscriptions WHERE client_id = ?').get(clientId.value)
    subscription.value = sub || null
    
    if (sub) {
      subscriptionForm.value = {
        planType: sub.plan_type || 'individual',
        monthlyPremium: sub.monthly_premium || 500,
        startDate: sub.start_date || new Date().toISOString().split('T')[0],
        status: sub.status || 'active'
      }
    }
    
    // Load payment history
    paymentHistory.value = db.prepare(`
      SELECT * FROM payments
      WHERE client_id = ?
      ORDER BY payment_date DESC, created_at DESC
    `).all(clientId.value)
    
    // Load warnings
    loadWarnings()
    
    loading.value = false
  } catch (error) {
    console.error('Error loading client data:', error)
    alert('Error loading client data: ' + error.message)
    loading.value = false
  }
}

const loadWarnings = () => {
  try {
    const warnings = JSON.parse(localStorage.getItem('shothodzo_warnings') || '[]')
    clientWarnings.value = warnings
      .filter(w => w.client_id === clientId.value)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } catch (error) {
    console.error('Error loading warnings:', error)
    clientWarnings.value = []
  }
}

const saveClientInfo = () => {
  try {
    // Update client in database
    db.prepare(`
      UPDATE clients
      SET first_name = ?, last_name = ?, id_number = ?, phone_number = ?, address = ?, date_of_birth = ?
      WHERE id = ?
    `).run(
      clientForm.value.first_name,
      clientForm.value.last_name,
      clientForm.value.id_number,
      clientForm.value.phone_number,
      clientForm.value.address,
      clientForm.value.date_of_birth,
      clientId.value
    )
    
    // Update email in users table
    if (clientForm.value.email) {
      const user = db.prepare('SELECT user_id FROM clients WHERE id = ?').get(clientId.value)
      if (user) {
        db.prepare('UPDATE users SET email = ? WHERE id = ?').run(clientForm.value.email, user.user_id)
      }
    }
    
    editingClient.value = false
    loadClientData()
    alert('Client information updated successfully!')
  } catch (error) {
    console.error('Error saving client info:', error)
    alert('Error saving client information: ' + error.message)
  }
}

const updatePremium = () => {
  subscriptionForm.value.monthlyPremium = subscriptionForm.value.planType === 'family' ? 1200 : 500
}

const saveSubscription = () => {
  try {
    if (subscription.value) {
      // Update existing subscription
      db.prepare(`
        UPDATE subscriptions
        SET plan_type = ?, monthly_premium = ?, start_date = ?, status = ?
        WHERE id = ?
      `).run(
        subscriptionForm.value.planType,
        subscriptionForm.value.monthlyPremium,
        subscriptionForm.value.startDate,
        subscriptionForm.value.status,
        subscription.value.id
      )
      
      // Update client subscription status
      db.prepare('UPDATE clients SET subscription_status = ? WHERE id = ?').run(
        subscriptionForm.value.status,
        clientId.value
      )
    } else {
      // Create new subscription
      db.prepare(`
        INSERT INTO subscriptions (client_id, plan_type, monthly_premium, start_date, status)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        clientId.value,
        subscriptionForm.value.planType,
        subscriptionForm.value.monthlyPremium,
        subscriptionForm.value.startDate,
        subscriptionForm.value.status
      )
      
      // Update client subscription status
      db.prepare('UPDATE clients SET subscription_status = ? WHERE id = ?').run(
        subscriptionForm.value.status,
        clientId.value
      )
    }
    
    editingSubscription.value = false
    loadClientData()
    alert('Subscription saved successfully!')
  } catch (error) {
    console.error('Error saving subscription:', error)
    alert('Error saving subscription: ' + error.message)
  }
}

const markSkippedMonth = () => {
  try {
    const employeeId = getEmployeeId(authStore.currentUser)
    if (!employeeId) {
      alert('Employee ID not found')
      return
    }
    
    // Create payment record for cash payment
    db.prepare(`
      INSERT INTO payments (client_id, employee_id, amount, payment_date, payment_method, reference_number, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      clientId.value,
      employeeId,
      skippedMonthForm.value.amount,
      skippedMonthForm.value.month + '-01', // Use first day of month
      'cash',
      skippedMonthForm.value.reference || `CASH-${Date.now()}`,
      'Cash payment recorded by employee',
      'completed'
    )
    
    // Reset form
    skippedMonthForm.value = {
      month: '',
      amount: 0,
      reference: ''
    }
    
    loadClientData()
    alert('Cash payment recorded successfully!')
  } catch (error) {
    console.error('Error recording cash payment:', error)
    alert('Error recording cash payment: ' + error.message)
  }
}

const sendWarning = () => {
  try {
    const warnings = JSON.parse(localStorage.getItem('shothodzo_warnings') || '[]')
    const newWarning = {
      id: warnings.length > 0 ? Math.max(...warnings.map(w => w.id || 0)) + 1 : 1,
      client_id: clientId.value,
      type: warningForm.value.type,
      subject: warningForm.value.subject,
      message: warningForm.value.message,
      created_at: new Date().toISOString(),
      read: false
    }
    
    warnings.push(newWarning)
    localStorage.setItem('shothodzo_warnings', JSON.stringify(warnings))
    
    resetWarningForm()
    loadWarnings()
    alert('Warning sent to client successfully!')
  } catch (error) {
    console.error('Error sending warning:', error)
    alert('Error sending warning: ' + error.message)
  }
}

const resetWarningForm = () => {
  warningForm.value = {
    type: '',
    subject: '',
    message: ''
  }
}

const confirmRevoke = () => {
  try {
    if (subscription.value) {
      db.prepare('UPDATE subscriptions SET status = ? WHERE id = ?').run('cancelled', subscription.value.id)
      db.prepare('UPDATE clients SET subscription_status = ? WHERE id = ?').run('cancelled', clientId.value)
      
      showRevokeModal.value = false
      loadClientData()
      alert('Subscription revoked successfully!')
    }
  } catch (error) {
    console.error('Error revoking subscription:', error)
    alert('Error revoking subscription: ' + error.message)
  }
}

const goBack = () => {
  router.push('/employee/subscriptions')
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
  loadClientData()
})
</script>

