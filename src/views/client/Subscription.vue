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
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors"
          >
            Dashboard
          </router-link>
          <router-link
            to="/client/subscription"
            class="px-4 py-3 border-b-2 border-shothodzo-green text-shothodzo-green font-semibold"
          >
            My Subscription
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Current Subscription -->
      <div v-if="currentSubscription" class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Current Subscription</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-gray-600 text-sm mb-1">Plan Type</p>
            <p class="text-xl font-bold text-shothodzo-green">{{ currentSubscription.plan_type.toUpperCase() }}</p>
          </div>
          <div>
            <p class="text-gray-600 text-sm mb-1">Monthly Premium</p>
            <p class="text-xl font-bold text-shothodzo-purple">R{{ currentSubscription.monthly_premium.toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-gray-600 text-sm mb-1">Start Date</p>
            <p class="text-lg text-gray-800">{{ new Date(currentSubscription.start_date).toLocaleDateString() }}</p>
          </div>
          <div>
            <p class="text-gray-600 text-sm mb-1">Status</p>
            <span :class="getStatusClass(currentSubscription.status)" class="px-4 py-2 text-sm font-semibold rounded-full">
              {{ currentSubscription.status.toUpperCase() }}
            </span>
          </div>
        </div>
      </div>

      <!-- Apply for Subscription -->
      <div v-else class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Apply for Subscription</h2>
        
        <div v-if="clientInfo.is_family_member" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-yellow-700">
                <strong>Note:</strong> You are currently under a family member's plan. Applying for your own subscription will terminate your membership from the family plan.
              </p>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleApplySubscription" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Plan Type *</label>
            <div class="grid grid-cols-2 gap-4">
              <label class="relative">
                <input
                  v-model="subscriptionForm.planType"
                  type="radio"
                  value="individual"
                  required
                  class="sr-only peer"
                />
                <div class="p-6 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-shothodzo-green peer-checked:bg-shothodzo-green-light peer-checked:bg-opacity-10 hover:border-shothodzo-green transition-colors">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-6 h-6 border-2 border-gray-300 rounded-full peer-checked:border-shothodzo-green flex items-center justify-center">
                      <div v-if="subscriptionForm.planType === 'individual'" class="w-3 h-3 bg-shothodzo-green rounded-full"></div>
                    </div>
                    <h3 class="font-bold text-lg text-gray-800">Individual Plan</h3>
                  </div>
                  <p class="text-sm text-gray-600">Coverage for yourself only</p>
                  <p class="text-xl font-bold text-shothodzo-green mt-2">R500/month</p>
                </div>
              </label>

              <label class="relative">
                <input
                  v-model="subscriptionForm.planType"
                  type="radio"
                  value="family"
                  required
                  class="sr-only peer"
                />
                <div class="p-6 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-shothodzo-green peer-checked:bg-shothodzo-green-light peer-checked:bg-opacity-10 hover:border-shothodzo-green transition-colors">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-6 h-6 border-2 border-gray-300 rounded-full peer-checked:border-shothodzo-green flex items-center justify-center">
                      <div v-if="subscriptionForm.planType === 'family'" class="w-3 h-3 bg-shothodzo-green rounded-full"></div>
                    </div>
                    <h3 class="font-bold text-lg text-gray-800">Family Plan</h3>
                  </div>
                  <p class="text-sm text-gray-600">Coverage for you and your family</p>
                  <p class="text-xl font-bold text-shothodzo-green mt-2">R1,200/month</p>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
            <input
              v-model="subscriptionForm.startDate"
              type="date"
              required
              :min="new Date().toISOString().split('T')[0]"
              class="input-field"
            />
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-700">Monthly Premium:</span>
              <span class="text-2xl font-bold text-shothodzo-green">
                R{{ monthlyPremium.toLocaleString() }}
              </span>
            </div>
            <p class="text-sm text-gray-500">This amount will be charged monthly starting from your selected start date.</p>
          </div>

          <div class="flex gap-4">
            <button type="submit" :disabled="loading" class="flex-1 btn-primary py-3 text-lg">
              {{ loading ? 'Processing...' : 'Apply for Subscription' }}
            </button>
            <router-link to="/client" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg text-center">
              Cancel
            </router-link>
          </div>
        </form>
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
const currentSubscription = ref(null)
const loading = ref(false)
const subscriptionForm = ref({
  planType: 'individual',
  startDate: new Date().toISOString().split('T')[0]
})

const clientName = computed(() => {
  if (authStore.currentUser) {
    return `${authStore.currentUser.first_name} ${authStore.currentUser.last_name}`
  }
  return 'Client'
})

const monthlyPremium = computed(() => {
  return subscriptionForm.value.planType === 'family' ? 1200 : 500
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

const loadClientInfo = () => {
  const clientId = getClientId(authStore.currentUser)
  if (!clientId) {
    console.error('Client ID not found')
    return
  }
  
  const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(clientId)
  clientInfo.value = client || {}

  // Get current subscription
  const subscription = db.prepare('SELECT * FROM subscriptions WHERE client_id = ?').get(clientId)
  currentSubscription.value = subscription || null
}

const handleApplySubscription = () => {
  loading.value = true

  try {
    const clientId = getClientId(authStore.currentUser)
    if (!clientId) {
      alert('Client ID not found. Please log out and log back in.')
      loading.value = false
      return
    }
    
    // If client is under family plan, terminate it
    if (clientInfo.value.is_family_member) {
      db.prepare('DELETE FROM family_members WHERE client_id = ?').run(clientId)
      db.prepare(`
        UPDATE clients 
        SET is_family_member = 0, family_plan_holder_id = NULL
        WHERE id = ?
      `).run(clientId)
    }

    // Create subscription
    const insertSubscription = db.prepare(`
      INSERT INTO subscriptions (client_id, plan_type, monthly_premium, start_date, status)
      VALUES (?, ?, ?, ?, ?)
    `)
    
    insertSubscription.run(
      clientId,
      subscriptionForm.value.planType,
      monthlyPremium.value,
      subscriptionForm.value.startDate,
      'active'
    )

    // Update client subscription status
    db.prepare('UPDATE clients SET subscription_status = ? WHERE id = ?').run('active', clientId)

    // Reload data
    loadClientInfo()
    
    alert('Subscription applied successfully!')
    router.push('/client')
  } catch (error) {
    alert('Error applying for subscription: ' + error.message)
  } finally {
    loading.value = false
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

