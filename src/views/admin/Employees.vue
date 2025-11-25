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
                <button @click="viewEmployee(employee.id)" class="text-shothodzo-green hover:text-shothodzo-green-dark mr-4">View/Edit</button>
                <button @click="deleteEmployee(employee.id)" class="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add Employee Modal -->
      <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
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

      <!-- View/Edit Employee Modal -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">View/Edit Employee</h3>
          
          <form @submit.prevent="handleUpdateEmployee" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input v-model="editEmployee.firstName" type="text" required class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input v-model="editEmployee.lastName" type="text" required class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input v-model="editEmployee.email" type="email" required class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Employee Code</label>
              <input v-model="editEmployee.employeeCode" type="text" class="input-field bg-gray-100" disabled />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input v-model="editEmployee.phone" type="tel" class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">New Password (leave blank to keep current)</label>
              <input v-model="editEmployee.password" type="password" class="input-field" minlength="6" />
              <p class="text-xs text-gray-500 mt-1">Only enter a new password if you want to change it</p>
            </div>

            <div class="flex gap-4 pt-4">
              <button type="submit" class="flex-1 btn-primary">Save Changes</button>
              <button type="button" @click="closeEditModal" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg">Cancel</button>
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

const router = useRouter()
const authStore = useAuthStore()

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

const employees = ref([])
const showAddModal = ref(false)
const showEditModal = ref(false)
const selectedEmployee = ref(null)
const editEmployee = ref({
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  employeeCode: '',
  password: ''
})
const newEmployee = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: ''
})

const loadEmployees = () => {
  // Get all employees
  const allEmployees = db.getTable('employees')
  const allUsers = db.getTable('users')
  const allClients = db.getTable('clients')
  
  employees.value = allEmployees.map(employee => {
    // Find the user record to get email
    const user = allUsers.find(u => String(u.id) === String(employee.user_id) || Number(u.id) === Number(employee.user_id))
    
    // Count clients for this employee
    const clientCount = allClients.filter(c => 
      String(c.employee_id) === String(employee.id) || Number(c.employee_id) === Number(employee.id)
    ).length
    
    return {
      ...employee,
      email: user?.email || 'N/A',
      client_count: clientCount
    }
  }).sort((a, b) => {
    // Sort by created_at descending
    const dateA = new Date(a.created_at || 0)
    const dateB = new Date(b.created_at || 0)
    return dateB - dateA
  })
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
  // Ensure ID is a number for consistent comparison
  const employeeId = typeof id === 'string' ? parseInt(id, 10) : id
  const employee = employees.value.find(e => {
    const eId = typeof e.id === 'string' ? parseInt(e.id, 10) : e.id
    return eId === employeeId
  })
  
  if (!employee) {
    alert('Employee not found')
    return
  }
  
  // Get user record for email
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(employee.user_id)
  
  selectedEmployee.value = employee
  // Ensure ID is stored as a number
  editEmployee.value = {
    id: typeof employee.id === 'string' ? parseInt(employee.id, 10) : employee.id,
    firstName: employee.first_name,
    lastName: employee.last_name,
    email: user?.email || employee.email || '',
    phone: employee.phone || '',
    employeeCode: employee.employee_code || '',
    password: '' // Don't pre-fill password
  }
  
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedEmployee.value = null
  editEmployee.value = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeCode: '',
    password: ''
  }
}

const handleUpdateEmployee = () => {
  try {
    if (!editEmployee.value.firstName || !editEmployee.value.lastName || !editEmployee.value.email) {
      alert('Please fill in all required fields')
      return
    }

    // Ensure ID is a number
    const employeeId = typeof editEmployee.value.id === 'string' 
      ? parseInt(editEmployee.value.id, 10) 
      : Number(editEmployee.value.id)
    
    if (isNaN(employeeId)) {
      alert('Invalid employee ID')
      return
    }

    console.log('=== UPDATE DEBUG START ===')
    console.log('Employee ID from form:', editEmployee.value.id, '-> converted to:', employeeId)

    // Get all employees before update for comparison
    const allEmployeesBefore = db.getTable('employees')
    console.log('All employees before update:', allEmployeesBefore)

    // Get the employee record using the numeric ID
    const employee = db.prepare('SELECT * FROM employees WHERE id = ?').get(employeeId)
    if (!employee) {
      console.error('Employee not found with ID:', employeeId)
      alert('Employee not found')
      return
    }

    console.log('Found employee to update:', employee)
    console.log('Form data:', editEmployee.value)

    // Get all users before update
    const allUsersBefore = db.getTable('users')
    console.log('All users before update:', allUsersBefore)

    // Update employee record - ensure ID is a number
    console.log('Updating employees table with:', {
      firstName: editEmployee.value.firstName,
      lastName: editEmployee.value.lastName,
      phone: editEmployee.value.phone || null,
      whereId: employeeId
    })
    
    const updateResult = db.prepare(`
      UPDATE employees 
      SET first_name = ?, last_name = ?, phone = ?
      WHERE id = ?
    `).run(
      editEmployee.value.firstName,
      editEmployee.value.lastName,
      editEmployee.value.phone || null,
      employeeId
    )

    console.log('Employee UPDATE result:', updateResult)

    // Verify the update
    const employeeAfter = db.prepare('SELECT * FROM employees WHERE id = ?').get(employeeId)
    console.log('Employee after update:', employeeAfter)

    // Update user email - ensure user_id is a number
    const userId = typeof employee.user_id === 'string' 
      ? parseInt(employee.user_id, 10) 
      : Number(employee.user_id)
    
    console.log('Updating users table with:', {
      email: editEmployee.value.email.toLowerCase().trim(),
      whereId: userId
    })
    
    const userUpdateResult = db.prepare(`
      UPDATE users 
      SET email = ?
      WHERE id = ?
    `).run(
      editEmployee.value.email.toLowerCase().trim(),
      userId
    )

    console.log('User UPDATE result:', userUpdateResult)

    // Verify the user update
    const userAfter = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
    console.log('User after update:', userAfter)

    // Get all employees and users after update
    const allEmployeesAfter = db.getTable('employees')
    const allUsersAfter = db.getTable('users')
    console.log('All employees after update:', allEmployeesAfter)
    console.log('All users after update:', allUsersAfter)

    // Update password if provided
    if (editEmployee.value.password && editEmployee.value.password.length >= 6) {
      const passwordUpdateResult = db.prepare(`
        UPDATE users 
        SET password = ?
        WHERE id = ?
      `).run(
        editEmployee.value.password,
        userId
      )
      console.log('Password UPDATE result:', passwordUpdateResult)
    }

    console.log('=== UPDATE DEBUG END ===')

    if (updateResult.changes === 0 && userUpdateResult.changes === 0) {
      alert('Warning: No changes were made. Please check the console for details.')
      console.warn('No records were updated!')
    } else {
      alert(`Employee updated successfully! (${updateResult.changes} employee record(s), ${userUpdateResult.changes} user record(s) updated)`)
    }
    
    closeEditModal()
    loadEmployees()
  } catch (error) {
    console.error('Error updating employee:', error)
    alert('Error updating employee: ' + error.message)
  }
}

