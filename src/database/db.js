// Database service using localStorage as a simple solution for browser testing
// For production, this should be replaced with a proper backend API

class Database {
  constructor() {
    this.init()
  }

  init() {
    if (!localStorage.getItem('shothodzo_db_initialized')) {
      this.setupTables()
      localStorage.setItem('shothodzo_db_initialized', 'true')
    }
  }

  setupTables() {
    // Initialize data structures in localStorage
    const tables = {
      users: [],
      employees: [],
      clients: [],
      subscriptions: [],
      payments: [],
      family_members: []
    }
    
    localStorage.setItem('shothodzo_users', JSON.stringify(tables.users))
    localStorage.setItem('shothodzo_employees', JSON.stringify(tables.employees))
    localStorage.setItem('shothodzo_clients', JSON.stringify(tables.clients))
    localStorage.setItem('shothodzo_subscriptions', JSON.stringify(tables.subscriptions))
    localStorage.setItem('shothodzo_payments', JSON.stringify(tables.payments))
    localStorage.setItem('shothodzo_family_members', JSON.stringify(tables.family_members))
    
    // Create default admin account
    this.createDefaultAdmin()
  }

  createDefaultAdmin() {
    const adminUser = {
      id: 1,
      email: 'admin@shothodzo.co.za',
      password: 'admin123', // In production, use proper password hashing
      role: 'admin',
      created_at: new Date().toISOString()
    }
    
    const users = this.getTable('users')
    if (users.length === 0) {
      users.push(adminUser)
      this.setTable('users', users)
    }
  }

  getTable(tableName) {
    const data = localStorage.getItem(`shothodzo_${tableName}`)
    return data ? JSON.parse(data) : []
  }

  setTable(tableName, data) {
    localStorage.setItem(`shothodzo_${tableName}`, JSON.stringify(data))
  }

  // Expose getTable for direct access if needed
  get getTableDirect() {
    return this.getTable.bind(this)
  }

  prepare(query) {
    return {
      get: (...params) => {
        return this.executeQuery(query, params, 'get')
      },
      all: (...params) => {
        return this.executeQuery(query, params, 'all')
      },
      run: (...params) => {
        return this.executeQuery(query, params, 'run')
      }
    }
  }

  executeQuery(query, params, mode) {
    // Simple query parser for common SQL operations
    const upperQuery = query.toUpperCase().trim()
    
    // SELECT queries
    if (upperQuery.startsWith('SELECT')) {
      return this.handleSelect(query, params, mode)
    }
    
    // INSERT queries
    if (upperQuery.startsWith('INSERT')) {
      return this.handleInsert(query, params, mode)
    }
    
    // UPDATE queries
    if (upperQuery.startsWith('UPDATE')) {
      return this.handleUpdate(query, params, mode)
    }
    
    // DELETE queries
    if (upperQuery.startsWith('DELETE')) {
      return this.handleDelete(query, params, mode)
    }
    
    return mode === 'all' ? [] : null
  }

