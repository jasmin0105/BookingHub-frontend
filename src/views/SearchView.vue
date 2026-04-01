<template>
  <div class="min-h-screen bg-[#0A0A0F] pt-24 pb-20 px-6">
    <div class="max-w-5xl mx-auto">
      <!-- Search Header -->
      <div class="mb-10">
        <p
          class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-4"
        >
          Search
        </p>
        <div class="flex gap-3">
          <div class="flex-1 relative">
            <svg
              class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
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
              v-model="query"
              @input="onInput"
              type="text"
              placeholder="Search hotels, restaurants, events..."
              class="w-full bg-[#111118] border border-white/10 text-white rounded-2xl pl-14 pr-5 py-5 text-base focus:border-[#C9A84C] focus:outline-none transition-colors placeholder-gray-600"
            />
            <button
              v-if="query"
              @click="
                query = '';
                results = null;
              "
              class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
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
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <button
            @click="doSearch"
            class="px-8 py-5 btn-gold rounded-2xl font-bold shine flex items-center gap-2"
          >
            <svg
              class="w-5 h-5"
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
            Search
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="space-y-8">
        <div v-for="i in 3" :key="i">
          <div class="skeleton h-5 rounded w-32 mb-4"></div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="j in 3"
              :key="j"
              class="skeleton h-32 rounded-2xl"
            ></div>
          </div>
        </div>
      </div>

      <!-- Empty state before search -->
      <div v-else-if="!results && !loading" class="text-center py-24">
        <div
          class="w-20 h-20 rounded-2xl bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.1)] flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-10 h-10 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h2 class="text-white font-black text-2xl mb-3">Search BookingHub</h2>
        <p class="text-gray-500 text-sm max-w-sm mx-auto">
          Type a hotel name, city, cuisine, or event to find exactly what you're
          looking for.
        </p>
        <div class="flex flex-wrap justify-center gap-2 mt-6">
          <button
            v-for="tag in suggestions"
            :key="tag"
            @click="
              query = tag;
              doSearch();
            "
            class="px-4 py-2 bg-[#111118] border border-white/5 text-gray-400 rounded-xl text-sm hover:border-[rgba(201,168,76,0.3)] hover:text-white transition-all"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- No results -->
      <div v-else-if="results && results.total === 0" class="text-center py-20">
        <svg
          class="w-14 h-14 text-gray-700 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="text-white font-bold text-xl mb-2">
          No results for "{{ results.query }}"
        </h3>
        <p class="text-gray-500 text-sm">
          Try a different search term or browse our categories
        </p>
      </div>

      <!-- Results -->
      <div v-else-if="results" class="space-y-10">
        <div class="flex items-center gap-3 mb-2">
          <p class="text-white font-bold">
            Results for
            <span class="text-[#C9A84C]">"{{ results.query }}"</span>
          </p>
          <span
            class="bg-[rgba(201,168,76,0.1)] text-[#C9A84C] text-xs font-bold px-3 py-1 rounded-full"
            >{{ results.total }} found</span
          >
        </div>

        <!-- Hotels -->
        <div v-if="results.hotels.length">
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-blue-400"
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
            </div>
            <h2 class="text-white font-black text-lg">Hotels</h2>
            <span class="text-gray-600 text-sm"
              >({{ results.hotels.length }})</span
            >
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RouterLink
              v-for="item in results.hotels"
              :key="item.id"
              :to="`/detail/hotel/${item.id}`"
              class="group bg-[#111118] border border-white/5 rounded-2xl overflow-hidden hover:border-[rgba(201,168,76,0.25)] transition-all"
            >
              <img
                :src="
                  item.image ||
                  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80'
                "
                class="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="p-4">
                <h3 class="text-white font-bold text-sm mb-1 line-clamp-1">
                  {{ item.name }}
                </h3>
                <div class="flex items-center gap-1 text-gray-500 text-xs mb-2">
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
                  {{ item.city }}
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-[#C9A84C] font-black"
                    >${{ item.price
                    }}<span class="text-gray-600 text-xs font-normal"
                      >/night</span
                    ></span
                  >
                  <div class="flex items-center gap-1">
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
                      item.rating
                    }}</span>
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>

        <!-- Restaurants -->
        <div v-if="results.restaurants.length">
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 class="text-white font-black text-lg">Restaurants</h2>
            <span class="text-gray-600 text-sm"
              >({{ results.restaurants.length }})</span
            >
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RouterLink
              v-for="item in results.restaurants"
              :key="item.id"
              :to="`/detail/restaurant/${item.id}`"
              class="group bg-[#111118] border border-white/5 rounded-2xl overflow-hidden hover:border-[rgba(201,168,76,0.25)] transition-all"
            >
              <img
                :src="
                  item.image ||
                  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80'
                "
                class="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="p-4">
                <h3 class="text-white font-bold text-sm mb-1 line-clamp-1">
                  {{ item.name }}
                </h3>
                <div class="flex items-center gap-2 text-gray-500 text-xs mb-2">
                  <span>{{ item.city }}</span>
                  <span
                    v-if="item.cuisine"
                    class="bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full"
                    >{{ item.cuisine }}</span
                  >
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-[#C9A84C] font-black"
                    >${{ item.price
                    }}<span class="text-gray-600 text-xs font-normal"
                      >/person</span
                    ></span
                  >
                  <div class="flex items-center gap-1">
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
                      item.rating
                    }}</span>
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>

        <!-- Events -->
        <div v-if="results.events.length">
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-purple-400"
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
            </div>
            <h2 class="text-white font-black text-lg">Events</h2>
            <span class="text-gray-600 text-sm"
              >({{ results.events.length }})</span
            >
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RouterLink
              v-for="item in results.events"
              :key="item.id"
              :to="`/detail/event/${item.id}`"
              class="group bg-[#111118] border border-white/5 rounded-2xl overflow-hidden hover:border-[rgba(201,168,76,0.25)] transition-all"
            >
              <img
                :src="
                  item.image ||
                  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80'
                "
                class="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="p-4">
                <h3 class="text-white font-bold text-sm mb-1 line-clamp-1">
                  {{ item.name }}
                </h3>
                <div class="flex items-center gap-2 text-gray-500 text-xs mb-2">
                  <span>{{ item.city }}</span>
                  <span v-if="item.date" class="text-gray-600">{{
                    formatDate(item.date)
                  }}</span>
                </div>
                <span class="text-[#C9A84C] font-black"
                  >${{ item.price
                  }}<span class="text-gray-600 text-xs font-normal"
                    >/ticket</span
                  ></span
                >
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api";

const route = useRoute();
const router = useRouter();
const query = ref(route.query.q || "");
const results = ref(null);
const loading = ref(false);
const suggestions = ["Bishkek", "Hotel", "Italian", "Concert", "Spa", "Jazz"];
let debounceTimer = null;

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "";

const doSearch = async () => {
  if (!query.value.trim()) return;
  loading.value = true;
  router.replace({ query: { q: query.value } });
  try {
    const res = await api.get(`/search/?q=${encodeURIComponent(query.value)}`);
    results.value = res.data;
  } catch {
    results.value = null;
  } finally {
    loading.value = false;
  }
};

const onInput = () => {
  clearTimeout(debounceTimer);
  if (query.value.length >= 2) {
    debounceTimer = setTimeout(doSearch, 400);
  }
};

onMounted(() => {
  if (query.value) doSearch();
});
</script>
