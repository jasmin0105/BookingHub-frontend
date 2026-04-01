<template>
  <div class="min-h-screen bg-[#0A0A0F] pt-24 pb-20 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="mb-10">
        <p
          class="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-3"
        >
          Compare
        </p>
        <h1 class="text-5xl font-black text-white mb-2">Compare Hotels</h1>
        <p class="text-gray-500">Select two hotels to compare side by side</p>
      </div>

      <!-- Selectors -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div v-for="(slot, idx) in [0, 1]" :key="idx">
          <label class="block text-gray-400 text-sm font-semibold mb-2">
            {{ idx === 0 ? "First Hotel" : "Second Hotel" }}
          </label>
          <select
            v-model="selected[idx]"
            class="w-full bg-[#111118] border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:border-[rgba(201,168,76,0.4)] outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="" class="bg-[#111118]">Select a hotel...</option>
            <option
              v-for="h in hotels"
              :key="h.id"
              :value="h.id"
              class="bg-[#111118]"
            >
              {{ h.name }} — ${{ h.price_per_night }}/night
            </option>
          </select>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="grid grid-cols-2 gap-6">
        <div v-for="i in 2" :key="i" class="skeleton h-96 rounded-2xl"></div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!hotelA && !hotelB" class="text-center py-20">
        <div
          class="w-20 h-20 rounded-2xl bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.1)] flex items-center justify-center mx-auto mb-4"
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
              stroke-width="1"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <p class="text-white font-bold text-lg mb-2">
          Select hotels to compare
        </p>
        <p class="text-gray-600 text-sm">
          Choose two hotels from the dropdowns above
        </p>
      </div>

      <!-- Comparison Table -->
      <div v-else-if="hotelA || hotelB" class="space-y-4">
        <!-- Hotel Cards -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div
            v-for="hotel in [hotelA, hotelB]"
            :key="hotel?.id || 'empty'"
            class="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden"
          >
            <div v-if="hotel">
              <div
                class="h-40 bg-gradient-to-br from-[#1A1A24] to-[#111118] relative flex items-center justify-center"
              >
                <img
                  v-if="hotel.image"
                  :src="hotel.image"
                  class="w-full h-full object-cover absolute inset-0"
                />
                <svg
                  v-else
                  class="w-12 h-12 text-gray-700 relative z-10"
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
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                ></div>
              </div>
              <div class="p-5">
                <h3 class="text-white font-black text-xl mb-1">
                  {{ hotel.name }}
                </h3>
                <p class="text-gray-500 text-sm">{{ hotel.city }}</p>
                <RouterLink
                  :to="`/detail/hotel/${hotel.id}`"
                  class="mt-3 inline-block px-4 py-2 btn-gold rounded-xl text-xs font-bold shine"
                >
                  Book Now
                </RouterLink>
              </div>
            </div>
            <div
              v-else
              class="h-full flex items-center justify-center py-20 text-gray-700 text-sm"
            >
              Not selected
            </div>
          </div>
        </div>

        <!-- Comparison rows -->
        <div
          class="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden"
        >
          <div
            v-for="(row, i) in comparisonRows"
            :key="row.label"
            :class="[
              'grid grid-cols-3 gap-0',
              i % 2 === 0 ? 'bg-white/[0.02]' : '',
            ]"
          >
            <!-- Label -->
            <div class="px-6 py-4 flex items-center">
              <span class="text-gray-500 text-sm font-medium">{{
                row.label
              }}</span>
            </div>
            <!-- Hotel A value -->
            <div
              class="px-6 py-4 border-l border-white/5 flex items-center justify-center"
            >
              <span :class="['text-sm font-bold', getCellClass(row, 'A')]">
                {{ hotelA ? row.getValue(hotelA) : "—" }}
              </span>
            </div>
            <!-- Hotel B value -->
            <div
              class="px-6 py-4 border-l border-white/5 flex items-center justify-center"
            >
              <span :class="['text-sm font-bold', getCellClass(row, 'B')]">
                {{ hotelB ? row.getValue(hotelB) : "—" }}
              </span>
            </div>
          </div>
        </div>

        <!-- Winner banner -->
        <div
          v-if="hotelA && hotelB && winner"
          class="bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] rounded-2xl p-6 flex items-center gap-4"
        >
          <div
            class="w-12 h-12 rounded-xl btn-gold flex items-center justify-center flex-shrink-0"
          >
            <svg
              class="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          </div>
          <div>
            <p
              class="text-[#C9A84C] text-xs font-semibold uppercase tracking-wider mb-1"
            >
              Best Value
            </p>
            <p class="text-white font-black text-lg">{{ winner.name }} wins!</p>
            <p class="text-gray-500 text-sm">
              Lower price at ${{ winner.price_per_night }}/night
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import api from "../api";

const hotels = ref([]);
const selected = ref(["", ""]);
const loading = ref(false);

const hotelA = computed(
  () => hotels.value.find((h) => h.id === Number(selected.value[0])) || null
);
const hotelB = computed(
  () => hotels.value.find((h) => h.id === Number(selected.value[1])) || null
);

const winner = computed(() => {
  if (!hotelA.value || !hotelB.value) return null;
  return hotelA.value.price_per_night <= hotelB.value.price_per_night
    ? hotelA.value
    : hotelB.value;
});

const comparisonRows = [
  {
    label: "Price per Night",
    getValue: (h) => `$${h.price_per_night}`,
    compareKey: "price_per_night",
    lowerIsBetter: true,
  },
  {
    label: "Rating",
    getValue: (h) => (h.rating ? `⭐ ${h.rating}` : "N/A"),
    compareKey: "rating",
    lowerIsBetter: false,
  },
  { label: "City", getValue: (h) => h.city || "N/A", compareKey: null },
  {
    label: "Stars",
    getValue: (h) => (h.stars ? "★".repeat(h.stars) : "N/A"),
    compareKey: "stars",
    lowerIsBetter: false,
  },
  {
    label: "Description",
    getValue: (h) =>
      h.description ? h.description.slice(0, 60) + "..." : "No description",
    compareKey: null,
  },
];

const getCellClass = (row, side) => {
  if (!row.compareKey || !hotelA.value || !hotelB.value) return "text-white";
  const valA = parseFloat(hotelA.value[row.compareKey]) || 0;
  const valB = parseFloat(hotelB.value[row.compareKey]) || 0;
  if (valA === valB) return "text-white";
  const aWins = row.lowerIsBetter ? valA < valB : valA > valB;
  if (side === "A") return aWins ? "text-green-400" : "text-red-400";
  return aWins ? "text-red-400" : "text-green-400";
};

onMounted(async () => {
  loading.value = true;
  try {
    const res = await api.get("/hotels/");
    hotels.value = res.data.results || res.data;
  } catch {
  } finally {
    loading.value = false;
  }
});
</script>
