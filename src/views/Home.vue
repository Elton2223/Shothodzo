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
    <nav class="glass-nav bg-shothodzo-green-dark/90 text-white sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <router-link to="/" class="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
          <div class="w-[350px] h-[150px] bg-white rounded-lg flex items-center justify-center p-2 shadow-md overflow-hidden">
            <img src="/images/Shothodzo.jpg" alt="Shothodzo Logo" class="w-full h-full object-cover rounded" />
          </div>
        </router-link>
        <div class="flex gap-6 items-center">
          <router-link to="/" class="text-sm font-medium hover:text-shothodzo-green-light transition-colors">BENEFIT WITH SHOTHODZO</router-link>
          <a href="#" class="text-sm font-medium hover:text-shothodzo-green-light transition-colors">FUNERAL SERVICE</a>
          <a href="#" class="text-sm font-medium hover:text-shothodzo-green-light transition-colors">INSURE WITH SHOTHODZO</a>
          <a href="#" class="text-sm font-medium hover:text-shothodzo-green-light transition-colors">PAY YOUR PREMIUM</a>
          <a href="#" class="text-sm font-medium hover:text-shothodzo-green-light transition-colors">HOW TO CLAIM</a>
          <router-link to="/login" class="btn-secondary text-sm font-medium">LOGIN</router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative py-12">
      <div class="grid grid-cols-3 gap-6 container mx-auto px-4">
        <div class="col-span-2 neumorphic h-96 flex items-center justify-center p-8 rounded-2xl">
          <div class="text-center">
            <h2 class="text-4xl font-bold text-shothodzo-purple mb-4">Protecting Your Family's Future</h2>
            <p class="text-xl text-gray-700 mb-6">Comprehensive funeral services with care and compassion</p>
            <router-link to="/register" class="btn-primary text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-shadow">GET STARTED</router-link>
          </div>
        </div>
        <div class="col-span-1 glass-dark bg-shothodzo-green-dark/80 text-white p-8 flex flex-col justify-center rounded-lg">
          <h3 class="text-2xl font-bold mb-4">SHOTHODZO DECLARES</h3>
          <h2 class="text-4xl font-bold mb-6">MEMBER BENEFITS</h2>
          <p class="mb-6">We share our profits with our loyal members through FREE funeral benefits and special member services.</p>
          <button class="btn-secondary w-full shadow-lg hover:shadow-xl transition-shadow">LEARN MORE</button>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center glass-card bg-white/70 p-8 rounded-2xl">
          <p class="text-lg text-gray-800 mb-4">
            <strong class="text-shothodzo-green">SHOTHODZO</strong> is a mutual society, which means that all our surplus profits are given back to our loyal members (policyholders) who choose to insure or save with SHOTHODZO.
          </p>
          <p class="text-lg text-gray-800">
            We share our profits with our members in the form of <strong class="text-shothodzo-green">FREE</strong> funeral benefits* from Shothodzo Funeral Service as well as other special member benefits*.
          </p>
        </div>
      </div>
    </section>

    <!-- Feature Blocks -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-3 gap-6">
          <div class="glass-card bg-white/80 border-t-4 border-shothodzo-green p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <div class="text-shothodzo-green mb-4">
              <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-shothodzo-green mb-2">FREE FUNERAL BENEFITS & TRANSPORT*</h3>
            <p class="text-gray-700">Comprehensive funeral coverage with transportation services included for all members.</p>
          </div>

          <div class="glass-card bg-white/80 border-t-4 border-shothodzo-green p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <div class="text-shothodzo-green mb-4">
              <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-shothodzo-green mb-2">CASHBACK FUNERAL INSURANCE</h3>
            <p class="text-gray-700">Get cashback benefits on your funeral insurance premiums while protecting your family.</p>
          </div>

          <div class="glass-card bg-white/80 border-t-4 border-shothodzo-green p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <div class="text-shothodzo-green mb-4">
              <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-shothodzo-green mb-2">NATIONAL AND INTERNATIONAL REPATRIATION</h3>
            <p class="text-gray-700">Comprehensive repatriation services for both national and international needs.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="glass-dark bg-shothodzo-green-dark/90 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <p>That's why SHOTHODZO is a 'mutual society' based on a shared value business model.</p>
          <button class="btn-secondary">LEARN MORE ABOUT US</button>
        </div>
        <div class="mt-8 pt-8 border-t border-shothodzo-green-light text-sm text-center">
          <p>SHOTHODZO Mutual Assurance Society is a licensed life insurer and authorised Financial Services Provider.</p>
          <p class="mt-2">For 24-hour funeral service assistance, dial <strong class="text-2xl">0861 28 26 21</strong></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>

