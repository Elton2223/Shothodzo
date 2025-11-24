// Utility functions for tracking payment status and overdue clients

/**
 * Check if a client is overdue (hasn't paid in the last 3 months)
 * @param {number} clientId - The client ID
 * @returns {Object} - { isOverdue: boolean, monthsOverdue: number, lastPaymentDate: Date | null }
 */
export function checkPaymentStatus(clientId) {
  try {
    const payments = JSON.parse(localStorage.getItem('shothodzo_payments') || '[]')
    const subscriptions = JSON.parse(localStorage.getItem('shothodzo_subscriptions') || '[]')
    
    // Get client's subscription
    const subscription = subscriptions.find(s => s.client_id === clientId)
    if (!subscription || subscription.status !== 'active') {
      return { isOverdue: false, monthsOverdue: 0, lastPaymentDate: null, reason: 'No active subscription' }
    }
    
    // Get all completed payments for this client, sorted by date (most recent first)
    const clientPayments = payments
      .filter(p => p.client_id === clientId && p.status === 'completed')
      .sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date))
    
    if (clientPayments.length === 0) {
      // No payments at all - check subscription start date
      const startDate = new Date(subscription.start_date)
      const monthsSinceStart = getMonthsDifference(startDate, new Date())
      
      if (monthsSinceStart >= 3) {
        return {
          isOverdue: true,
          monthsOverdue: monthsSinceStart,
          lastPaymentDate: null,
          reason: 'No payments recorded since subscription start'
        }
      }
      return { isOverdue: false, monthsOverdue: 0, lastPaymentDate: null, reason: 'New subscription' }
    }
    
    // Get the most recent payment date
    const lastPaymentDate = new Date(clientPayments[0].payment_date)
    const monthsSinceLastPayment = getMonthsDifference(lastPaymentDate, new Date())
    
    if (monthsSinceLastPayment >= 3) {
      return {
        isOverdue: true,
        monthsOverdue: monthsSinceLastPayment,
        lastPaymentDate: lastPaymentDate,
        reason: `No payment for ${monthsSinceLastPayment} months`
      }
    }
    
    return {
      isOverdue: false,
      monthsOverdue: 0,
      lastPaymentDate: lastPaymentDate,
      reason: 'Payment up to date'
    }
  } catch (error) {
    console.error('Error checking payment status:', error)
    return { isOverdue: false, monthsOverdue: 0, lastPaymentDate: null, reason: 'Error checking status' }
  }
}

/**
 * Calculate the difference in months between two dates
 * @param {Date} date1 - Earlier date
 * @param {Date} date2 - Later date
 * @returns {number} - Number of months difference
 */
function getMonthsDifference(date1, date2) {
  const months = (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth())
  return Math.max(0, months)
}

/**
 * Mark overdue clients as suspended
 * This should be called periodically (e.g., on dashboard load or daily)
 * @param {number} employeeId - Optional: only check clients for a specific employee
 * @returns {Array} - Array of client IDs that were marked as suspended
 */
export function markOverdueClients(employeeId = null) {
  try {
    const clients = JSON.parse(localStorage.getItem('shothodzo_clients') || '[]')
    const subscriptions = JSON.parse(localStorage.getItem('shothodzo_subscriptions') || '[]')
    const suspendedClients = []
    
    // Filter clients by employee if specified
    let clientsToCheck = clients
    if (employeeId) {
      clientsToCheck = clients.filter(c => c.employee_id === employeeId)
    }
    
    clientsToCheck.forEach(client => {
      const paymentStatus = checkPaymentStatus(client.id)
      
      if (paymentStatus.isOverdue && paymentStatus.monthsOverdue >= 3) {
        // Check if client has an active subscription
        const subscription = subscriptions.find(s => s.client_id === client.id)
        
        if (subscription && subscription.status === 'active') {
          // Update subscription status to suspended
          subscription.status = 'suspended'
          subscription.suspended_reason = paymentStatus.reason
          subscription.suspended_date = new Date().toISOString()
          
          // Update client subscription status
          client.subscription_status = 'suspended'
          
          suspendedClients.push({
            clientId: client.id,
            clientName: `${client.first_name} ${client.last_name}`,
            monthsOverdue: paymentStatus.monthsOverdue,
            lastPaymentDate: paymentStatus.lastPaymentDate
          })
        }
      }
    })
    
    // Save updated data
    if (suspendedClients.length > 0) {
      localStorage.setItem('shothodzo_clients', JSON.stringify(clients))
      localStorage.setItem('shothodzo_subscriptions', JSON.stringify(subscriptions))
    }
    
    return suspendedClients
  } catch (error) {
    console.error('Error marking overdue clients:', error)
    return []
  }
}

/**
 * Get all overdue clients for an employee
 * @param {number} employeeId - The employee ID
 * @returns {Array} - Array of overdue client information
 */
export function getOverdueClients(employeeId) {
  try {
    const clients = JSON.parse(localStorage.getItem('shothodzo_clients') || '[]')
    const employeeClients = clients.filter(c => c.employee_id === employeeId)
    
    return employeeClients.map(client => {
      const paymentStatus = checkPaymentStatus(client.id)
      return {
        ...client,
        paymentStatus,
        isOverdue: paymentStatus.isOverdue && paymentStatus.monthsOverdue >= 3
      }
    }).filter(c => c.isOverdue)
  } catch (error) {
    console.error('Error getting overdue clients:', error)
    return []
  }
}