const deleteEmployee = (id) => {
  // Ensure ID is a number
  const employeeId = typeof id === 'string' ? parseInt(id, 10) : Number(id)
  
  if (isNaN(employeeId)) {
    alert('Invalid employee ID')
    return
  }

  console.log('=== DELETE DEBUG START ===')
  console.log('Employee ID to delete:', id, '-> converted to:', employeeId)

  try {
    // Get all employees and users directly from tables (like loadEmployees does)
    const allEmployees = db.getTable('employees')
    const allUsers = db.getTable('users')
    
    console.log('All employees:', allEmployees)
    console.log('All users:', allUsers)

    // Find employee using flexible matching (same as loadEmployees)
    const employee = allEmployees.find(e => {
      const eId = typeof e.id === 'string' ? parseInt(e.id, 10) : Number(e.id)
      return eId === employeeId
    })
    
    if (!employee) {
      console.error('Employee not found with ID:', employeeId)
      alert('Employee not found')
      return
    }

    console.log('Employee to delete:', employee)
    console.log('Employee user_id:', employee.user_id, 'type:', typeof employee.user_id)

    // Find user using flexible matching (same as loadEmployees)
    let user = null
    let userId = null
    
    if (employee.user_id !== null && employee.user_id !== undefined) {
      userId = typeof employee.user_id === 'string' 
        ? parseInt(employee.user_id, 10) 
        : Number(employee.user_id)
      
      console.log('Looking for user with ID:', userId, 'type:', typeof userId)
      
      // Try database query first
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
      
      // If not found, try direct table lookup with flexible matching
      if (!user) {
        console.log('User not found via query, trying direct table lookup...')
        user = allUsers.find(u => {
          const uId = typeof u.id === 'string' ? parseInt(u.id, 10) : Number(u.id)
          return uId === userId || String(u.id) === String(userId) || String(u.id) === String(employee.user_id)
        })
      }
    }

    console.log('User found:', user)

    // If user exists, check if it's admin
    if (user && user.role === 'admin') {
      alert('Cannot delete admin user')
      return
    }

    // If user doesn't exist, still allow deleting the employee record (orphaned employee)
    const employeeName = `${employee.first_name || ''} ${employee.last_name || ''}`.trim() || 'this employee'
    const confirmMessage = user 
      ? `Are you sure you want to delete employee ${employeeName}?`
      : `Warning: User record not found for this employee. Delete employee record ${employeeName} anyway?`

    if (confirm(confirmMessage)) {
      // Delete from employees table first
      console.log('Deleting from employees table WHERE id =', employeeId)
      const deleteEmployeeResult = db.prepare('DELETE FROM employees WHERE id = ?').run(employeeId)
      console.log('Delete employee result:', deleteEmployeeResult)

      // Delete from users table only if user exists
      let deleteUserResult = { changes: 0 }
      if (user && userId) {
        console.log('Deleting from users table WHERE id =', userId)
        deleteUserResult = db.prepare('DELETE FROM users WHERE id = ?').run(userId)
        console.log('Delete user result:', deleteUserResult)
      } else {
        console.log('Skipping user deletion - user record not found')
      }

      console.log('=== DELETE DEBUG END ===')

      if (deleteEmployeeResult.changes > 0) {
        const message = user 
          ? `Employee deleted successfully! (${deleteEmployeeResult.changes} employee record(s), ${deleteUserResult.changes} user record(s) deleted)`
          : `Employee record deleted successfully! (Note: User record was not found and could not be deleted)`
        alert(message)
        loadEmployees()
      } else {
        alert('Failed to delete employee. No records were removed. Check console for details.')
        console.warn('No records were deleted!')
      }
    }
  } catch (error) {
    console.error('Error deleting employee:', error)
    alert('Error deleting employee: ' + error.message)
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  if (!authStore.isAdmin) {
    router.push('/login')
    return
  }
  loadEmployees()
})
</script>

