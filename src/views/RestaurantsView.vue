<template>
  <div class="min-h-screen bg-[#0A0A0F] pt-24 pb-20 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="mb-12">
        <p
          class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3"
        >
          Discover
        </p>
        <h1 class="text-5xl font-black text-white mb-2">Restaurants</h1>
        <p class="text-gray-500">
          Exceptional dining experiences curated for you
        </p>
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
            placeholder="Search restaurants..."
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
        <select
          v-model="cuisine"
          class="bg-[#1A1A24] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none"
        >
          <option value="">All cuisines</option>
          <option>Asian</option>
          <option>European</option>
          <option>Central Asian</option>
          <option>Italian</option>
          <option>Japanese</option>
        </select>
        <select
          v-model="sortBy"
          class="bg-[#1A1A24] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none"
        >
          <option value="">Sort by</option>
          <option value="rating">Top Rated</option>
          <option value="price_asc">Price: Low to High</option>
        </select>
      </div>
      <p v-if="!loading" class="text-gray-500 text-sm mb-6">
        <span class="text-white font-semibold">{{ filtered.length }}</span>
        restaurants found
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 class="text-white text-xl font-bold mb-2">No restaurants found</h3>
        <a
          href="http://localhost:8001/admin"
          target="_blank"
          class="px-6 py-3 btn-gold rounded-xl text-sm font-bold inline-block mt-4 shine"
          >Open Admin Panel</a
        >
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RouterLink
          v-for="r in filtered"
          :key="r.id"
          :to="`/detail/restaurant/${r.id}`"
          class="group bg-[#111118] border border-white/5 rounded-2xl overflow-hidden card-hover cursor-pointer block"
        >
          <div class="relative aspect-video overflow-hidden">
            <img
              :src="
                r.image ||
                'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80'
              "
              :alt="r.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-[#111118]/80 via-transparent to-transparent"
            ></div>
            <div class="absolute top-4 left-4">
              <span
                class="bg-orange-500/90 text-white text-xs font-black px-3 py-1 rounded-full"
                >{{ r.cuisine || "Restaurant" }}</span
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
                r.rating || "4.8"
              }}</span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="font-black text-white text-xl mb-1 line-clamp-1">
              {{ r.name }}
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
                />
              </svg>
              {{ r.city }}
            </div>
            <p class="text-gray-600 text-xs mb-4">
              {{ r.opening_time || "10:00" }} — {{ r.closing_time || "23:00" }}
            </p>
            <div class="flex justify-between items-center">
              <div>
                <span class="text-[#C9A84C] text-2xl font-black"
                  >${{ r.price_range || "25" }}</span
                ><span class="text-gray-600 text-xs ml-1">/person</span>
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
const restaurants = ref([]);
const loading = ref(true);
const search = ref("");
const city = ref("");
const cuisine = ref("");
const sortBy = ref("");
const filtered = computed(() => {
  let list = [...restaurants.value];
  if (search.value)
    list = list.filter((r) =>
      r.name.toLowerCase().includes(search.value.toLowerCase())
    );
  if (city.value)
    list = list.filter((r) =>
      r.city?.toLowerCase().includes(city.value.toLowerCase())
    );
  if (cuisine.value)
    list = list.filter((r) =>
      r.cuisine?.toLowerCase().includes(cuisine.value.toLowerCase())
    );
  if (sortBy.value === "rating")
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  if (sortBy.value === "price_asc")
    list.sort((a, b) => (a.price_range || 0) - (b.price_range || 0));
  return list;
});
onMounted(async () => {
  try {
    const res = await api.get("/restaurants/");
    restaurants.value = res.data.results || res.data;
  } catch {
    restaurants.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
