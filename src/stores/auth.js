import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import db from '../database/db'
import { getEmployeeId } from '../utils/employee'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null)
  const userRole = ref(null)

  const isAuthenticated = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => userRole.value === 'admin')
  const isEmployee = computed(() => userRole.value === 'employee')
  const isClient = computed(() => userRole.value === 'client')

  function logout() {
    currentUser.value = null
    userRole.value = null
    
    // Clear any session/token data from localStorage
    localStorage.removeItem('shothodzo_auth_token')
    localStorage.removeItem('shothodzo_session')
    localStorage.removeItem('shothodzo_current_user')
    localStorage.removeItem('shothodzo_user_role')
  }

  // Initialize authentication state on store creation
  function initializeAuth() {
    const savedUser = localStorage.getItem('shothodzo_current_user')
    const savedRole = localStorage.getItem('shothodzo_user_role')
    
    if (savedUser && savedRole) {
      try {
        const user = JSON.parse(savedUser)
        // Verify the user still exists in the database
        const dbUser = db.prepare('SELECT * FROM users WHERE id = ?').get(user.id)
        if (dbUser) {
          // Reload user data based on role
          if (savedRole === 'employee') {
            const employees = JSON.parse(localStorage.getItem('shothodzo_employees') || '[]')
            const employee = employees.find(e => e.user_id === dbUser.id)
            if (employee) {
              currentUser.value = { ...dbUser, ...employee, role: savedRole }
            } else {
              const employeeFromDb = db.prepare('SELECT * FROM employees WHERE user_id = ?').get(dbUser.id)
              if (employeeFromDb) {
                currentUser.value = { ...dbUser, ...employeeFromDb, role: savedRole }
              }
            }
          } else if (savedRole === 'client') {
            const clients = JSON.parse(localStorage.getItem('shothodzo_clients') || '[]')
            const client = clients.find(c => c.user_id === dbUser.id)
            if (client) {
              currentUser.value = { ...dbUser, ...client, role: savedRole }
            } else {
              const clientFromDb = db.prepare('SELECT * FROM clients WHERE user_id = ?').get(dbUser.id)
              if (clientFromDb) {
                currentUser.value = { ...dbUser, ...clientFromDb, role: savedRole }
              }
            }
          } else {
            currentUser.value = { ...dbUser, role: savedRole }
          }
          userRole.value = savedRole
        } else {
          // User no longer exists, clear session
          logout()
        }
      } catch (error) {
        console.error('Error restoring auth state:', error)
        logout()
      }
    }
  }

  function login(email, password) {
    // Convert email to lowercase for case-insensitive matching
    const normalizedEmail = email.toLowerCase().trim()
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail)
    
    if (!user) {
      throw new Error('Invalid email or password')
    }

    // In production, use proper password hashing (bcrypt)
    if (user.password !== password) {
      throw new Error('Invalid email or password')
    }

    // Debug: Log the user's role from database
    console.log('User from database:', { id: user.id, email: user.email, role: user.role })
    
    // Verify role is valid
    if (!['admin', 'employee', 'client'].includes(user.role)) {
      console.error('Invalid role in database:', user.role)
      throw new Error('Invalid user role. Please contact support.')
    }

    currentUser.value = user
    userRole.value = user.role

    // Get additional user info based on role
    if (user.role === 'employee') {
      // Try to get employee record - use direct localStorage access for reliability
      try {
        const employees = JSON.parse(localStorage.getItem('shothodzo_employees') || '[]')
        const employee = employees.find(e => e.user_id === user.id)
        if (employee) {
          // Merge user and employee, keeping employee id but preserving user role
          currentUser.value = { ...user, ...employee, role: user.role }
        } else {
          // Fallback to database query
          const employeeFromDb = db.prepare('SELECT * FROM employees WHERE user_id = ?').get(user.id)
          if (employeeFromDb) {
            currentUser.value = { ...user, ...employeeFromDb, role: user.role }
          } else {
            console.error('Employee record not found for user:', user.id)
            throw new Error('Employee record not found. Please contact administrator.')
          }
        }
      } catch (error) {
        console.error('Error loading employee data:', error)
        throw error
      }
    } else if (user.role === 'client') {
      // Try to get client record - use direct localStorage access for reliability
      try {
        const clients = JSON.parse(localStorage.getItem('shothodzo_clients') || '[]')
        const client = clients.find(c => c.user_id === user.id)
        if (client) {
          // Merge user and client, keeping client id but preserving user role
          currentUser.value = { ...user, ...client, role: user.role }
        } else {
          // Fallback to database query
          const clientFromDb = db.prepare('SELECT * FROM clients WHERE user_id = ?').get(user.id)
          if (clientFromDb) {
            currentUser.value = { ...user, ...clientFromDb, role: user.role }
          } else {
            console.error('Client record not found for user:', user.id)
            throw new Error('Client record not found. Please contact support.')
          }
        }
      } catch (error) {
        console.error('Error loading client data:', error)
        throw error
      }
    }
    
    // Ensure role is always set correctly (in case it was overwritten during merge)
    if (currentUser.value) {
      userRole.value = currentUser.value.role = user.role
      
      // Persist to localStorage
      localStorage.setItem('shothodzo_current_user', JSON.stringify(currentUser.value))
      localStorage.setItem('shothodzo_user_role', userRole.value)
    }

    return currentUser.value
  }

  function register(email, password, role, additionalData = {}) {
    try {
      // Convert email to lowercase for case-insensitive storage
      const normalizedEmail = email.toLowerCase().trim()
      const insertUser = db.prepare('INSERT INTO users (email, password, role) VALUES (?, ?, ?)')
      const result = insertUser.run(normalizedEmail, password, role)
      const userId = result.lastInsertRowid

      if (role === 'employee') {
        const insertEmployee = db.prepare(`
          INSERT INTO employees (user_id, first_name, last_name, phone, employee_code)
          VALUES (?, ?, ?, ?, ?)
        `)
        insertEmployee.run(
          userId,
          additionalData.firstName,
          additionalData.lastName,
          additionalData.phone,
          additionalData.employeeCode || `EMP${Date.now()}`
        )
      } else if (role === 'client') {
        if (!additionalData.employeeId) {
          throw new Error('Employee ID is required for client registration')
        }
        const insertClient = db.prepare(`
          INSERT INTO clients (user_id, employee_id, first_name, last_name, id_number, phone, address, date_of_birth)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `)
        const clientResult = insertClient.run(
          userId,
          additionalData.employeeId,
          additionalData.firstName,
          additionalData.lastName,
          additionalData.idNumber,
          additionalData.phone,
          additionalData.address,
          additionalData.dateOfBirth
        )
        
        if (!clientResult.lastInsertRowid) {
          throw new Error('Failed to create client record')
        }
      }

      return { success: true, userId }
    } catch (error) {
      throw new Error('Registration failed: ' + error.message)
    }
  }

  return {
    currentUser,
    userRole,
    isAuthenticated,
    isAdmin,
    isEmployee,
    isClient,
    login,
    logout,
    register,
    initializeAuth
  }
})

