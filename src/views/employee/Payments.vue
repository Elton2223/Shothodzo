<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-shothodzo-green-dark text-white shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <router-link to="/" class="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span class="text-shothodzo-green-dark font-bold text-xl">S</span>
            </div>
            <div>
              <h1 class="text-xl font-bold">SHOTHODZO EMPLOYEE</h1>
              <p class="text-xs text-shothodzo-green-light">Funeral Service</p>
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
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors"
          >
            Dashboard
          </router-link>
          <router-link
            to="/employee/clients"
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors"
          >
            My Clients
          </router-link>
          <router-link
            to="/employee/payments"
            class="px-4 py-3 border-b-2 border-shothodzo-green text-shothodzo-green font-semibold"
          >
            Payments
          </router-link>
          <router-link
            to="/employee/subscriptions"
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors"
          >
            Subscriptions
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Payment Management</h2>
        <button @click="showAddModal = true" class="btn-primary">Record Payment</button>
      </div>

      <!-- Payments Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-shothodzo-green-dark text-white">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Client</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Method</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Reference</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="payment in payments" :key="payment.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ new Date(payment.payment_date).toLocaleDateString() }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ payment.client_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-shothodzo-green">R{{ payment.amount.toLocaleString() }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ payment.payment_method }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ payment.reference_number || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(payment.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                  {{ payment.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add Payment Modal -->
      <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Record Payment</h3>
          
          <form @submit.prevent="handleAddPayment" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Client *</label>
              <select v-model="newPayment.clientId" required class="input-field">
                <option value="">Select a client</option>
                <option v-for="client in myClients" :key="client.id" :value="client.id">
                  {{ client.first_name }} {{ client.last_name }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Amount (R) *</label>
              <input v-model.number="newPayment.amount" type="number" step="0.01" required class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label>
              <input v-model="newPayment.paymentDate" type="date" required class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
              <select v-model="newPayment.paymentMethod" required class="input-field">
                <option value="">Select method</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="mobile_money">Mobile Money</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Reference Number</label>
              <input v-model="newPayment.referenceNumber" type="text" class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea v-model="newPayment.notes" class="input-field" rows="3"></textarea>
            </div>

            <div class="flex gap-4 pt-4">
              <button type="submit" class="flex-1 btn-primary">Record Payment</button>
              <button type="button" @click="showAddModal = false" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg">Cancel</button>
            </div>
          </form>
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

const payments = ref([])
const myClients = ref([])
const showAddModal = ref(false)
const newPayment = ref({
  clientId: '',
  amount: 0,
  paymentDate: new Date().toISOString().split('T')[0],
  paymentMethod: '',
  referenceNumber: '',
  notes: ''
})

const employeeName = computed(() => {
  if (authStore.currentUser) {
    return `${authStore.currentUser.first_name} ${authStore.currentUser.last_name}`
  }
  return 'Employee'
})

const getStatusClass = (status) => {
  const classes = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const loadPayments = () => {
  const employeeId = getEmployeeId(authStore.currentUser)
  if (!employeeId) {
    console.error('Employee ID not found')
    return
  }
  
  payments.value = db.prepare(`
    SELECT p.*, c.first_name || ' ' || c.last_name as client_name
    FROM payments p
    JOIN clients c ON p.client_id = c.id
    WHERE p.employee_id = ?
    ORDER BY p.payment_date DESC, p.created_at DESC
  `).all(employeeId)
}

const loadClients = () => {
  const employeeId = getEmployeeId(authStore.currentUser)
  if (!employeeId) {
    console.error('Employee ID not found')
    return
  }
  
  myClients.value = db.prepare(`
    SELECT c.id, c.first_name, c.last_name
    FROM clients c
    WHERE c.employee_id = ?
    ORDER BY c.first_name, c.last_name
  `).all(employeeId)
  
  // Set default client if from query param
  const clientId = route.query.client
  if (clientId) {
    newPayment.value.clientId = parseInt(clientId)
  }
}

const handleAddPayment = () => {
  try {
    const employeeId = getEmployeeId(authStore.currentUser)
    if (!employeeId) {
      alert('Employee ID not found. Please log out and log back in.')
      return
    }
    
    const insertPayment = db.prepare(`
      INSERT INTO payments (client_id, employee_id, amount, payment_date, payment_method, reference_number, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    insertPayment.run(
      newPayment.value.clientId,
      employeeId,
      newPayment.value.amount,
      newPayment.value.paymentDate,
      newPayment.value.paymentMethod,
      newPayment.value.referenceNumber || null,
      newPayment.value.notes || null,
      'completed'
    )

    // Reset form
    newPayment.value = {
      clientId: '',
      amount: 0,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      referenceNumber: '',
      notes: ''
    }
    showAddModal.value = false
    loadPayments()
  } catch (error) {
    alert('Error recording payment: ' + error.message)
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
  loadPayments()
  loadClients()
})
</script>

