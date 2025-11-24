<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Utility Bar -->
    <div class="glass-dark bg-shothodzo-purple-light/80 text-white py-2">
      <div class="container mx-auto px-4 flex justify-between items-center text-sm">
        <div class="flex gap-6">
          <a href="#" class="hover:text-shothodzo-green transition-colors flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            FIND A BRANCH
          </a>
          <a href="/register" class="hover:text-shothodzo-green transition-colors flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            APPLY FOR A POLICY
          </a>
          <a href="#" class="hover:text-shothodzo-green transition-colors flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            SELF SERVICE
          </a>
          <a href="#" class="hover:text-shothodzo-green transition-colors flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            CONTACT SHOTHODZO
          </a>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <nav class="glass-nav bg-shothodzo-green-dark text-white sticky top-0 z-50" style="background-color: rgba(5, 150, 105, 0.95);">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <router-link to="/" class="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
          <div class="w-[350px] h-[146px] bg-white rounded-lg flex items-center justify-center p-2 shadow-md overflow-hidden">
            <img src="/images/Shothodzo.jpg" alt="Shothodzo Logo" class="w-full h-full object-cover rounded" />
          </div>
        </router-link>
        <div class="flex gap-6 items-center">
          <router-link to="/" class="text-sm font-medium hover:text-shothodzo-green-light transition-colors">BENEFIT WITH SHOTHODZO</router-link>
          <a href="#" class="text-sm font-medium hover:text-shothodzo-green-light transition-colors">SHOTHODZO FUNERAL SERVICES</a>
          <a href="#" class="text-sm font-medium hover:text-shothodzo-green-light transition-colors">INSURE WITH SHOTHODZO</a>
          <a href="#" class="text-sm font-medium hover:text-shothodzo-green-light transition-colors">PAY YOUR PREMIUM</a>
          <a href="#" class="text-sm font-medium hover:text-shothodzo-green-light transition-colors">HOW TO CLAIM</a>
          <router-link to="/login" class="btn-secondary text-sm font-medium">LOGIN</router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Compassionate Shothodzo Funeral Services You Can Trust
            </h1>
            <p class="text-xl text-gray-700 mb-8 leading-relaxed">
              We provide personalized and sensitive funeral services tailored to honor your loved one's unique life and legacy. Our team approaches every service with the utmost sensitivity and care.
            </p>
            <router-link to="/register" class="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-shadow inline-block">
              Start Funeral Planning
            </router-link>
          </div>
          <div class="flex justify-center">
            <div class="w-96 h-96 rounded-full overflow-hidden shadow-2xl">
              <img src="/images/Shothodzo.jpg" alt="Shothodzo Funeral Services" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Families Trust Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-900 mb-12">
          Why Families Across South Africa Trust Shothodzo Funeral Services
        </h2>
        <div class="grid grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-shothodzo-green-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Compassionate & Personalized Service</h3>
            <p class="text-gray-700">We provide careful, tailor-made services that reflect your loved one's unique life and legacy.</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-shothodzo-green-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                <path d="M10 11a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Experienced, Caring Professionals</h3>
            <p class="text-gray-700">Our dedicated team has years of experience and provides heartfelt guidance throughout the process.</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-shothodzo-green-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Support Around The Clock</h3>
            <p class="text-gray-700">Available 24/7 for questions, arrangements, and support when you need us most.</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-shothodzo-green-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.12V17a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Trusted By South African Families</h3>
            <p class="text-gray-700">Rooted in local values and community care, earning trust through respectful, dignified service.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trusted Professionals Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl font-bold text-gray-900 mb-6">
            Trusted Funeral Professionals Serving South African Communities
          </h2>
          <p class="text-xl text-gray-700 leading-relaxed">
            Shothodzo funeral services is a trusted service dedicated to honoring lives with dignity and respect. We provide personalized farewells that reflect each unique life and personality, ensuring every service is conducted with excellence and a comforting atmosphere.
          </p>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-bold text-gray-900 mb-6">
              Need Support Planning a Funeral? Contact Shothodzo Funeral Services for compassionate guidance today.
            </h2>
            <button class="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-shadow">
              Get Funeral Guidance
            </button>
          </div>
          <div class="rounded-lg overflow-hidden shadow-xl">
            <img src="/images/Shothodzo.jpg" alt="Funeral Guidance" class="w-full h-80 object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- Professional Services Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-900 mb-12">
          Professional Funeral Services That Honor Your Loved One's Legacy
        </h2>
        <div class="grid grid-cols-3 gap-8">
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="h-48 bg-shothodzo-green-light flex items-center justify-center">
              <svg class="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3">Traditional Funeral Services</h3>
              <p class="text-gray-700">Complete funeral arrangements including viewings, ceremonies, and graveside services.</p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="h-48 bg-shothodzo-purple-light flex items-center justify-center">
              <svg class="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3">Cremation Services</h3>
              <p class="text-gray-700">Simple, direct cremation in conjunction with memorial services.</p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="h-48 bg-shothodzo-green flex items-center justify-center">
              <svg class="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3">Pre-Planning & Pre-Arranged Funerals</h3>
              <p class="text-gray-700">Plan ahead for peace of mind with our pre-planning services.</p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="h-48 bg-shothodzo-purple flex items-center justify-center">
              <svg class="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3">Memorial Services</h3>
              <p class="text-gray-700">Celebrate a loved one's life with a personalized memorial service.</p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="h-48 bg-shothodzo-green-dark flex items-center justify-center">
              <svg class="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3">Graveside Services</h3>
              <p class="text-gray-700">Intimate graveside ceremonies for final farewells.</p>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="h-48 bg-shothodzo-purple-dark flex items-center justify-center">
              <svg class="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3">Transportation & Repatriation</h3>
              <p class="text-gray-700">National and international transportation and repatriation services.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-gray-900 mb-12">
          Shothodzo Funeral Services - Compassionate Care in Your Time of Need
        </h2>
        <div class="grid grid-cols-3 gap-6">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-shothodzo-green-light rounded-full flex items-center justify-center mr-3">
                <span class="text-white font-bold text-lg">{{ testimonial.initials }}</span>
              </div>
              <div>
                <p class="font-semibold text-gray-900">{{ testimonial.name }}</p>
                <p class="text-sm text-gray-600">{{ testimonial.location }}</p>
              </div>
            </div>
            <div class="flex mb-3">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-700 italic">"{{ testimonial.quote }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="glass-dark text-white py-8" style="background-color: rgba(5, 150, 105, 0.95);">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <p>That's why SHOTHODZO is a 'mutual society' based on a shared value business model.</p>
          <button class="btn-secondary">LEARN MORE ABOUT US</button>
        </div>
        <div class="mt-8 pt-8 border-t border-shothodzo-green-light text-sm text-center">
          <p class="mt-2">For 24-hour Shothodzo funeral services assistance, dial <strong class="text-2xl">0861 28 26 21</strong></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const testimonials = [
  {
    initials: 'ER',
    name: 'Emily R.',
    location: 'Johannesburg, SA',
    quote: 'The compassion and professionalism shown by Shothodzo during our difficult time was exceptional. They truly cared about honoring our loved one.'
  },
  {
    initials: 'JM',
    name: 'James M.',
    location: 'Cape Town, SA',
    quote: 'Shothodzo made the entire process seamless and respectful. Their attention to detail and personalized service meant everything to our family.'
  },
  {
    initials: 'SL',
    name: 'Sarah L.',
    location: 'Durban, SA',
    quote: 'We are so grateful for the support and guidance provided. The team was available 24/7 and helped us through every step with dignity.'
  },
  {
    initials: 'DT',
    name: 'David T.',
    location: 'Pretoria, SA',
    quote: 'The mutual society model means we actually benefit from being members. The FREE funeral benefits are a true blessing for our family.'
  },
  {
    initials: 'PM',
    name: 'Patricia M.',
    location: 'Port Elizabeth, SA',
    quote: 'Professional, compassionate, and trustworthy. Shothodzo exceeded our expectations in every way during such a difficult time.'
  },
  {
    initials: 'RK',
    name: 'Robert K.',
    location: 'Bloemfontein, SA',
    quote: 'The shared value approach is remarkable. We feel like owners, not just customers. The benefits we receive are real and meaningful.'
  }
]
</script>
