<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-8">
        <router-link to="/" class="flex flex-col items-center mb-4 cursor-pointer hover:opacity-80 transition-opacity">
          <div class="w-[430px] h-[150px] bg-white rounded-lg flex items-center justify-center p-3 shadow-md overflow-hidden">
            <img src="/images/Shothodzo.jpg" alt="Shothodzo Logo" class="w-full h-full object-cover rounded" />
          </div>
        </router-link>
        <h3 class="mt-6 text-2xl font-semibold text-gray-900">Create your account</h3>
      </div>

      <form @submit.prevent="handleRegister" class="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {{ success }}
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              id="firstName"
              v-model="formData.firstName"
              type="text"
              required
              class="input-field"
            />
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input
              id="lastName"
              v-model="formData.lastName"
              type="text"
              required
              class="input-field"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            class="input-field"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password *</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            class="input-field"
            minlength="6"
          />
        </div>

        <div>
          <label for="idNumber" class="block text-sm font-medium text-gray-700 mb-1">ID Number *</label>
          <input
            id="idNumber"
            v-model="formData.idNumber"
            type="text"
            required
            class="input-field"
            placeholder="13-digit ID number"
          />
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
          <input
            id="phone"
            v-model="formData.phone"
            type="tel"
            required
            class="input-field"
          />
        </div>

        <div>
          <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address *</label>
          <textarea
            id="address"
            v-model="formData.address"
            required
            class="input-field"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label for="dateOfBirth" class="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
          <input
            id="dateOfBirth"
            v-model="formData.dateOfBirth"
            type="date"
            required
            class="input-field"
          />
        </div>

        <div>
          <label for="employeeId" class="block text-sm font-medium text-gray-700 mb-1">
            Select Your Employee *
            <span class="text-xs text-gray-500">(Choose the employee you are registering under)</span>
          </label>
          <select
            id="employeeId"
            v-model="formData.employeeId"
            required
            class="input-field"
          >
            <option value="">-- Select an employee --</option>
            <option
              v-for="employee in employees"
              :key="employee.id"
              :value="employee.id"
            >
              {{ employee.first_name }} {{ employee.last_name }} - {{ employee.employee_code }}
            </option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary py-3 text-lg"
          >
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <router-link to="/login" class="text-shothodzo-green hover:underline font-medium">
              Sign in here
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import db from '../database/db'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  idNumber: '',
  phone: '',
  address: '',
  dateOfBirth: '',
  employeeId: ''
})

const employees = ref([])
const error = ref('')
const success = ref('')
const loading = ref(false)

const loadEmployees = () => {
  try {
    // Get all employees
    const allEmployees = db.getTable('employees')
    const allUsers = db.getTable('users')
    
    employees.value = allEmployees.map(employee => {
      // Find the user record to get email
      const user = allUsers.find(u => {
        const uId = typeof u.id === 'string' ? parseInt(u.id, 10) : Number(u.id)
        const eUserId = typeof employee.user_id === 'string' ? parseInt(employee.user_id, 10) : Number(employee.user_id)
        return uId === eUserId || String(u.id) === String(employee.user_id)
      })
      
      return {
        id: employee.id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        employee_code: employee.employee_code,
        email: user?.email || 'N/A'
      }
    }).sort((a, b) => {
      // Sort by name
      const nameA = `${a.first_name} ${a.last_name}`.toLowerCase()
      const nameB = `${b.first_name} ${b.last_name}`.toLowerCase()
      return nameA.localeCompare(nameB)
    })
  } catch (error) {
    console.error('Error loading employees:', error)
    error.value = 'Failed to load employees. Please refresh the page.'
  }
}

const checkFamilyPlan = (idNumber) => {
  // Check if client is already under a family plan
  // Access localStorage directly since getTable is not exposed
  const clientsData = localStorage.getItem('shothodzo_clients')
  const familyMembersData = localStorage.getItem('shothodzo_family_members')
  
  if (!clientsData || !familyMembersData) return null
  
  const clients = JSON.parse(clientsData)
  const familyMembers = JSON.parse(familyMembersData)
  
  // Find client by ID number
  const client = clients.find(c => c.id_number === idNumber)
  if (!client) return null
  
  // Check if this client is a family member
  const familyMember = familyMembers.find(fm => fm.client_id === client.id)
  if (!familyMember) return null
  
  // Get the family plan holder
  const holder = clients.find(c => c.id === familyMember.family_plan_holder_id)
  if (!holder) return null
  
  return {
    ...client,
    family_plan_holder_id: familyMember.family_plan_holder_id,
    holder_first_name: holder.first_name,
    holder_last_name: holder.last_name
  }
}

const handleRegister = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    // Validate employee selection
    if (!formData.value.employeeId) {
      throw new Error('Please select an employee')
    }

    // Ensure employeeId is a number
    const employeeId = typeof formData.value.employeeId === 'string' 
      ? parseInt(formData.value.employeeId, 10) 
      : Number(formData.value.employeeId)
    
    if (isNaN(employeeId)) {
      throw new Error('Invalid employee selection')
    }

    // Verify employee exists
    const employee = db.prepare('SELECT id FROM employees WHERE id = ?').get(employeeId)
    
    if (!employee) {
      throw new Error('Selected employee not found. Please refresh the page and try again.')
    }

    // Check if client is already under a family plan
    const familyMember = checkFamilyPlan(formData.value.idNumber)
    
    if (familyMember) {
      // Store family plan info in session/localStorage for popup display
      localStorage.setItem('familyPlanInfo', JSON.stringify({
        holderName: `${familyMember.holder_first_name} ${familyMember.holder_last_name}`,
        holderId: familyMember.family_plan_holder_id
      }))
    }

    // Register the client
    await authStore.register(
      formData.value.email,
      formData.value.password,
      'client',
      {
        employeeId: employeeId,
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
        idNumber: formData.value.idNumber,
        phone: formData.value.phone,
        address: formData.value.address,
        dateOfBirth: formData.value.dateOfBirth
      }
    )

    success.value = 'Registration successful! Redirecting to login...'
    
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadEmployees()
})
</script>