  handleSelect(query, params, mode) {
    // Handle JOINs first
    if (query.includes('JOIN')) {
      return this.handleJoinQuery(query, params, mode)
    }
    
    // Extract table name and conditions
    const tableMatch = query.match(/FROM\s+(\w+)/i)
    if (!tableMatch) return mode === 'all' ? [] : null
    
    const tableName = tableMatch[1]
    let data = this.getTable(tableName)
    
    // Apply WHERE conditions
    if (query.includes('WHERE')) {
      const whereMatch = query.match(/WHERE\s+(.+?)(?:\s+ORDER|\s+LIMIT|$)/i)
      if (whereMatch) {
        const condition = whereMatch[1]
        data = this.applyWhere(data, condition, params)
      }
    }
    
    // Apply ORDER BY
    if (query.includes('ORDER BY')) {
      const orderMatch = query.match(/ORDER BY\s+(\w+)\s+(ASC|DESC)?/i)
      if (orderMatch) {
        const field = orderMatch[1]
        const direction = (orderMatch[2] || 'ASC').toUpperCase()
        data.sort((a, b) => {
          const aVal = a[field]
          const bVal = b[field]
          if (direction === 'DESC') {
            return bVal > aVal ? 1 : bVal < aVal ? -1 : 0
          }
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
        })
      }
    }
    
    // Apply LIMIT
    if (query.includes('LIMIT')) {
      const limitMatch = query.match(/LIMIT\s+(\d+)/i)
      if (limitMatch) {
        data = data.slice(0, parseInt(limitMatch[1]))
      }
    }
    
    // Handle aggregations
    if (query.includes('COUNT(*)')) {
      const result = { count: data.length }
      return mode === 'get' ? result : [result]
    }
    
    if (query.includes('SUM(')) {
      const sumMatch = query.match(/SUM\((\w+)\)/i)
      if (sumMatch) {
        const field = sumMatch[1]
        const total = data.reduce((sum, item) => sum + (parseFloat(item[field]) || 0), 0)
        const result = { total }
        return mode === 'get' ? result : [result]
      }
    }
    
    return mode === 'get' ? (data[0] || null) : data
  }

  handleJoinQuery(query, params, mode) {
    // Handle queries with JOINs
    const mainTableMatch = query.match(/FROM\s+(\w+)/i)
    if (!mainTableMatch) return mode === 'all' ? [] : null
    
    const mainTable = mainTableMatch[1]
    let data = this.getTable(mainTable)
    
    // Join with employees
    if (query.includes('JOIN employees')) {
      const employees = this.getTable('employees')
      const users = this.getTable('users')
      data = data.map(item => {
        const employee = employees.find(e => {
          if (query.includes('e.id = c.employee_id') || query.includes('employee_id = e.id')) {
            return String(e.id) === String(item.employee_id) || Number(e.id) === Number(item.employee_id)
          }
          return String(e.user_id) === String(item.user_id) || String(e.id) === String(item.id) || Number(e.user_id) === Number(item.user_id) || Number(e.id) === Number(item.id)
        })
        if (employee) {
          const user = users.find(u => String(u.id) === String(employee.user_id) || Number(u.id) === Number(employee.user_id))
          return {
            ...item,
            ...employee,
            email: user?.email || item.email
          }
        }
        return item
      })
    }
    
    // Join with clients
    if (query.includes('JOIN clients')) {
      const clients = this.getTable('clients')
      data = data.map(item => {
        const client = clients.find(c => {
          if (query.includes('c.user_id = u.id') || query.includes('user_id = c.user_id')) {
            return String(c.user_id) === String(item.id) || String(c.user_id) === String(item.user_id) || Number(c.user_id) === Number(item.id) || Number(c.user_id) === Number(item.user_id)
          }
          return String(c.id) === String(item.client_id) || String(c.id) === String(item.id) || Number(c.id) === Number(item.client_id) || Number(c.id) === Number(item.id)
        })
        if (client) {
          return { ...item, ...client }
        }
        return item
      })
    }
    
    // Join with users
    if (query.includes('JOIN users')) {
      const users = this.getTable('users')
      data = data.map(item => {
        const user = users.find(u => {
          if (query.includes('u.id = c.user_id') || query.includes('user_id = u.id') || query.includes('c.user_id = u.id')) {
            // Handle both c.user_id = u.id and u.id = c.user_id
            const userId = item.user_id || item.id
            return String(u.id) === String(userId) || Number(u.id) === Number(userId)
          }
          return String(u.id) === String(item.user_id) || Number(u.id) === Number(item.user_id)
        })
        if (user) {
          return { ...item, email: user.email }
        }
        return item
      })
    }
    
    // Apply WHERE conditions
    if (query.includes('WHERE')) {
      const whereMatch = query.match(/WHERE\s+(.+?)(?:\s+ORDER|\s+LIMIT|$)/i)
      if (whereMatch) {
        const condition = whereMatch[1]
        data = this.applyWhere(data, condition, params)
      }
    }
    
    // Apply ORDER BY
    if (query.includes('ORDER BY')) {
      const orderMatch = query.match(/ORDER BY\s+(\w+(?:\.\w+)?)\s+(ASC|DESC)?/i)
      if (orderMatch) {
        const field = orderMatch[1].split('.').pop()
        const direction = (orderMatch[2] || 'ASC').toUpperCase()
        data.sort((a, b) => {
          const aVal = a[field]
          const bVal = b[field]
          if (direction === 'DESC') {
            return bVal > aVal ? 1 : bVal < aVal ? -1 : 0
          }
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
        })
      }
    }
    
    // Apply LIMIT
    if (query.includes('LIMIT')) {
      const limitMatch = query.match(/LIMIT\s+(\d+)/i)
      if (limitMatch) {
        data = data.slice(0, parseInt(limitMatch[1]))
      }
    }
    
    // Handle string concatenation in SELECT
    if (query.includes('||')) {
      data = data.map(item => {
        const nameMatch = query.match(/(\w+)\.(first_name|last_name)\s*\|\|\s*' '\s*\|\|\s*(\w+)\.(first_name|last_name)/i)
        if (nameMatch) {
          const prefix = nameMatch[1]
          const field1 = nameMatch[2]
          const field2 = nameMatch[4]
          const key = `${prefix}_name`
          item[key] = `${item[field1] || ''} ${item[field2] || ''}`.trim()
        }
        return item
      })
    }
    
    return mode === 'get' ? (data[0] || null) : data
  }

