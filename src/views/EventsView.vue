<template>
  <div class="min-h-screen bg-[#0A0A0F] pt-24 pb-20 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="mb-12">
        <p
          class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3"
        >
          Discover
        </p>
        <h1 class="text-5xl font-black text-white mb-2">Events</h1>
        <p class="text-gray-500">Unforgettable experiences waiting for you</p>
      </div>
      <div
        class="bg-[#111118] border border-white/5 rounded-2xl p-4 mb-10 flex flex-wrap gap-3"
      >
        <div
          class="flex-1 min-w-48 flex items-center gap-2 bg-[#1A1A24] border border-white/10 rounded-xl px-4 py-3"
        >
          <svg
            class="w-4 h-4 text-gray-500"
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
            v-model="search"
            type="text"
            placeholder="Search events..."
            class="bg-transparent text-white text-sm w-full focus:outline-none placeholder-gray-600"
          />
        </div>
        <div
          class="flex items-center gap-2 bg-[#1A1A24] border border-white/10 rounded-xl px-4 py-3 w-40"
        >
          <svg
            class="w-4 h-4 text-gray-500"
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
          <input
            v-model="city"
            type="text"
            placeholder="City..."
            class="bg-transparent text-white text-sm w-full focus:outline-none placeholder-gray-600"
          />
        </div>
        <div
          class="flex items-center gap-2 bg-[#1A1A24] border border-white/10 rounded-xl px-4 py-3"
        >
          <svg
            class="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <input
            v-model="dateFilter"
            type="date"
            class="bg-transparent text-white text-sm focus:outline-none"
          />
        </div>
        <select
          v-model="sortBy"
          class="bg-[#1A1A24] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none"
        >
          <option value="">Sort by</option>
          <option value="date">By Date</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
      <p v-if="!loading" class="text-gray-500 text-sm mb-6">
        <span class="text-white font-semibold">{{ filtered.length }}</span>
        events found
      </p>
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="rounded-2xl overflow-hidden">
          <div class="skeleton h-52"></div>
          <div class="bg-[#111118] p-5 space-y-3 rounded-b-2xl">
            <div class="skeleton h-4 rounded w-3/4"></div>
            <div class="skeleton h-3 rounded w-1/2"></div>
          </div>
        </div>
      </div>
      <div
        v-else-if="filtered.length === 0"
        class="text-center py-24 bg-[#111118] border border-white/5 rounded-2xl"
      >
        <svg
          class="w-16 h-16 text-gray-700 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 class="text-white text-xl font-bold mb-2">No events found</h3>
        <a
          href="http://localhost:8001/admin"
          target="_blank"
          class="px-6 py-3 btn-gold rounded-xl text-sm font-bold inline-block mt-4 shine"
          >Open Admin Panel</a
        >
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RouterLink
          v-for="event in filtered"
          :key="event.id"
          :to="`/detail/event/${event.id}`"
          class="group bg-[#111118] border border-white/5 rounded-2xl overflow-hidden card-hover cursor-pointer block"
        >
          <div class="relative aspect-video overflow-hidden">
            <img
              :src="
                event.image ||
                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80'
              "
              :alt="event.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-[#111118]/80 via-transparent to-transparent"
            ></div>
            <div class="absolute top-4 left-4">
              <span
                class="bg-purple-600/90 text-white text-xs font-black px-3 py-1 rounded-full"
                >Event</span
              >
            </div>
            <div
              class="absolute top-4 right-4 bg-black/60 backdrop-blur rounded-lg px-2 py-1 flex items-center gap-1"
            >
              <svg
                class="w-3 h-3 text-[#C9A84C]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <span class="text-white text-xs font-bold">{{
                event.rating || "4.8"
              }}</span>
            </div>
            <div v-if="event.available_seats" class="absolute bottom-4 left-4">
              <span
                class="bg-purple-500/80 text-white text-xs px-2 py-1 rounded-lg"
                >{{ event.available_seats }} seats</span
              >
            </div>
          </div>
          <div class="p-6">
            <h3 class="font-black text-white text-xl mb-1 line-clamp-1">
              {{ event.name }}
            </h3>
            <div class="flex items-center gap-1 text-gray-500 text-sm mb-1">
              <svg
                class="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                /></svg
              >{{ event.city }}
            </div>
            <div class="flex items-center gap-1 text-gray-500 text-sm mb-4">
              <svg
                class="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                /></svg
              >{{ formatDate(event.date) }}
            </div>
            <div class="flex justify-between items-center">
              <div>
                <span class="text-[#C9A84C] text-2xl font-black"
                  >${{ event.price }}</span
                ><span class="text-gray-600 text-xs ml-1">/ticket</span>
              </div>
              <span
                class="flex items-center gap-1 text-[#C9A84C] text-sm font-semibold group-hover:gap-2 transition-all"
                >View Details<svg
                  class="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  /></svg
              ></span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../api";
const events = ref([]);
const loading = ref(true);
const search = ref("");
const city = ref("");
const dateFilter = ref("");
const sortBy = ref("");
const filtered = computed(() => {
  let list = [...events.value];
  if (search.value)
    list = list.filter((e) =>
      e.name.toLowerCase().includes(search.value.toLowerCase())
    );
  if (city.value)
    list = list.filter((e) =>
      e.city?.toLowerCase().includes(city.value.toLowerCase())
    );
  if (dateFilter.value)
    list = list.filter((e) => e.date?.startsWith(dateFilter.value));
  if (sortBy.value === "date")
    list.sort((a, b) => new Date(a.date) - new Date(b.date));
  if (sortBy.value === "price_asc") list.sort((a, b) => a.price - b.price);
  if (sortBy.value === "rating")
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  return list;
});
const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "TBD";
onMounted(async () => {
  try {
    const res = await api.get("/events/");
    events.value = res.data.results || res.data;
  } catch {
    events.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
