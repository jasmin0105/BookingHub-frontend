import WishlistButton from '../components/WishlistButton.vue'
<template>
  <div class="min-h-screen bg-[#0A0A0F] pt-24 pb-20 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="mb-12">
        <p
          class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3"
        >
          Discover
        </p>
        <h1 class="text-5xl font-black text-white mb-2">Hotels</h1>
        <p class="text-gray-500">
          Find your perfect stay from our curated collection
        </p>
      </div>

      <div
        class="bg-[#111118] border border-white/5 rounded-2xl p-4 mb-10 flex flex-wrap gap-3 items-center"
      >
        <div
          class="flex-1 min-w-48 flex items-center gap-2 bg-[#1A1A24] border border-white/10 rounded-xl px-4 py-3"
        >
          <svg
            class="w-4 h-4 text-gray-500 flex-shrink-0"
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
            placeholder="Search hotels..."
            class="bg-transparent text-white text-sm w-full focus:outline-none placeholder-gray-600"
          />
        </div>
        <div
          class="flex items-center gap-2 bg-[#1A1A24] border border-white/10 rounded-xl px-4 py-3 w-40"
        >
          <svg
            class="w-4 h-4 text-gray-500 flex-shrink-0"
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
          v-model="sortBy"
          class="bg-[#1A1A24] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[#C9A84C] transition-colors focus:outline-none"
        >
          <option value="">Sort by</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
        <div
          class="flex items-center gap-2 bg-[#1A1A24] border border-white/10 rounded-xl px-4 py-3"
        >
          <span class="text-gray-500 text-sm">Max $</span>
          <input
            v-model="maxPrice"
            type="number"
            placeholder="500"
            class="bg-transparent text-white text-sm w-20 focus:outline-none placeholder-gray-600"
          />
        </div>
      </div>

      <p v-if="!loading" class="text-gray-500 text-sm mb-6">
        <span class="text-white font-semibold">{{ filtered.length }}</span>
        hotels found
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <h3 class="text-white text-xl font-bold mb-2">No hotels found</h3>
        <p class="text-gray-500 mb-6 text-sm">
          Add hotels from the Django admin panel
        </p>
        <a
          href="http://localhost:8001/admin"
          target="_blank"
          class="px-6 py-3 btn-gold rounded-xl text-sm font-bold inline-block shine"
          >Open Admin Panel</a
        >
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RouterLink
          v-for="hotel in filtered"
          :key="hotel.id"
          :to="`/detail/hotel/${hotel.id}`"
          class="group bg-[#111118] border border-white/5 rounded-2xl overflow-hidden card-hover cursor-pointer block"
        >
          <div class="relative aspect-video overflow-hidden">
            <img
              :src="
                hotel.image ||
                'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80'
              "
              :alt="hotel.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-[#111118]/80 via-transparent to-transparent"
            ></div>
            <div class="absolute top-4 left-4">
              <span
                class="bg-[rgba(201,168,76,0.9)] text-black text-xs font-black px-3 py-1 rounded-full"
                >Hotel</span
              >
            </div>
            <div class="absolute top-4 right-4">
              <WishlistButton type="hotel" :item-id="hotel.id" />
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
                hotel.rating || "4.8"
              }}</span>
            </div>
            <div v-if="hotel.available_rooms" class="absolute bottom-4 left-4">
              <span
                class="bg-green-500/80 text-white text-xs px-2 py-1 rounded-lg"
                >{{ hotel.available_rooms }} rooms left</span
              >
            </div>
          </div>
          <div class="p-6">
            <h3 class="font-black text-white text-xl mb-1 line-clamp-1">
              {{ hotel.name }}
            </h3>
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              {{ hotel.city }}
            </div>
            <div class="flex justify-between items-center">
              <div>
                <span class="text-[#C9A84C] text-2xl font-black"
                  >${{ hotel.price_per_night }}</span
                ><span class="text-gray-600 text-xs ml-1">/night</span>
              </div>
              <span
                class="flex items-center gap-1 text-[#C9A84C] text-sm font-semibold group-hover:gap-2 transition-all"
              >
                View Details
                <svg
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
                  />
                </svg>
              </span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../api";

const route = useRoute();
const hotels = ref([]);
const loading = ref(true);
const search = ref(route.query.q || "");
const city = ref("");
const sortBy = ref("");
const maxPrice = ref("");

const filtered = computed(() => {
  let list = [...hotels.value];
  if (search.value)
    list = list.filter(
      (h) =>
        h.name.toLowerCase().includes(search.value.toLowerCase()) ||
        h.city?.toLowerCase().includes(search.value.toLowerCase())
    );
  if (city.value)
    list = list.filter((h) =>
      h.city?.toLowerCase().includes(city.value.toLowerCase())
    );
  if (maxPrice.value)
    list = list.filter((h) => h.price_per_night <= Number(maxPrice.value));
  if (sortBy.value === "price_asc")
    list.sort((a, b) => a.price_per_night - b.price_per_night);
  if (sortBy.value === "price_desc")
    list.sort((a, b) => b.price_per_night - a.price_per_night);
  if (sortBy.value === "rating")
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  return list;
});

onMounted(async () => {
  try {
    const res = await api.get("/hotels/");
    hotels.value = res.data.results || res.data;
  } catch {
    hotels.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
