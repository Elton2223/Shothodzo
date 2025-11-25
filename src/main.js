import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth state after Pinia is set up
try {
  const authStore = useAuthStore()
  authStore.initializeAuth()
} catch (error) {
  console.error('Error initializing auth on app start:', error)
}

app.mount('#app')

