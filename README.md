# Shothodzo Funeral Services

A comprehensive funeral services management system with three main portals: Admin, Employee, and Client.

## Features

### Admin Portal
- Dashboard with statistics
- Employee management (create, view, delete employees)
- View all system activity

### Employee Portal
- Dashboard with client and payment statistics
- Client management (view all clients under their name)
- Payment recording and management
- Each employee has a unique employee code for client referrals

### Client Portal
- Dashboard with subscription status and payment history
- Family plan detection - if a client registers and is already under a family member's plan, a popup will appear
- Subscription management - clients can apply for individual or family plans
- Automatic termination from family plan when starting their own subscription

## Technology Stack

- **Frontend**: Vue.js 3 with Composition API
- **State Management**: Pinia
- **Routing**: Vue Router
- **Database**: localStorage (browser-based for testing)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

**Note**: The current implementation uses localStorage for browser-based testing. For production, this should be replaced with a proper backend API (Node.js/Express, Python/Flask, etc.) with a real database (PostgreSQL, MySQL, etc.).

## Installation

1. Install dependencies:
```bash
npm install
```

2. The database will be automatically created when you first run the application.

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Database Schema

The application uses localStorage (simulated database) with the following main tables:
- `users` - User accounts (admin, employee, client)
- `employees` - Employee information
- `clients` - Client information
- `subscriptions` - Client subscription plans
- `payments` - Payment records
- `family_members` - Family plan relationships

## Default Admin Account

A default admin account is automatically created:
- **Email**: `admin@shothodzo.co.za`
- **Password**: `admin123`
- **Role**: `admin`

You can use these credentials to log in and start managing the system.

## Color Scheme

The application uses Shothodzo's brand colors:
- **Purple**: #6B46C1 (primary purple)
- **Green**: #10B981 (primary green)

## Project Structure

```
src/
├── components/     # Reusable components
├── views/          # Page components
│   ├── admin/      # Admin portal views
│   ├── employee/   # Employee portal views
│   └── client/     # Client portal views
├── stores/         # Pinia stores
├── router/         # Vue Router configuration
├── database/       # Database setup and connection
└── style.css       # Global styles
```

## Key Features Implementation

### Family Plan Detection
When a client registers with an ID number that matches an existing family plan member, the system:
1. Detects the family plan relationship during registration
2. Stores the information in localStorage
3. Shows a popup on the client dashboard after login
4. Allows the client to terminate from the family plan and start their own subscription

### Employee Reference System
- Each employee has a unique employee code
- Clients must provide an employee code during registration
- All clients are linked to their referring employee
- Employees can only see and manage their own clients

### Payment Management
- Employees can record payments for their clients
- Payments are tracked with reference numbers and notes
- Payment history is visible to both employees and clients

## Development Notes

- The database file (`shothodzo.db`) will be created in the project root
- Password hashing is simplified for development - use proper bcrypt in production
- All dates are stored in SQLite DATE format
- The application uses client-side routing with Vue Router

