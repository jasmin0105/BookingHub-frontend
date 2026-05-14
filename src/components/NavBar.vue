cd ~/Desktop/BookingHub_frontend cat > src/components/NavBar.vue << 'NAVEOF'
<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled
        ? 'bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50'
        : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-3 group">
        <div
          class="w-9 h-9 rounded-xl btn-gold flex items-center justify-center font-black text-sm shadow-lg shadow-[rgba(201,168,76,0.3)] group-hover:shadow-[rgba(201,168,76,0.5)] transition-all"
        >
          B
        </div>
        <span class="font-black text-white text-lg tracking-tight"
          >BookingHub</span
        >
      </RouterLink>

      <div class="hidden md:flex items-center gap-1">
        <RouterLink
          to="/"
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === '/' }"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </RouterLink>
        <RouterLink
          to="/hotels"
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === '/hotels' }"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          Hotels
        </RouterLink>
        <RouterLink
          to="/restaurants"
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === '/restaurants' }"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          Restaurants
        </RouterLink>
        <RouterLink
          to="/events"
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === '/events' }"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Events
        </RouterLink>
        <RouterLink
          to="/tours"
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === '/tours' }"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          Tours
        </RouterLink>
        <RouterLink
          to="/ai-assistant"
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === '/ai-assistant' }"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          AI Assistant
        </RouterLink>


        <RouterLink
          to="/about"
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === '/about' }"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          About
        </RouterLink>
        <RouterLink
          to="/compare"
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === '/compare' }"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Compare
        </RouterLink>
        <RouterLink
          to="/map"
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === '/map' }"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          Map
        </RouterLink>
      </div>

      <div class="hidden md:flex items-center gap-2">
        <RouterLink
          to="/search"
          :class="[
            'flex items-center justify-center w-9 h-9 rounded-xl border transition-all',
            $route.path === '/search'
              ? 'border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)] text-[#C9A84C]'
              : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20',
          ]"
          title="Search"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </RouterLink>
        <template v-if="authStore.isLoggedIn">
          <RouterLink
            to="/wishlist"
            :class="[
              'flex items-center justify-center w-9 h-9 rounded-xl border transition-all',
              $route.path === '/wishlist'
                ? 'border-red-500/30 bg-red-500/10 text-red-400'
                : 'border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/20',
            ]"
            title="Wishlist"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </RouterLink>
          <RouterLink
            to="/profile"
            class="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Profile
          </RouterLink>
          <div class="lang-switcher">
            <button
              v-for="l in langs"
              :key="l"
              @click="setLang(l)"
              :class="['lang-btn', locale === l ? 'lang-active' : '']"
            >
              {{ l.toUpperCase() }}
            </button>
          </div>
          <button
            @click="authStore.logout()"
            class="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-500 hover:text-red-400 transition-all text-sm"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </template>
        <template v-else>
          <RouterLink
            to="/login"
            class="px-4 py-2 rounded-xl text-gray-300 hover:text-white transition-all text-sm font-medium border border-transparent hover:border-white/10"
            >Sign In</RouterLink
          >
          <RouterLink
            to="/register"
            class="px-5 py-2 btn-gold rounded-xl text-sm font-bold shine"
            >Get Started</RouterLink
          >
        </template>
      </div>

      <button
        @click="mobileOpen = !mobileOpen"
        class="md:hidden text-gray-400 hover:text-white transition-colors p-2"
      >
        <svg
          v-if="!mobileOpen"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <transition name="mobile-menu">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-[#0A0A0F]/98 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-1"
      >
        <RouterLink
          v-for="link in mobileLinks"
          :key="link.to"
          :to="link.to"
          @click="mobileOpen = false"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
        >
          <svg
            class="w-5 h-5 text-[#C9A84C]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              :d="link.icon"
            />
          </svg>
          {{ link.label }}
        </RouterLink>
        <div class="border-t border-white/5 pt-3 mt-3 flex gap-3">
          <RouterLink
            v-if="!authStore.isLoggedIn"
            to="/login"
            @click="mobileOpen = false"
            class="flex-1 py-3 text-center border border-white/10 text-white rounded-xl text-sm font-medium"
            >Sign In</RouterLink
          >
          <RouterLink
            v-if="!authStore.isLoggedIn"
            to="/register"
            @click="mobileOpen = false"
            class="flex-1 py-3 text-center btn-gold rounded-xl text-sm font-bold"
            >Get Started</RouterLink
          >
          <RouterLink
            v-if="authStore.isLoggedIn"
            to="/profile"
            @click="mobileOpen = false"
            class="flex-1 py-3 text-center border border-white/10 text-white rounded-xl text-sm font-medium"
            >Profile</RouterLink
          >
          <button
            v-if="authStore.isLoggedIn"
            @click="
              authStore.logout();
              mobileOpen = false;
            "
            class="flex-1 py-3 text-center text-red-400 border border-red-500/20 rounded-xl text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const langs = ["en", "ru", "ky"];
const setLang = (l) => {
  locale.value = l;
  localStorage.setItem("lang", l);
};
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const scrolled = ref(false);
const mobileOpen = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};
onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

const mobileLinks = [
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
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    to: "/events",
    label: "Events",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    to: "/tours",
    label: "Tours",
    },
    {
    to: "/ai-assistant",
    label: "AI Assistant",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
  },
  {
    to: "/about",
    label: "About",
    icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    to: "/compare",
    label: "Compare",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    to: "/map",
    label: "Map",
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
];
</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #9ca3af;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.05);
}
.nav-link-active {
  color: #c9a84c !important;
  background: rgba(201, 168, 76, 0.08) !important;
  border-color: rgba(201, 168, 76, 0.15) !important;
}
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.25s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.lang-switcher {
  display: flex;
  gap: 4px;
  align-items: center;
  margin-right: 8px;
}
.lang-btn {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  border: 0.5px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.2s;
}
.lang-btn:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.3);
}
.lang-active {
  background: rgba(201, 168, 76, 0.15);
  border-color: rgba(201, 168, 76, 0.4);
  color: #c9a84c;
}
</style>
NAVEOF echo "✅ NavBar fixed!"
