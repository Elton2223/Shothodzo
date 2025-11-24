# Setup Guide for Shothodzo Funeral Services

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Open your browser to `http://localhost:3000`
   - The database will be automatically initialized in localStorage

## Default Login Credentials

### Admin Account
- **Email**: `admin@shothodzo.co.za`
- **Password**: `admin123`
- **Access**: Full admin dashboard with employee management

## Testing the Application

### 1. Create an Employee (as Admin)
1. Log in as admin
2. Navigate to "Employees" in the admin dashboard
3. Click "Add New Employee"
4. Fill in the employee details
5. Note the **Employee Code** - clients will need this to register

### 2. Register a Client
1. Go to the registration page
2. Fill in client details
3. Enter the **Employee Code** from step 1
4. Complete registration

### 3. Test Family Plan Detection
1. Register a client (Client A) with an employee code
2. As admin or employee, manually add Client A to a family plan (or create a family subscription)
3. Register another client (Client B) with the same ID number as Client A
4. Client B should see a popup about being under a family plan when they log in

### 4. Test Employee Portal
1. Log in as an employee
2. View "My Clients" to see all clients under your name
3. Record payments for clients
4. View payment history

### 5. Test Client Portal
1. Log in as a client
2. View dashboard with subscription status
3. Apply for a subscription (individual or family plan)
4. View payment history

## Database Reset

To reset the database (clear all data):
1. Open browser Developer Tools (F12)
2. Go to Application/Storage tab
3. Find Local Storage
4. Delete all keys starting with `shothodzo_`
5. Refresh the page - database will be reinitialized

## Notes

- All data is stored in browser localStorage
- Data persists across browser sessions
- To share data between browsers/devices, you'll need to implement a backend API
- For production, replace the localStorage database with a proper backend (Node.js/Express, Python/Flask, etc.) and a real database (PostgreSQL, MySQL, etc.)

## Troubleshooting

### Database not initializing
- Clear browser cache and localStorage
- Refresh the page
- Check browser console for errors

### Can't log in
- Make sure you're using the correct email and password
- Check that the database was initialized (check localStorage in DevTools)

### Registration fails
- Ensure the employee code is correct
- Check that an employee with that code exists in the system

