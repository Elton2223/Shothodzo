// Helper function to get employee ID from current user
export function getEmployeeId(currentUser) {
  if (!currentUser) return null
  
  // If employee_code exists, this is already an employee record with employee id
  if (currentUser.employee_code) {
    // The currentUser.id should be the employee ID after login merge
    // But let's verify by checking the employees table
    try {
      const employees = JSON.parse(localStorage.getItem('shothodzo_employees') || '[]')
      const employee = employees.find(e => 
        e.id === currentUser.id || 
        e.user_id === currentUser.id ||
        (currentUser.user_id && e.user_id === currentUser.user_id)
      )
      if (employee) {
        return employee.id
      }
      // Fallback to currentUser.id if employee_code exists
      return currentUser.id
    } catch (error) {
      console.error('Error getting employee ID:', error)
      return currentUser.id
    }
  }
  
  // Otherwise, try to find the employee record by user_id
  try {
    const employees = JSON.parse(localStorage.getItem('shothodzo_employees') || '[]')
    const employee = employees.find(e => 
      e.user_id === currentUser.id || 
      (currentUser.user_id && e.user_id === currentUser.user_id)
    )
    return employee ? employee.id : null
  } catch (error) {
    console.error('Error getting employee ID:', error)
    return null
  }
}

