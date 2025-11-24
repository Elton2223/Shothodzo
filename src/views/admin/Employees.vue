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
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors text-sm font-semibold"
          >
            Dashboard
          </router-link>
          <router-link
            to="/admin/employees"
            class="px-4 py-3 border-b-2 border-shothodzo-green text-shothodzo-green font-semibold text-sm"
          >
            Employees
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Employee Management</h2>
        <button @click="showAddModal = true" class="btn-primary">Add New Employee</button>
      </div>

      <!-- Employees Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-shothodzo-green-dark text-white">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Employee Code</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Clients</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="employee in employees" :key="employee.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ employee.first_name }} {{ employee.last_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ employee.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-shothodzo-green">{{ employee.employee_code }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ employee.phone || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ employee.client_count || 0 }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="viewEmployee(employee.id)" class="text-shothodzo-green hover:text-shothodzo-green-dark mr-4">View</button>
                <button @click="deleteEmployee(employee.id)" class="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add Employee Modal -->
      <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Add New Employee</h3>
          
          <form @submit.prevent="handleAddEmployee" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input v-model="newEmployee.firstName" type="text" required class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input v-model="newEmployee.lastName" type="text" required class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input v-model="newEmployee.email" type="email" required class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input v-model="newEmployee.password" type="password" required class="input-field" minlength="6" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input v-model="newEmployee.phone" type="tel" class="input-field" />
            </div>

            <div class="flex gap-4 pt-4">
              <button type="submit" class="flex-1 btn-primary">Add Employee</button>
              <button type="button" @click="showAddModal = false" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import db from '../../database/db'

const router = useRouter()
const authStore = useAuthStore()

const employees = ref([])
const showAddModal = ref(false)
const newEmployee = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: ''
})

const loadEmployees = () => {
  employees.value = db.prepare(`
    SELECT e.*, u.email, 
           (SELECT COUNT(*) FROM clients WHERE employee_id = e.id) as client_count
    FROM employees e
    JOIN users u ON e.user_id = u.id
    ORDER BY e.created_at DESC
  `).all()
}

const handleAddEmployee = () => {
  try {
    // Validate required fields
    if (!newEmployee.value.firstName || !newEmployee.value.lastName || !newEmployee.value.email || !newEmployee.value.password) {
      alert('Please fill in all required fields')
      return
    }

    // Create user account
    const insertUser = db.prepare('INSERT INTO users (email, password, role) VALUES (?, ?, ?)')
    const userResult = insertUser.run(newEmployee.value.email, newEmployee.value.password, 'employee')
    const userId = userResult.lastInsertRowid

    if (!userId) {
      throw new Error('Failed to create user account')
    }

    // Create employee record
    const employeeCode = `EMP${Date.now()}`
    const insertEmployee = db.prepare(`
      INSERT INTO employees (user_id, first_name, last_name, phone, employee_code)
      VALUES (?, ?, ?, ?, ?)
    `)
    const employeeResult = insertEmployee.run(
      userId,
      newEmployee.value.firstName,
      newEmployee.value.lastName,
      newEmployee.value.phone || null,
      employeeCode
    )

    if (!employeeResult.lastInsertRowid) {
      throw new Error('Failed to create employee record')
    }

    // Show success message
    alert(`Employee created successfully!\nEmployee Code: ${employeeCode}\nEmail: ${newEmployee.value.email}`)

    // Reset form and close modal
    newEmployee.value = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: ''
    }
    showAddModal.value = false
    loadEmployees()
  } catch (error) {
    console.error('Error adding employee:', error)
    alert('Error adding employee: ' + error.message)
  }
}

const viewEmployee = (id) => {
  // Navigate to employee details or show modal
  console.log('View employee:', id)
}

const deleteEmployee = (id) => {
  if (confirm('Are you sure you want to delete this employee?')) {
    try {
      const employee = db.prepare('SELECT user_id FROM employees WHERE id = ?').get(id)
      db.prepare('DELETE FROM users WHERE id = ?').run(employee.user_id)
      loadEmployees()
    } catch (error) {
      alert('Error deleting employee: ' + error.message)
    }
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  if (!authStore.isAdmin) {
    router.push('/login')
    return
  }
  loadEmployees()
})
</script>