  handleInsert(query, params, mode) {
    const tableMatch = query.match(/INTO\s+(\w+)/i)
    if (!tableMatch) return { lastInsertRowid: null }
    
    const tableName = tableMatch[1]
    const columnsMatch = query.match(/\(([^)]+)\)\s+VALUES/i)
    if (!columnsMatch) return { lastInsertRowid: null }
    
    const columns = columnsMatch[1].split(',').map(c => c.trim())
    const data = this.getTable(tableName)
    
    const newRecord = {}
    let id = 1
    if (data.length > 0) {
      const maxId = Math.max(...data.map(r => r.id || 0))
      id = maxId + 1
    }
    
    newRecord.id = id
    columns.forEach((col, index) => {
      let value = params[index]
      if (value === undefined || value === null) {
        // Handle default values
        if (col.includes('created_at') || col.includes('added_at') || col.includes('date_of_birth')) {
          // Skip, will be set below if needed
          return
        }
      }
      newRecord[col] = value
    })
    
    // Set timestamps if not provided
    // Auto-set created_at for users, employees, and clients tables
    if (!newRecord.created_at && (columns.includes('created_at') || tableName === 'users' || tableName === 'employees' || tableName === 'clients')) {
      newRecord.created_at = new Date().toISOString()
    }
    if (!newRecord.added_at && columns.includes('added_at')) {
      newRecord.added_at = new Date().toISOString()
    }
    
    data.push(newRecord)
    this.setTable(tableName, data)
    
