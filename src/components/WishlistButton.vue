<template>
  <button
    @click.prevent.stop="toggle"
    :disabled="loading"
    :title="inWishlist ? 'Remove from wishlist' : 'Save to wishlist'"
    :class="[
      'flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-200',
      inWishlist
        ? 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30'
        : 'bg-black/50 border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10',
      loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
  >
    <svg
      class="w-4 h-4 transition-transform duration-200"
      :class="{ 'scale-110': inWishlist }"
      :fill="inWishlist ? 'currentColor' : 'none'"
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
  </button>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import api from "../api";

const props = defineProps({
  type: { type: String, required: true }, // 'hotel' | 'restaurant' | 'event'
  itemId: { type: Number, required: true },
});

const router = useRouter();
const authStore = useAuthStore();
const inWishlist = ref(false);
const loading = ref(false);

const check = async () => {
  if (!authStore.isLoggedIn) return;
  try {
    const res = await api.get(`/wishlist/check/?${props.type}=${props.itemId}`);
    inWishlist.value = res.data.in_wishlist;
  } catch {}
};

const toggle = async () => {
  if (!authStore.isLoggedIn) {
    router.push("/login");
    return;
  }
  loading.value = true;
  try {
    const res = await api.post("/wishlist/toggle/", {
      [props.type]: props.itemId,
    });
    inWishlist.value = res.data.status === "added";
  } catch {
  } finally {
    loading.value = false;
  }
};

onMounted(check);
</script>
