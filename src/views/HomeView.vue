<template>
  <div class="min-h-screen bg-[#0A0A0F]">
    <!-- HERO -->
    <section
      class="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <!-- Background -->
      <div class="absolute inset-0">
        <div
          class="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#111118] to-[#0A0A0F]"
        ></div>
        <div
          class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style="background: radial-gradient(circle, #c9a84c, transparent)"
        ></div>
        <div
          class="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
          style="background: radial-gradient(circle, #c9a84c, transparent)"
        ></div>
        <!-- Grid -->
        <div
          class="absolute inset-0 opacity-[0.03]"
          style="
            background-image: linear-gradient(
                rgba(201, 168, 76, 0.5) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(201, 168, 76, 0.5) 1px,
                transparent 1px
              );
            background-size: 60px 60px;
          "
        ></div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div
          class="inline-flex items-center gap-2 bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] rounded-full px-5 py-2 mb-8 fade-up"
          style="animation-delay: 0.1s"
        >
          <div class="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse"></div>
          <span
            class="text-[#C9A84C] text-xs font-semibold tracking-wider uppercase"
            >Kyrgyzstan's #1 Booking Platform</span
          >
        </div>

        <h1
          class="text-6xl md:text-8xl font-black text-white leading-none mb-6 fade-up"
          style="animation-delay: 0.2s"
        >
          Book Your
          <span
            class="block"
            style="
              background: linear-gradient(135deg, #c9a84c, #e8c96d, #c9a84c);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            "
          >
            Perfect Stay
          </span>
        </h1>

        <p
          class="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed fade-up"
          style="animation-delay: 0.3s"
        >
          Hotels, restaurants and events — all in one place. Discover the best
          of Bishkek and beyond.
        </p>

        <!-- Search Bar -->
        <div
          class="relative max-w-2xl mx-auto mb-10 fade-up"
          style="animation-delay: 0.4s"
        >
          <div
            class="flex items-center bg-[#111118] border border-white/10 rounded-2xl p-2 gap-2 focus-within:border-[rgba(201,168,76,0.4)] transition-all shadow-2xl"
          >
            <div class="flex items-center gap-3 flex-1 px-4">
              <svg
                class="w-5 h-5 text-gray-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                v-model="searchQuery"
                @keyup.enter="goSearch"
                type="text"
                placeholder="Search hotels, restaurants, events..."
                class="bg-transparent text-white placeholder-gray-600 text-sm flex-1 outline-none py-2"
              />
            </div>
            <button
              @click="goSearch"
              class="px-6 py-3 btn-gold rounded-xl font-bold text-sm shine flex-shrink-0"
            >
              Search
            </button>
          </div>
        </div>

        <!-- Category Pills -->
        <div
          class="flex items-center justify-center gap-3 flex-wrap fade-up"
          style="animation-delay: 0.5s"
        >
          <RouterLink
            v-for="cat in categories"
            :key="cat.to"
            :to="cat.to"
            class="flex items-center gap-2 px-5 py-2.5 bg-[#111118] border border-white/5 rounded-xl text-gray-400 hover:text-white hover:border-[rgba(201,168,76,0.3)] transition-all text-sm font-medium group"
          >
            <svg
              class="w-4 h-4 text-[#C9A84C]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                :d="cat.icon"
              />
            </svg>
            {{ cat.label }}
            <span class="text-xs text-gray-600 group-hover:text-gray-400">{{
              cat.count
            }}</span>
          </RouterLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-700"
      >
        <span class="text-xs uppercase tracking-widest">Scroll</span>
        <div
          class="w-px h-12 bg-gradient-to-b from-[#C9A84C] to-transparent"
        ></div>
      </div>
    </section>

    <!-- STATS -->
    <section class="py-16 px-6 border-y border-white/5 bg-[#111118]">
      <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="(stat, i) in platformStats"
          :key="stat.label"
          class="text-center scroll-fade"
          :style="`animation-delay: ${i * 0.1}s`"
        >
          <p
            class="text-4xl md:text-5xl font-black mb-2"
            style="
              background: linear-gradient(135deg, #c9a84c, #e8c96d);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            "
          >
            {{ stat.value }}
          </p>
          <p class="text-gray-600 text-sm uppercase tracking-wider">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </section>

    <!-- TRENDING HOTELS -->
    <section class="py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-end justify-between mb-10 scroll-fade">
          <div>
            <p
              class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2"
            >
              Most Popular
            </p>
            <h2 class="text-4xl font-black text-white">Trending Hotels</h2>
          </div>
          <RouterLink
            to="/hotels"
            class="text-gray-500 hover:text-[#C9A84C] transition-colors text-sm flex items-center gap-1"
          >
            View all
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </RouterLink>
        </div>

        <div v-if="loadingHotels" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="skeleton h-72 rounded-2xl"></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RouterLink
            v-for="(hotel, i) in hotels"
            :key="hotel.id"
            :to="`/detail/hotel/${hotel.id}`"
            class="group bg-[#111118] border border-white/5 rounded-2xl overflow-hidden hover:border-[rgba(201,168,76,0.3)] transition-all duration-300 hover:-translate-y-1 scroll-fade"
            :style="`animation-delay: ${i * 0.1}s`"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                v-if="hotel.image"
                :src="hotel.image"
                :alt="hotel.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                v-else
                class="w-full h-full bg-gradient-to-br from-[#1A1A24] to-[#111118] flex items-center justify-center"
              >
                <svg
                  class="w-12 h-12 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              ></div>
              <div
                class="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1"
              >
                <svg
                  class="w-3 h-3 text-[#C9A84C]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
                <span class="text-white text-xs font-bold">{{
                  hotel.rating || "4.8"
                }}</span>
              </div>
              <div class="absolute bottom-3 left-3">
                <span
                  class="bg-[rgba(201,168,76,0.9)] text-black text-xs font-black px-2 py-1 rounded-lg"
                >
                  ${{ hotel.price_per_night }}/night
                </span>
              </div>
            </div>
            <div class="p-5">
              <h3
                class="text-white font-black text-lg mb-1 group-hover:text-[#C9A84C] transition-colors"
              >
                {{ hotel.name }}
              </h3>
              <p class="text-gray-500 text-sm flex items-center gap-1">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                {{ hotel.city }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="py-20 px-6 bg-[#111118]">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-14 scroll-fade">
          <p
            class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3"
          >
            Simple Process
          </p>
          <h2 class="text-4xl font-black text-white">How It Works</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="text-center scroll-fade"
            :style="`animation-delay: ${i * 0.15}s`"
          >
            <div
              class="w-16 h-16 rounded-2xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] flex items-center justify-center mx-auto mb-5"
            >
              <svg
                class="w-7 h-7 text-[#C9A84C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  :d="step.icon"
                />
              </svg>
            </div>
            <div class="text-[#C9A84C] text-xs font-black tracking-widest mb-2">
              STEP {{ i + 1 }}
            </div>
            <h3 class="text-white font-black text-lg mb-2">{{ step.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- RESTAURANTS -->
    <section class="py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-end justify-between mb-10 scroll-fade">
          <div>
            <p
              class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2"
            >
              Top Rated
            </p>
            <h2 class="text-4xl font-black text-white">Best Restaurants</h2>
          </div>
          <RouterLink
            to="/restaurants"
            class="text-gray-500 hover:text-[#C9A84C] transition-colors text-sm flex items-center gap-1"
          >
            View all
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </RouterLink>
        </div>
        <div
          v-if="loadingRestaurants"
          class="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div v-for="i in 3" :key="i" class="skeleton h-56 rounded-2xl"></div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RouterLink
            v-for="(r, i) in restaurants"
            :key="r.id"
            :to="`/detail/restaurant/${r.id}`"
            class="group bg-[#111118] border border-white/5 rounded-2xl p-6 hover:border-[rgba(201,168,76,0.3)] transition-all duration-300 hover:-translate-y-1 scroll-fade"
            :style="`animation-delay: ${i * 0.1}s`"
          >
            <div
              class="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4"
            >
              <svg
                class="w-6 h-6 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3
              class="text-white font-black text-lg mb-1 group-hover:text-[#C9A84C] transition-colors"
            >
              {{ r.name }}
            </h3>
            <p class="text-gray-500 text-sm mb-3">{{ r.cuisine_type }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1">
                <svg
                  class="w-3.5 h-3.5 text-[#C9A84C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <span class="text-gray-600 text-xs">{{ r.city }}</span>
              </div>
              <div class="flex">
                <svg
                  v-for="s in 5"
                  :key="s"
                  class="w-3.5 h-3.5"
                  :class="s <= 4 ? 'text-[#C9A84C]' : 'text-gray-700'"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                </svg>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- UPCOMING EVENTS -->
    <section class="py-20 px-6 bg-[#111118]">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-end justify-between mb-10 scroll-fade">
          <div>
            <p
              class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-2"
            >
              Coming Soon
            </p>
            <h2 class="text-4xl font-black text-white">Upcoming Events</h2>
          </div>
          <RouterLink
            to="/events"
            class="text-gray-500 hover:text-[#C9A84C] transition-colors text-sm flex items-center gap-1"
          >
            View all
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </RouterLink>
        </div>
        <div v-if="loadingEvents" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="i in 2" :key="i" class="skeleton h-40 rounded-2xl"></div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RouterLink
            v-for="(event, i) in events"
            :key="event.id"
            :to="`/detail/event/${event.id}`"
            class="group bg-[#0A0A0F] border border-white/5 rounded-2xl p-6 flex gap-5 hover:border-[rgba(201,168,76,0.3)] transition-all duration-300 scroll-fade"
            :style="`animation-delay: ${i * 0.1}s`"
          >
            <div
              class="w-16 h-16 rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-col items-center justify-center flex-shrink-0"
            >
              <span class="text-purple-400 font-black text-lg leading-none">{{
                new Date(event.date).getDate()
              }}</span>
              <span class="text-purple-500 text-xs uppercase">{{
                new Date(event.date).toLocaleString("en", { month: "short" })
              }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="text-white font-black text-lg mb-1 group-hover:text-[#C9A84C] transition-colors line-clamp-1"
              >
                {{ event.name }}
              </h3>
              <p class="text-gray-500 text-sm mb-2">{{ event.venue }}</p>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 text-xs">{{ event.city }}</span>
                <span class="text-[#C9A84C] font-black text-sm"
                  >${{ event.price }}</span
                >
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.03)] to-transparent"
      ></div>
      <div class="max-w-3xl mx-auto text-center scroll-fade">
        <h2 class="text-5xl font-black text-white mb-6">Ready to Explore?</h2>
        <p class="text-gray-500 text-lg mb-10">
          Join thousands of travelers discovering the best of Kyrgyzstan
        </p>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <RouterLink
            to="/register"
            class="px-8 py-4 btn-gold rounded-xl font-black shine text-base"
          >
            Get Started Free
          </RouterLink>
          <RouterLink
            to="/map"
            class="px-8 py-4 border border-white/10 text-white rounded-xl font-bold text-base hover:border-[rgba(201,168,76,0.3)] transition-all flex items-center gap-2"
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
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            View Map
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import api from "../api";

const router = useRouter();
const searchQuery = ref("");
const hotels = ref([]);
const restaurants = ref([]);
const events = ref([]);
const loadingHotels = ref(true);
const loadingRestaurants = ref(true);
const loadingEvents = ref(true);
const totalBookings = ref(0);

const goSearch = () => {
  if (searchQuery.value.trim())
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`);
};

const categories = computed(() => [
  {
    to: "/hotels",
    label: "Hotels",
    count: hotels.value.length,
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    to: "/restaurants",
    label: "Restaurants",
    count: restaurants.value.length,
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13",
  },
  {
    to: "/events",
    label: "Events",
    count: events.value.length,
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    to: "/map",
    label: "Map View",
    count: "",
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
]);

const platformStats = computed(() => [
  { value: hotels.value.length + "+", label: "Hotels" },
  { value: restaurants.value.length + "+", label: "Restaurants" },
  { value: events.value.length + "+", label: "Events" },
  { value: "24/7", label: "Support" },
]);

const steps = [
  {
    title: "Search & Discover",
    desc: "Find hotels, restaurants and events using our smart search and map view.",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    title: "Book Instantly",
    desc: "Select your dates, choose your preferences and confirm your booking in seconds.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Enjoy Your Stay",
    desc: "Receive confirmation, manage bookings from your profile and enjoy the experience.",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
];

// Scroll animations
const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document
    .querySelectorAll(".scroll-fade")
    .forEach((el) => observer.observe(el));
};

onMounted(async () => {
  try {
    const [h, r, e] = await Promise.all([
      api.get("/hotels/"),
      api.get("/restaurants/"),
      api.get("/events/"),
    ]);
    hotels.value = (h.data.results || h.data).slice(0, 3);
    restaurants.value = (r.data.results || r.data).slice(0, 3);
    events.value = (e.data.results || e.data).slice(0, 4);
  } catch {
  } finally {
    loadingHotels.value = false;
    loadingRestaurants.value = false;
    loadingEvents.value = false;
  }
  setTimeout(observeElements, 100);
});
</script>

<style scoped>
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeUp 0.7s ease forwards;
}
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.scroll-fade {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.scroll-fade.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