    return { lastInsertRowid: id }
  }

  handleUpdate(query, params, mode) {
    const tableMatch = query.match(/UPDATE\s+(\w+)/i)
    if (!tableMatch) return { changes: 0 }
    
    const tableName = tableMatch[1]
    let data = this.getTable(tableName)
    
    const setMatch = query.match(/SET\s+(.+?)(?:\s+WHERE|$)/i)
    if (!setMatch) return { changes: 0 }
    
    const setClause = setMatch[1]
    const updates = setClause.split(',').map(s => s.trim())
    
    // Count how many SET parameters we have
    let setParamCount = 0
    updates.forEach(update => {
      const valuePart = update.split('=')[1]?.trim()
      if (valuePart === '?') {
        setParamCount++
      } else if (valuePart && valuePart.includes('?')) {
        setParamCount += (valuePart.match(/\?/g) || []).length
      }
    })
    
    // WHERE clause parameters come after SET parameters
    const whereParams = params.slice(setParamCount)
    const setParams = params.slice(0, setParamCount)
    
    let changes = 0
    const whereMatch = query.match(/WHERE\s+(.+?)(?:\s+ORDER|\s+LIMIT|$)/i)
    
    data = data.map(record => {
      let shouldUpdate = true
      if (whereMatch) {
        const condition = whereMatch[1]
        shouldUpdate = this.matchesCondition(record, condition, whereParams)
      }
      
      if (shouldUpdate) {
        changes++
        const updated = { ...record }
        let paramIndex = 0
        updates.forEach(update => {
          const [field, valuePart] = update.split('=').map(s => s.trim())
          const cleanField = field.trim()
          
          if (valuePart === '?') {
            updated[cleanField] = setParams[paramIndex]
            paramIndex++
          } else if (valuePart && valuePart.includes('?')) {
            // Handle multiple ? in value
            let value = valuePart
            while (value.includes('?')) {
              value = value.replace('?', setParams[paramIndex])
              paramIndex++
            }
            updated[cleanField] = value.replace(/'/g, '')
          } else if (valuePart && !valuePart.includes('?')) {
            updated[cleanField] = valuePart.replace(/'/g, '').trim()
          }
        })
        return updated
      }
      return record
    })
    
    this.setTable(tableName, data)
    return { changes }
  }

  handleDelete(query, params, mode) {
    const tableMatch = query.match(/FROM\s+(\w+)/i)
    if (!tableMatch) return { changes: 0 }
    
    const tableName = tableMatch[1]
    let data = this.getTable(tableName)
    const originalLength = data.length
    
    const whereMatch = query.match(/WHERE\s+(.+?)(?:\s+ORDER|\s+LIMIT|$)/i)
    if (whereMatch) {
      const condition = whereMatch[1]
      data = data.filter(record => !this.matchesCondition(record, condition, params))
      this.setTable(tableName, data)
    }
    
    return { changes: originalLength - data.length }
  }

  applyWhere(data, condition, params) {
    return data.filter(record => this.matchesCondition(record, condition, params))
  }

  matchesCondition(record, condition, params) {
    // Simple condition matching
    if (condition.includes('=')) {
      const parts = condition.split('=')
      if (parts.length === 2) {
        const [field, value] = parts.map(s => s.trim())
        const cleanField = field.split('.').pop() // Handle table.field syntax
        const cleanValue = value.replace(/'/g, '').trim()
        
        // Handle parameterized queries (user_id = ?)
        if (value.trim() === '?') {
          const recordValue = record[cleanField]
          const paramValue = params && params.length > 0 ? params[0] : null
          
          // Handle null/undefined
          if (recordValue === null || recordValue === undefined) {
            return paramValue === null || paramValue === undefined
          }
          if (paramValue === null || paramValue === undefined) {
            return false
          }
          
          // For ID fields, use strict numeric comparison first, then fallback to string
          if (cleanField === 'id' || cleanField.endsWith('_id')) {
            const recordNum = Number(recordValue)
            const paramNum = Number(paramValue)
            // Strict numeric comparison for IDs
            if (!isNaN(recordNum) && !isNaN(paramNum)) {
              return recordNum === paramNum
            }
          }
          
          // Fallback to string comparison
          return String(recordValue) === String(paramValue)
        }
        
        // Handle literal values
        if (cleanValue && !cleanValue.includes('?')) {
          return String(record[cleanField]) == cleanValue
        }
        
        // Handle multiple parameters (shouldn't happen with current queries but handle it)
        if (value.includes('?')) {
          const paramIndex = value.indexOf('?')
          // For now, just use first param
          return String(record[cleanField]) == String(params[0])
        }
      }
    }
    
    if (condition.includes('AND')) {
      const parts = condition.split('AND')
      return parts.every(part => this.matchesCondition(record, part.trim(), params))
    }
    
    if (condition.includes('OR')) {
      const parts = condition.split('OR')
      return parts.some(part => this.matchesCondition(record, part.trim(), params))
    }
    
    return true
  }


  pragma(setting) {
    // No-op for localStorage implementation
    return {}
  }

  exec(sql) {
    // No-op for localStorage implementation
    // Tables are created in init()
  }
}

const db = new Database()

export default db
