<template>
  <div class="min-h-screen bg-[#0A0A0F] pt-24 pb-20 px-6">
    <div class="max-w-5xl mx-auto">
      <div class="mb-10">
        <p
          class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3"
        >
          Saved
        </p>
        <h1 class="text-5xl font-black text-white mb-2">My Wishlist</h1>
        <p class="text-gray-500">Places and experiences you want to visit</p>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="rounded-2xl overflow-hidden">
          <div class="skeleton h-44"></div>
          <div class="bg-[#111118] p-5 space-y-3">
            <div class="skeleton h-4 rounded w-3/4"></div>
            <div class="skeleton h-3 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <div
        v-else-if="items.length === 0"
        class="text-center py-24 bg-[#111118] border border-white/5 rounded-2xl"
      >
        <div
          class="w-16 h-16 rounded-2xl bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.1)] flex items-center justify-center mx-auto mb-5"
        >
          <svg
            class="w-8 h-8 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <h3 class="text-white font-black text-xl mb-2">
          Your wishlist is empty
        </h3>
        <p class="text-gray-500 text-sm mb-6">
          Save hotels, restaurants and events you love
        </p>
        <RouterLink
          to="/"
          class="px-6 py-3 btn-gold rounded-xl text-sm font-bold shine inline-block"
          >Start Exploring</RouterLink
        >
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="item in items"
          :key="item.id"
          class="group bg-[#111118] border border-white/5 rounded-2xl overflow-hidden card-hover"
        >
          <div class="relative aspect-video overflow-hidden">
            <img
              :src="item.item_image || fallback(item.item_type)"
              :alt="item.item_name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-[#111118]/80 via-transparent to-transparent"
            ></div>
            <div class="absolute top-3 left-3">
              <span
                :class="[
                  'text-xs font-black px-3 py-1 rounded-full capitalize',
                  typeBadge(item.item_type),
                ]"
                >{{ item.item_type }}</span
              >
            </div>
            <button
              @click="removeItem(item.id)"
              class="absolute top-3 right-3 w-8 h-8 rounded-lg bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            >
              <svg
                class="w-4 h-4 text-white"
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
          <div class="p-5">
            <h3 class="font-black text-white text-lg mb-1 line-clamp-1">
              {{ item.item_name }}
            </h3>
            <div class="flex items-center gap-1 text-gray-500 text-xs mb-4">
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
              {{ item.item_city }}
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[#C9A84C] font-black"
                >${{ item.item_price }}</span
              >
              <RouterLink
                :to="`/detail/${item.item_type}/${item.item_id}`"
                class="flex items-center gap-1 text-[#C9A84C] text-xs font-semibold hover:gap-2 transition-all"
              >
                View
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

const items = ref([]);
const loading = ref(true);

const fallback = (type) =>
  ({
    hotel:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
    restaurant:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    event:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  }[type]);
const typeBadge = (type) =>
  ({
    hotel: "bg-blue-500/80 text-white",
    restaurant: "bg-orange-500/80 text-white",
    event: "bg-purple-500/80 text-white",
  }[type] || "bg-gray-500/80 text-white");

const removeItem = async (id) => {
  try {
    await api.delete(`/wishlist/${id}/`);
    items.value = items.value.filter((i) => i.id !== id);
  } catch {}
};

onMounted(async () => {
  try {
    const res = await api.get("/wishlist/");
    items.value = res.data.results || res.data;
  } catch {
  } finally {
    loading.value = false;
  }
});
</script>
