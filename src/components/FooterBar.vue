<template>
  <footer class="bg-[#0A0A0F] border-t border-white/5 pt-16 pb-8 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <RouterLink to="/" class="flex items-center gap-3 mb-5">
            <div
              class="w-10 h-10 rounded-xl btn-gold flex items-center justify-center font-black shadow-lg shadow-[rgba(201,168,76,0.3)]"
            >
              B
            </div>
            <span class="font-black text-white text-xl">BookingHub</span>
          </RouterLink>
          <p class="text-gray-500 text-sm leading-relaxed mb-6">
            A unified platform for booking hotels, restaurants and events. Built
            as a diploma project at Ala-Too International University.
          </p>
          <div class="flex gap-3">
            <a
              href="http://localhost:8001/api/docs/"
              target="_blank"
              class="flex items-center gap-2 px-3 py-2 bg-[#111118] border border-white/5 rounded-xl text-gray-500 hover:text-[#C9A84C] hover:border-[rgba(201,168,76,0.2)] transition-all text-xs font-medium"
            >
              <svg
                class="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              API Docs
            </a>
            <a
              href="http://localhost:8001/admin/"
              target="_blank"
              class="flex items-center gap-2 px-3 py-2 bg-[#111118] border border-white/5 rounded-xl text-gray-500 hover:text-[#C9A84C] hover:border-[rgba(201,168,76,0.2)] transition-all text-xs font-medium"
            >
              <svg
                class="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Admin
            </a>
          </div>
        </div>

        <!-- Explore -->
        <div>
          <h4
            class="text-white font-black text-sm uppercase tracking-widest mb-5"
          >
            Explore
          </h4>
          <ul class="space-y-3">
            <li v-for="link in exploreLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="flex items-center gap-2 text-gray-500 hover:text-[#C9A84C] transition-all text-sm group"
              >
                <svg
                  class="w-3.5 h-3.5 text-gray-700 group-hover:text-[#C9A84C] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="link.icon"
                  />
                </svg>
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Account -->
        <div>
          <h4
            class="text-white font-black text-sm uppercase tracking-widest mb-5"
          >
            Account
          </h4>
          <ul class="space-y-3">
            <li v-for="link in accountLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="flex items-center gap-2 text-gray-500 hover:text-[#C9A84C] transition-all text-sm group"
              >
                <svg
                  class="w-3.5 h-3.5 text-gray-700 group-hover:text-[#C9A84C] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    :d="link.icon"
                  />
                </svg>
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Tech Stack -->
        <div>
          <h4
            class="text-white font-black text-sm uppercase tracking-widest mb-5"
          >
            Built With
          </h4>
          <div class="space-y-2">
            <div
              v-for="tech in techStack"
              :key="tech.name"
              class="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
            >
              <span class="text-gray-400 text-xs font-medium">{{
                tech.name
              }}</span>
              <span class="text-gray-600 text-xs">{{ tech.role }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats bar -->
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-b border-white/5 mb-8"
      >
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <p class="text-[#C9A84C] text-2xl font-black mb-1">
            {{ stat.value }}
          </p>
          <p class="text-gray-600 text-xs uppercase tracking-wider">
            {{ stat.label }}
          </p>
        </div>
      </div>

      <!-- Bottom -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-3">
          <div
            class="w-6 h-6 rounded-lg btn-gold flex items-center justify-center font-black text-xs"
          >
            B
          </div>
          <p class="text-gray-600 text-sm">
            © 2025 BookingHub — Diploma Project
          </p>
        </div>
        <div class="flex items-center gap-2 text-gray-600 text-sm">
          <svg
            class="w-4 h-4 text-[#C9A84C]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
          </svg>
          Yusupova Zhasmin · COM-22 · Ala-Too International University
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const exploreLinks = [
  {
    to: "/",
    label: "Home",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    to: "/hotels",
    label: "Hotels",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    to: "/restaurants",
    label: "Restaurants",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13",
  },
  {
    to: "/events",
    label: "Events",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    to: "/map",
    label: "Map View",
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  {
    to: "/search",
    label: "Search",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    to: "/about",
    label: "About",
    icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const accountLinks = [
  {
    to: "/login",
    label: "Sign In",
    icon: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1",
  },
  {
    to: "/register",
    label: "Create Account",
    icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
  },
  {
    to: "/profile",
    label: "My Profile",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    to: "/wishlist",
    label: "Wishlist",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
];

const techStack = [
  { name: "Django 6.0", role: "Backend" },
  { name: "Vue.js 3", role: "Frontend" },
  { name: "REST Framework", role: "API" },
  { name: "Tailwind CSS", role: "Styling" },
  { name: "SQLite", role: "Database" },
  { name: "JWT", role: "Auth" },
];

const stats = [
  { value: "1,200+", label: "Hotels" },
  { value: "850+", label: "Restaurants" },
  { value: "400+", label: "Events" },
  { value: "50k+", label: "Guests" },
];
</script>
