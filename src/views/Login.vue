<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <router-link to="/" class="flex flex-col items-center mb-4 cursor-pointer hover:opacity-80 transition-opacity">
          <div class="w-16 h-16 bg-shothodzo-green rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-3xl">S</span>
          </div>
          <h2 class="text-3xl font-bold text-shothodzo-purple mt-2">SHOTHODZO</h2>
          <p class="text-shothodzo-green mt-1">Funeral Service</p>
        </router-link>
        <h3 class="mt-6 text-2xl font-semibold text-gray-900">Sign in to your account</h3>
      </div>
      
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>
        
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="input-field"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="input-field"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary py-3 text-lg"
          >
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <router-link to="/register" class="text-shothodzo-green hover:underline font-medium">
              Register here
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    await authStore.login(email.value, password.value)
    
    // Debug: Log the role to help diagnose issues
    console.log('Login successful. User role:', authStore.userRole)
    console.log('Is Admin:', authStore.isAdmin)
    console.log('Is Employee:', authStore.isEmployee)
    console.log('Is Client:', authStore.isClient)
    
    // Redirect based on role - check userRole directly for more reliability
    let redirect = route.query.redirect
    
    if (!redirect) {
      if (authStore.userRole === 'admin') {
        redirect = '/admin'
      } else if (authStore.userRole === 'employee') {
        redirect = '/employee'
      } else if (authStore.userRole === 'client') {
        redirect = '/client'
      } else {
        redirect = '/'
      }
    }
    
    router.push(redirect)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

