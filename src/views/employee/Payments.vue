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
            <span class="text-sm">Welcome, {{ employeeName }}</span>
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
            to="/employee"
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors text-sm font-semibold"
          >
            Dashboard
          </router-link>
          <router-link
            to="/employee/clients"
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors text-sm font-semibold"
          >
            My Clients
          </router-link>
          <router-link
            to="/employee/payments"
            class="px-4 py-3 border-b-2 border-shothodzo-green text-shothodzo-green font-semibold text-sm"
          >
            Payments
          </router-link>
          <router-link
            to="/employee/subscriptions"
            class="px-4 py-3 border-b-2 border-transparent hover:border-shothodzo-green hover:text-shothodzo-green transition-colors text-sm font-semibold"
          >
            Subscriptions
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Payment Management</h2>
        <div class="flex gap-3">
          <button @click="downloadPaymentSummaryPDF" class="bg-shothodzo-purple hover:bg-shothodzo-purple-dark text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Payment Summary
          </button>
          <button @click="showAddModal = true" class="btn-primary">Record Payment</button>
        </div>
      </div>

      <!-- Payments Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-shothodzo-green-dark text-white">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Client</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Method</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Reference</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="payment in payments" :key="payment.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ new Date(payment.payment_date).toLocaleDateString() }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ payment.client_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-shothodzo-green">R{{ payment.amount.toLocaleString() }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ payment.payment_method }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ payment.reference_number || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(payment.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                  {{ payment.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button 
                  @click="confirmRevokePayment(payment)" 
                  class="text-red-600 hover:text-red-800 font-semibold text-sm"
                  title="Revoke this payment"
                >
                  Revoke
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add Payment Modal -->
      <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Record Payment</h3>
          
          <form @submit.prevent="handleAddPayment" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Client *</label>
              <select v-model="newPayment.clientId" required class="input-field">
                <option value="">Select a client</option>
                <option v-for="client in myClients" :key="client.id" :value="client.id">
                  {{ client.first_name }} {{ client.last_name }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Amount (R) *</label>
              <input v-model.number="newPayment.amount" type="number" step="0.01" required class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label>
              <input v-model="newPayment.paymentDate" type="date" required class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
              <select v-model="newPayment.paymentMethod" required class="input-field">
                <option value="">Select method</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="mobile_money">Mobile Money</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Reference Number</label>
              <input v-model="newPayment.referenceNumber" type="text" class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea v-model="newPayment.notes" class="input-field" rows="3"></textarea>
            </div>

            <div class="flex gap-4 pt-4">
              <button type="submit" class="flex-1 btn-primary">Record Payment</button>
              <button type="button" @click="showAddModal = false" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Revoke Payment Confirmation Modal -->
      <div v-if="showRevokeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Revoke Payment</h3>
          <div class="mb-6">
            <p class="text-gray-600 mb-2">Are you sure you want to revoke this payment record?</p>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-700"><strong>Client:</strong> {{ paymentToRevoke?.client_name }}</p>
              <p class="text-sm text-gray-700"><strong>Amount:</strong> R{{ paymentToRevoke?.amount?.toLocaleString() }}</p>
              <p class="text-sm text-gray-700"><strong>Date:</strong> {{ paymentToRevoke?.payment_date ? new Date(paymentToRevoke.payment_date).toLocaleDateString() : 'N/A' }}</p>
              <p class="text-sm text-gray-700"><strong>Reference:</strong> {{ paymentToRevoke?.reference_number || 'N/A' }}</p>
            </div>
            <p class="text-red-600 text-sm mt-4 font-semibold">This action cannot be undone.</p>
          </div>
          <div class="flex gap-4">
            <button @click="handleRevokePayment" class="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg">
              Yes, Revoke
            </button>
            <button @click="showRevokeModal = false" class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import db from '../../database/db'
import { getEmployeeId } from '../../utils/employee'
import jsPDF from 'jspdf'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const payments = ref([])
const myClients = ref([])
const showAddModal = ref(false)
const showRevokeModal = ref(false)
const paymentToRevoke = ref(null)
const newPayment = ref({
  clientId: '',
  amount: 0,
  paymentDate: new Date().toISOString().split('T')[0],
  paymentMethod: '',
  referenceNumber: '',
  notes: ''
})

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

const employeeName = computed(() => {
  if (authStore.currentUser) {
    return `${authStore.currentUser.first_name} ${authStore.currentUser.last_name}`
  }
  return 'Employee'
})

const getStatusClass = (status) => {
  const classes = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const loadPayments = () => {
  const employeeId = getEmployeeId(authStore.currentUser)
  if (!employeeId) {
    console.error('Employee ID not found')
    return
  }
  
  payments.value = db.prepare(`
    SELECT p.*, c.first_name || ' ' || c.last_name as client_name
    FROM payments p
    JOIN clients c ON p.client_id = c.id
    WHERE p.employee_id = ?
    ORDER BY p.payment_date DESC, p.created_at DESC
  `).all(employeeId)
}

const loadClients = () => {
  const employeeId = getEmployeeId(authStore.currentUser)
  if (!employeeId) {
    console.error('Employee ID not found')
    return
  }
  
  myClients.value = db.prepare(`
    SELECT c.id, c.first_name, c.last_name
    FROM clients c
    WHERE c.employee_id = ?
    ORDER BY c.first_name, c.last_name
  `).all(employeeId)
  
  // Set default client if from query param
  const clientId = route.query.client
  if (clientId) {
    newPayment.value.clientId = parseInt(clientId)
  }
}

const handleAddPayment = () => {
  try {
    const employeeId = getEmployeeId(authStore.currentUser)
    if (!employeeId) {
      alert('Employee ID not found. Please log out and log back in.')
      return
    }
    
    const insertPayment = db.prepare(`
      INSERT INTO payments (client_id, employee_id, amount, payment_date, payment_method, reference_number, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    
    insertPayment.run(
      newPayment.value.clientId,
      employeeId,
      newPayment.value.amount,
      newPayment.value.paymentDate,
      newPayment.value.paymentMethod,
      newPayment.value.referenceNumber || null,
      newPayment.value.notes || null,
      'completed'
    )

    // Reset form
    newPayment.value = {
      clientId: '',
      amount: 0,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: '',
      referenceNumber: '',
      notes: ''
    }
    showAddModal.value = false
    loadPayments()
    alert('Payment recorded successfully!')
  } catch (error) {
    alert('Error recording payment: ' + error.message)
  }
}

const confirmRevokePayment = (payment) => {
  paymentToRevoke.value = payment
  showRevokeModal.value = true
}

const handleRevokePayment = () => {
  try {
    if (!paymentToRevoke.value || !paymentToRevoke.value.id) {
      alert('Invalid payment record')
      return
    }
    
    // Delete the payment from the database
    db.prepare('DELETE FROM payments WHERE id = ?').run(paymentToRevoke.value.id)
    
    // Also remove from localStorage if it exists there
    try {
      const payments = JSON.parse(localStorage.getItem('shothodzo_payments') || '[]')
      const filteredPayments = payments.filter(p => p.id !== paymentToRevoke.value.id)
      localStorage.setItem('shothodzo_payments', JSON.stringify(filteredPayments))
    } catch (error) {
      console.error('Error removing payment from localStorage:', error)
    }
    
    showRevokeModal.value = false
    paymentToRevoke.value = null
    loadPayments()
    alert('Payment revoked successfully!')
  } catch (error) {
    console.error('Error revoking payment:', error)
    alert('Error revoking payment: ' + error.message)
  }
}

const downloadPaymentSummaryPDF = () => {
  try {
    const employeeId = getEmployeeId(authStore.currentUser)
    if (!employeeId) {
      alert('Employee ID not found')
      return
    }

    // Get employee details
    const employee = db.prepare('SELECT * FROM employees WHERE id = ?').get(employeeId)
    const employeeName = employee ? `${employee.first_name} ${employee.last_name}` : 'Employee'
    const employeeCode = employee?.employee_code || 'N/A'
    
    // Calculate totals
    const totalAmount = payments.value.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0)
    const totalPayments = payments.value.length
    const completedPayments = payments.value.filter(p => p.status === 'completed').length
    
    // Create PDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    let yPos = margin
    
    // Load and add logo
    const logoImg = new Image()
    logoImg.crossOrigin = 'anonymous'
    logoImg.src = '/images/Shothodzo.jpg'
    
    // Function to add content after logo loads
    const addContent = () => {
      try {
        // Try to add logo if loaded
        if (logoImg.complete && logoImg.naturalHeight !== 0) {
          try {
            const logoWidth = 35
            const logoHeight = (logoWidth * logoImg.height) / logoImg.width
            doc.addImage(logoImg, 'JPEG', margin, yPos, logoWidth, logoHeight)
          } catch (e) {
            console.log('Could not add logo image, continuing without it')
          }
        }
      } catch (e) {
        console.log('Logo not available, continuing without it')
      }
      
      // Company Header (similar to the formal letter format)
      yPos += 22
      
      
      yPos += 10
      doc.setFontSize(9)
      doc.text('Private Bag X424, PRETORIA, 0001', margin, yPos)
      yPos += 4
      doc.text('Tel: (012) 345 6789 | Customer Contact Centre', margin, yPos)
      yPos += 4
      doc.text('Local: 012 345 6789 | International: +12 345 6789', margin, yPos)
      yPos += 4
      doc.text('www.shothodzo.co.za', margin, yPos)
      
      yPos += 12
      
      // Recipient Section (left side)
      doc.setFontSize(10)
      doc.text('Name:', margin, yPos)
      doc.text(employeeName, margin + 30, yPos)
      
      yPos += 5
      doc.text('Employee Code:', margin, yPos)
      doc.text(employeeCode, margin + 30, yPos)
      
      yPos += 5
      doc.text('Date:', margin, yPos)
      doc.text(new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }), margin + 30, yPos)
      
      // Enquiries section (right side)
      const enquiriesY = yPos - 10
      doc.text('Ref:', pageWidth - 60, enquiriesY)
      doc.text('Enquiries: Customer Support', pageWidth - 60, enquiriesY + 5)
      doc.text('Tel: 012 345 6789', pageWidth - 60, enquiriesY + 10)
      doc.text('Email: support@shothodzo.co.za', pageWidth - 60, enquiriesY + 15)
      
      yPos += 12
      
      // Subject Line (bold, similar to formal letter)
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text('PAYMENT SUMMARY REPORT', margin, yPos)
      
      yPos += 8
      
      // Introduction text
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      const introText = 'This document provides a summary of all payment records processed under your account. Please review the details below:'
      const introLines = doc.splitTextToSize(introText, pageWidth - 2 * margin)
      doc.text(introLines, margin, yPos)
      yPos += introLines.length * 5 + 5
      
      // Summary Statistics
      doc.setFont('helvetica', 'bold')
      doc.text('Summary Statistics:', margin, yPos)
      yPos += 5
      doc.setFont('helvetica', 'normal')
      doc.text(`Total Number of Payments: ${totalPayments}`, margin + 5, yPos)
      yPos += 5
      doc.text(`Completed Payments: ${completedPayments}`, margin + 5, yPos)
      yPos += 5
      doc.text(`Total Amount: R${totalAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, margin + 5, yPos)
      
      yPos += 10
      
      // Payment Details Table Header (with shaded background like formal letter)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setFillColor(200, 200, 200) // Gray background like formal letter
      doc.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F')
      doc.setTextColor(0, 0, 0)
      
      doc.text('Date', margin + 2, yPos + 5)
      doc.text('Client', margin + 30, yPos + 5)
      doc.text('Amount', margin + 80, yPos + 5)
      doc.text('Method', margin + 110, yPos + 5)
      doc.text('Reference', margin + 140, yPos + 5)
      doc.text('Status', margin + 170, yPos + 5)
      
      yPos += 8
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      
      // Payment rows
      if (payments.value.length === 0) {
        doc.text('No payment records found.', margin + 5, yPos + 5)
        yPos += 10
      } else {
        payments.value.forEach((payment, index) => {
          // Check if we need a new page
          if (yPos > pageHeight - 30) {
            doc.addPage()
            yPos = margin
            
            // Redraw table header on new page
            doc.setFont('helvetica', 'bold')
            doc.setFontSize(9)
            doc.setFillColor(200, 200, 200)
            doc.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F')
            doc.setTextColor(0, 0, 0)
            doc.text('Date', margin + 2, yPos + 5)
            doc.text('Client', margin + 30, yPos + 5)
            doc.text('Amount', margin + 80, yPos + 5)
            doc.text('Method', margin + 110, yPos + 5)
            doc.text('Reference', margin + 140, yPos + 5)
            doc.text('Status', margin + 170, yPos + 5)
            yPos += 8
            doc.setFont('helvetica', 'normal')
            doc.setFontSize(8)
          }
          
          // Alternate row colors for readability
          if (index % 2 === 0) {
            doc.setFillColor(250, 250, 250)
            doc.rect(margin, yPos - 2, pageWidth - 2 * margin, 6, 'F')
          }
          
          const paymentDate = new Date(payment.payment_date).toLocaleDateString('en-ZA')
          const amount = `R${parseFloat(payment.amount || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          const clientName = payment.client_name || 'N/A'
          const method = (payment.payment_method || 'N/A').replace('_', ' ').toUpperCase()
          const reference = payment.reference_number || 'N/A'
          const status = (payment.status || 'N/A').toUpperCase()
          
          doc.text(paymentDate, margin + 2, yPos + 3)
          
          // Truncate client name if too long
          const clientNameShort = clientName.length > 18 ? clientName.substring(0, 15) + '...' : clientName
          doc.text(clientNameShort, margin + 30, yPos + 3)
          
          doc.text(amount, margin + 80, yPos + 3)
          
          // Truncate method if too long
          const methodShort = method.length > 12 ? method.substring(0, 9) + '...' : method
          doc.text(methodShort, margin + 110, yPos + 3)
          
          // Truncate reference if too long
          const referenceShort = reference.length > 12 ? reference.substring(0, 9) + '...' : reference
          doc.text(referenceShort, margin + 140, yPos + 3)
          
          doc.text(status, margin + 170, yPos + 3)
          
          yPos += 6
        })
      }
      
      yPos += 10
      
      // Footer
      if (yPos > pageHeight - 40) {
        doc.addPage()
        yPos = margin
      }
      
      doc.setFontSize(9)
      doc.setFont('helvetica', 'italic')
      doc.text('This is an automated payment summary report generated by the Shothodzo Funeral Services system.', margin, yPos)
      yPos += 5
      doc.text('For any queries or discrepancies, please contact your administrator or the Shothodzo support team.', margin, yPos)
      
      // Save PDF
      const fileName = `Payment_Summary_${employeeCode}_${new Date().toISOString().split('T')[0]}.pdf`
      doc.save(fileName)
    }
    
    // Try to load logo, but proceed even if it fails
    if (logoImg.complete) {
      addContent()
    } else {
      logoImg.onload = addContent
      logoImg.onerror = addContent // Continue even if logo fails to load
    }
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Error generating PDF: ' + error.message)
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  if (!authStore.isEmployee) {
    router.push('/login')
    return
  }
  loadPayments()
  loadClients()
})
</script>

