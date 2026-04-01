<template>
  <div
    class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4"
    @click.self="$emit('close')"
  >
    <div
      class="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl"
    >
      <div class="flex justify-between items-start mb-6">
        <div>
          <h2 class="text-2xl font-black text-white">{{ title }}</h2>
          <p class="text-gray-500 text-sm mt-1">{{ item.name }}</p>
        </div>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-white transition-colors text-2xl leading-none"
        >
          ×
        </button>
      </div>

      <div v-if="!authStore.isLoggedIn" class="text-center py-6">
        <div class="text-4xl mb-3"></div>
        <p class="text-white font-bold mb-2">Sign in to book</p>
        <p class="text-gray-500 text-sm mb-6">
          You need an account to make a reservation
        </p>
        <RouterLink
          to="/login"
          class="px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold text-sm hover:bg-amber-400 transition-all"
          @click="$emit('close')"
          >Sign In</RouterLink
        >
      </div>

      <div v-else>
        <div v-if="success" class="text-center py-6">
          <div
            class="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
          ></div>
          <h3 class="text-white font-black text-xl mb-2">Booking Confirmed!</h3>
          <p class="text-gray-500 text-sm mb-4">
            Your reservation has been saved successfully.
          </p>
          <button
            @click="$emit('booked')"
            class="px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold text-sm hover:bg-amber-400 transition-all"
          >
            Done
          </button>
        </div>

        <div v-else class="space-y-4">
          <div
            v-if="error"
            class="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm"
          >
            {{ error }}
          </div>

          <div class="grid grid-cols-2 gap-4" v-if="type !== 'event'">
            <div>
              <label class="text-gray-400 text-sm font-medium block mb-2"
                >Check In</label
              >
              <input
                v-model="form.check_in"
                type="date"
                class="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label class="text-gray-400 text-sm font-medium block mb-2"
                >Check Out</label
              >
              <input
                v-model="form.check_out"
                type="date"
                class="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label class="text-gray-400 text-sm font-medium block mb-2"
              >Guests</label
            >
            <select
              v-model="form.guests"
              class="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 transition-colors"
            >
              <option v-for="n in 10" :key="n" :value="n">
                {{ n }} {{ n === 1 ? "Guest" : "Guests" }}
              </option>
            </select>
          </div>

          <div class="bg-gray-800 rounded-xl p-4">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-400">Price</span>
              <span class="text-white font-semibold">${{ itemPrice }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Total</span>
              <span class="text-amber-400 font-black text-lg"
                >${{ totalPrice }}</span
              >
            </div>
          </div>

          <button
            @click="submitBooking"
            :disabled="loading"
            class="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20"
          >
            {{ loading ? "Booking..." : "Confirm Booking →" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/auth";
import api from "../api";

const props = defineProps({ item: Object, type: String });
const emit = defineEmits(["close", "booked"]);
const authStore = useAuthStore();

const form = ref({ check_in: "", check_out: "", guests: 2 });
const loading = ref(false);
const error = ref("");
const success = ref(false);

const title = computed(
  () =>
    ({
      hotel: "Book Hotel",
      restaurant: "Reserve Table",
      event: "Get Tickets",
    }[props.type] || "Book Now")
);
const itemPrice = computed(
  () => props.item?.price_per_night || props.item?.price || 99
);
const totalPrice = computed(() =>
  (itemPrice.value * form.value.guests).toFixed(2)
);

const submitBooking = async () => {
  loading.value = true;
  error.value = "";
  try {
    const payload = {
      booking_type: props.type,
      guests: form.value.guests,
      total_price: totalPrice.value,
      ...(props.type === "hotel" && {
        hotel: props.item.id,
        check_in: form.value.check_in,
        check_out: form.value.check_out,
      }),
      ...(props.type === "restaurant" && { restaurant: props.item.id }),
      ...(props.type === "event" && { event: props.item.id }),
    };
    await api.post("/bookings/", payload);
    success.value = true;
  } catch (e) {
    error.value =
      e.response?.data?.detail || "Booking failed. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
