<template>
  <div class="min-h-screen bg-[#0A0A0F] pt-24 pb-20 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <p
          class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3"
        >
          Explore
        </p>
        <h1 class="text-5xl font-black text-white mb-2">Map View</h1>
        <p class="text-gray-500">
          Find hotels, restaurants and events near you
        </p>
      </div>

      <!-- Filter tabs -->
      <div class="flex gap-2 mb-6 flex-wrap">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border',
            activeTab === tab.value
              ? 'btn-gold border-transparent'
              : 'bg-[#111118] border-white/5 text-gray-400 hover:text-white hover:border-white/10',
          ]"
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
              :d="tab.icon"
            />
          </svg>
          {{ tab.label }}
          <span class="bg-black/20 px-2 py-0.5 rounded-full text-xs">{{
            counts[tab.value]
          }}</span>
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Map -->
        <div class="lg:col-span-2">
          <div
            class="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden"
            style="height: 600px"
          >
            <div
              id="map"
              style="height: 100%; width: 100%; border-radius: 16px"
            ></div>
          </div>
        </div>

        <!-- List -->
        <div
          class="lg:col-span-1 space-y-3 overflow-y-auto"
          style="max-height: 600px"
        >
          <div
            v-if="loading"
            v-for="i in 5"
            :key="i"
            class="skeleton h-20 rounded-2xl"
          ></div>

          <div v-else-if="filteredItems.length === 0" class="text-center py-12">
            <p class="text-gray-500">No items found</p>
          </div>

          <div
            v-else
            v-for="item in filteredItems"
            :key="item.id + item.type"
            @click="focusItem(item)"
            :class="[
              'bg-[#111118] border rounded-2xl p-4 cursor-pointer transition-all hover:border-[rgba(201,168,76,0.3)]',
              selectedItem?.id === item.id && selectedItem?.type === item.type
                ? 'border-[rgba(201,168,76,0.5)] bg-[rgba(201,168,76,0.05)]'
                : 'border-white/5',
            ]"
          >
            <div class="flex gap-3 items-start">
              <div
                :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                  typeStyle(item.type).bg,
                ]"
              >
                <svg
                  class="w-5 h-5"
                  :class="typeStyle(item.type).color"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    :d="typeStyle(item.type).icon"
                  />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-white font-bold text-sm line-clamp-1">
                  {{ item.name }}
                </h3>
                <p class="text-gray-500 text-xs">{{ item.city }}</p>
                <div class="flex items-center justify-between mt-1">
                  <span class="text-[#C9A84C] font-bold text-sm"
                    >${{ item.price }}</span
                  >
                  <RouterLink
                    :to="`/detail/${item.type}/${item.id}`"
                    class="text-xs text-gray-600 hover:text-[#C9A84C] transition-colors"
                    >View →</RouterLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import api from "../api";

const activeTab = ref("all");
const loading = ref(true);
const hotels = ref([]);
const restaurants = ref([]);
const events = ref([]);
const selectedItem = ref(null);
let map = null;
let markers = [];

const tabs = [
  {
    value: "all",
    label: "All",
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  {
    value: "hotel",
    label: "Hotels",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    value: "restaurant",
    label: "Restaurants",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    value: "event",
    label: "Events",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
];

const allItems = computed(() => [
  ...hotels.value.map((h) => ({
    ...h,
    type: "hotel",
    price: h.price_per_night,
    lat: h.latitude || 42.87 + Math.random() * 0.1,
    lng: h.longitude || 74.59 + Math.random() * 0.1,
  })),
  ...restaurants.value.map((r) => ({
    ...r,
    type: "restaurant",
    price: r.price_range || 25,
    lat: r.latitude || 42.86 + Math.random() * 0.1,
    lng: r.longitude || 74.6 + Math.random() * 0.1,
  })),
  ...events.value.map((e) => ({
    ...e,
    type: "event",
    lat: e.latitude || 42.88 + Math.random() * 0.1,
    lng: e.longitude || 74.58 + Math.random() * 0.1,
  })),
]);

const filteredItems = computed(() =>
  activeTab.value === "all"
    ? allItems.value
    : allItems.value.filter((i) => i.type === activeTab.value)
);

const counts = computed(() => ({
  all: allItems.value.length,
  hotel: hotels.value.length,
  restaurant: restaurants.value.length,
  event: events.value.length,
}));

const typeStyle = (type) =>
  ({
    hotel: {
      bg: "bg-blue-500/10",
      color: "text-blue-400",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    },
    restaurant: {
      bg: "bg-orange-500/10",
      color: "text-orange-400",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13",
    },
    event: {
      bg: "bg-purple-500/10",
      color: "text-purple-400",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
  }[type] || { bg: "bg-gray-500/10", color: "text-gray-400", icon: "" });

const markerColor = (type) =>
  ({ hotel: "#3B82F6", restaurant: "#F97316", event: "#A855F7" }[type] ||
  "#C9A84C");

const initMap = () => {
  import("leaflet").then((L) => {
    if (map) {
      map.remove();
      map = null;
    }

    map = L.default
      .map("map", { zoomControl: true, scrollWheelZoom: true })
      .setView([42.87, 74.59], 12);

    L.default
      .tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "© OpenStreetMap © CARTO",
          maxZoom: 19,
        }
      )
      .addTo(map);

    updateMarkers(L.default);
  });
};

const updateMarkers = (L) => {
  markers.forEach((m) => m.remove());
  markers = [];

  filteredItems.value.forEach((item) => {
    const color = markerColor(item.type);
    const icon = L.divIcon({
      html: `<div style="width:32px;height:32px;background:${color};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4)"></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      className: "",
    });

    const marker = L.marker([item.lat, item.lng], { icon }).addTo(map)
      .bindPopup(`
        <div style="font-family:sans-serif;padding:4px;min-width:180px">
          <div style="font-weight:700;font-size:14px;margin-bottom:4px">${item.name}</div>
          <div style="color:#666;font-size:12px;margin-bottom:4px">${item.city}</div>
          <div style="color:#C9A84C;font-weight:700;font-size:14px">$${item.price}</div>
          <a href="/detail/${item.type}/${item.id}" style="display:block;margin-top:8px;color:#C9A84C;font-size:12px;text-decoration:none">View details →</a>
        </div>
      `);

    marker.on("click", () => {
      selectedItem.value = item;
    });
    markers.push(marker);
  });
};

const focusItem = (item) => {
  selectedItem.value = item;
  if (map) map.setView([item.lat, item.lng], 15);
};

watch(filteredItems, () => {
  import("leaflet").then((L) => {
    if (map) updateMarkers(L.default);
  });
});

onMounted(async () => {
  try {
    const [h, r, e] = await Promise.all([
      api.get("/hotels/"),
      api.get("/restaurants/"),
      api.get("/events/"),
    ]);
    hotels.value = h.data.results || h.data;
    restaurants.value = r.data.results || r.data;
    events.value = e.data.results || e.data;
  } catch {
  } finally {
    loading.value = false;
  }

  setTimeout(initMap, 100);
});

onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<style>
@import "leaflet/dist/leaflet.css";
.leaflet-popup-content-wrapper {
  background: #1a1a24;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
}
.leaflet-popup-tip {
  background: #1a1a24;
}
.leaflet-container {
  background: #0a0a0f;
}
</style>
