// Helper function to get employee ID from current user
export function getEmployeeId(currentUser) {
  if (!currentUser) return null
  
  // If employee_code exists, this is already an employee record with employee id
  if (currentUser.employee_code) {
    return currentUser.id
  }
  
  // Otherwise, try to find the employee record by user_id
  try {
    const employees = JSON.parse(localStorage.getItem('shothodzo_employees') || '[]')
    const employee = employees.find(e => e.user_id === currentUser.id)
    return employee ? employee.id : null
  } catch (error) {
    console.error('Error getting employee ID:', error)
    return null
  }
}

