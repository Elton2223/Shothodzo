// Helper function to get client ID from current user
export function getClientId(currentUser) {
  if (!currentUser) return null
  
  // If client-specific fields exist, this is already a client record with client id
  if (currentUser.id_number || currentUser.employee_id !== undefined) {
    return currentUser.id
  }
  
  // Otherwise, try to find the client record by user_id
  try {
    const clients = JSON.parse(localStorage.getItem('shothodzo_clients') || '[]')
    const client = clients.find(c => c.user_id === currentUser.id)
    return client ? client.id : null
  } catch (error) {
    console.error('Error getting client ID:', error)
    return null
  }
}

