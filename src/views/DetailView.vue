<template>
  <div class="min-h-screen bg-[#07070C]" v-if="item">
    <!-- HERO IMAGE -->
    <div class="detail-hero">
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.name"
        class="detail-hero-img"
      />
      <div v-else class="detail-hero-placeholder">
        <svg
          class="w-20 h-20"
          style="color: rgba(201, 168, 76, 0.2)"
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
      <div class="detail-hero-overlay"></div>

      <!-- Back button -->
      <button @click="$router.back()" class="detail-back-btn">
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      <!-- Hero info -->
      <div class="detail-hero-info">
        <div class="detail-type-badge">{{ typeLabel }}</div>
        <h1 class="detail-hero-title">{{ item.name }}</h1>
        <div class="detail-hero-meta">
          <span v-if="item.city" class="detail-meta-item">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            {{ item.city }}
          </span>
          <span v-if="item.rating" class="detail-meta-item">
            <svg
              class="w-4 h-4"
              style="color: #c9a84c"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            {{ item.rating }}
          </span>
          <span v-if="item.price_per_night" class="detail-price-badge"
            >${{ item.price_per_night }}/night</span
          >
          <span
            v-if="item.price && !item.price_per_night"
            class="detail-price-badge"
            >${{ item.price }}</span
          >
        </div>
      </div>

      <!-- Wishlist -->
      <WishlistButton
        :itemId="item.id"
        :itemType="type"
        class="detail-wishlist-btn"
      />
    </div>

    <!-- BODY -->
    <div class="detail-body">
      <!-- LEFT COLUMN -->
      <div class="detail-main">
        <!-- Description -->
        <div class="detail-section">
          <h2 class="detail-section-title">About</h2>
          <p class="detail-desc">
            {{ item.description || "No description available." }}
          </p>
        </div>

        <!-- Amenities (hotels) -->
        <div v-if="item.amenities && type === 'hotel'" class="detail-section">
          <h2 class="detail-section-title">Amenities</h2>
          <div class="amenities-grid">
            <span v-for="a in amenitiesList" :key="a" class="amenity-tag"
              >✓ {{ a }}</span
            >
          </div>
        </div>

        <!-- Venue / Cuisine -->
        <div v-if="item.venue || item.cuisine_type" class="detail-section">
          <h2 class="detail-section-title">Details</h2>
          <div class="detail-tags">
            <span v-if="item.venue" class="detail-tag"
              >📍 {{ item.venue }}</span
            >
            <span v-if="item.cuisine_type" class="detail-tag"
              >🍽 {{ item.cuisine_type }}</span
            >
            <span v-if="item.date" class="detail-tag"
              >📅 {{ formatDate(item.date) }}</span
            >
            <span v-if="item.address" class="detail-tag"
              >🏠 {{ item.address }}</span
            >
          </div>
        </div>

        <!-- Reviews -->
        <div class="detail-section">
          <div class="flex items-center justify-between mb-4">
            <h2 class="detail-section-title" style="margin-bottom: 0">
              Reviews ({{ reviews.length }})
            </h2>
          </div>

          <!-- Add review -->
          <div v-if="authStore.isLoggedIn" class="review-form">
            <div class="review-stars-input">
              <span
                v-for="s in 5"
                :key="s"
                @click="newReview.rating = s"
                :style="`color:${
                  s <= newReview.rating ? '#C9A84C' : '#2a2a35'
                };cursor:pointer;font-size:1.2rem`"
                >★</span
              >
            </div>
            <textarea
              v-model="newReview.comment"
              class="review-textarea"
              placeholder="Share your experience..."
              rows="3"
            ></textarea>
            <button
              @click="submitReview"
              :disabled="!newReview.rating"
              class="review-submit-btn"
            >
              Post Review
            </button>
          </div>

          <!-- Reviews list -->
          <div v-if="reviews.length === 0" class="empty-reviews">
            No reviews yet. Be the first!
          </div>
          <div v-for="r in reviews" :key="r.id" class="review-card">
            <div class="review-header">
              <div class="review-avatar">
                {{ (r.username || "U")[0].toUpperCase() }}
              </div>
              <div>
                <div class="review-username">{{ r.username }}</div>
                <div class="review-stars">
                  <span
                    v-for="s in 5"
                    :key="s"
                    :style="`color:${s <= r.rating ? '#C9A84C' : '#2a2a35'}`"
                    >★</span
                  >
                </div>
              </div>
              <span class="review-date">{{ formatDate(r.created_at) }}</span>
            </div>
            <p class="review-text">{{ r.comment }}</p>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN — BOOKING CARD -->
      <div class="detail-sidebar">
        <div class="booking-card">
          <div class="booking-card-price">
            <span v-if="item.price_per_night"
              >${{ item.price_per_night
              }}<span class="booking-card-per">/night</span></span
            >
            <span v-else-if="item.price">${{ item.price }}</span>
          </div>

          <!-- AVAILABILITY CHECK (only hotels) -->
          <div v-if="type === 'hotel'" class="avail-section">
            <div class="booking-field">
              <label class="booking-label">Check-in</label>
              <input
                v-model="bookingForm.check_in"
                type="date"
                class="booking-input"
                :min="today"
                @change="checkAvailability"
              />
            </div>
            <div class="booking-field">
              <label class="booking-label">Check-out</label>
              <input
                v-model="bookingForm.check_out"
                type="date"
                class="booking-input"
                :min="bookingForm.check_in || today"
                @change="checkAvailability"
              />
            </div>

            <!-- Availability result -->
            <div
              v-if="availability"
              :class="[
                'avail-result',
                availability.available ? 'avail-ok' : 'avail-no',
              ]"
            >
              <span v-if="availability.available">
                ✅ Available! {{ availability.available_rooms }} of
                {{ availability.total_rooms }} rooms free
              </span>
              <span v-else> ❌ No rooms available for these dates </span>
            </div>
          </div>

          <!-- Event date -->
          <div v-if="type === 'event'" class="booking-field">
            <label class="booking-label">Event Date</label>
            <div class="booking-event-date">{{ formatDate(item.date) }}</div>
          </div>

          <!-- Restaurant date -->
          <div v-if="type === 'restaurant'" class="booking-field">
            <label class="booking-label">Date</label>
            <input
              v-model="bookingForm.check_in"
              type="date"
              class="booking-input"
              :min="today"
            />
          </div>

          <div class="booking-field">
            <label class="booking-label">Guests</label>
            <div class="guests-control">
              <button
                @click="
                  bookingForm.guests = Math.max(1, bookingForm.guests - 1)
                "
                class="guests-btn"
              >
                −
              </button>
              <span class="guests-num">{{ bookingForm.guests }}</span>
              <button @click="bookingForm.guests++" class="guests-btn">
                +
              </button>
            </div>
          </div>

          <!-- Total -->
          <div v-if="totalPrice > 0" class="booking-total">
            <span class="booking-total-label">Total</span>
            <span class="booking-total-price">${{ totalPrice }}</span>
          </div>

          <!-- Book button -->
          <button
            @click="handleBook"
            :disabled="
              bookingLoading ||
              (type === 'hotel' && availability && !availability.available)
            "
            class="book-btn"
          >
            <span v-if="!authStore.isLoggedIn">Sign in to Book</span>
            <span v-else-if="bookingLoading">Booking...</span>
            <span v-else-if="bookingSuccess">✅ Booked!</span>
            <span v-else>Book Now →</span>
          </button>

          <p v-if="bookingError" class="booking-error">{{ bookingError }}</p>
        </div>
      </div>
    </div>

    <!-- SIMILAR SECTION -->
    <div v-if="similar.length > 0" class="similar-section">
      <div class="similar-header">
        <div class="section-eyebrow">You might also like</div>
        <h2 class="similar-title">Similar {{ typeLabel }}s</h2>
      </div>
      <div class="similar-grid">
        <RouterLink
          v-for="s in similar"
          :key="s.id"
          :to="`/detail/${type}/${s.id}`"
          class="similar-card"
        >
          <div class="similar-card-img">
            <img
              v-if="s.image"
              :src="s.image"
              :alt="s.name"
              style="width: 100%; height: 100%; object-fit: cover"
            />
            <div v-else class="similar-card-placeholder"></div>
          </div>
          <div class="similar-card-body">
            <div class="similar-card-name">{{ s.name }}</div>
            <div class="similar-card-city">{{ s.city }}</div>
            <div class="similar-card-price">
              <span v-if="s.price_per_night"
                >${{ s.price_per_night }}/night</span
              >
              <span v-else-if="s.price">${{ s.price }}</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- LOADING -->
  <div
    v-else
    class="min-h-screen bg-[#07070C] flex items-center justify-center"
  >
    <div class="loading-spinner"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import {
  hotelsAPI,
  restaurantsAPI,
  eventsAPI,
  bookingsAPI,
  reviewsAPI,
} from "../api";
import WishlistButton from "../components/WishlistButton.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const type = computed(() => route.params.type);
const id = computed(() => route.params.id);

const item = ref(null);
const similar = ref([]);
const reviews = ref([]);
const availability = ref(null);
const bookingLoading = ref(false);
const bookingSuccess = ref(false);
const bookingError = ref("");

const bookingForm = ref({ check_in: "", check_out: "", guests: 1 });
const newReview = ref({ rating: 0, comment: "" });

const today = new Date().toISOString().split("T")[0];

const typeLabel = computed(() => {
  return (
    { hotel: "Hotel", restaurant: "Restaurant", event: "Event" }[type.value] ||
    ""
  );
});

const amenitiesList = computed(() => {
  if (!item.value?.amenities) return [];
  try {
    return JSON.parse(item.value.amenities);
  } catch {
    return item.value.amenities.split(",").map((s) => s.trim());
  }
});

const totalPrice = computed(() => {
  if (!item.value) return 0;
  if (
    type.value === "hotel" &&
    bookingForm.value.check_in &&
    bookingForm.value.check_out
  ) {
    const nights = Math.max(
      1,
      Math.ceil(
        (new Date(bookingForm.value.check_out) -
          new Date(bookingForm.value.check_in)) /
          86400000
      )
    );
    return (parseFloat(item.value.price_per_night) * nights).toFixed(2);
  }
  if (item.value.price)
    return (parseFloat(item.value.price) * bookingForm.value.guests).toFixed(2);
  return 0;
});

const formatDate = (d) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Загрузка данных
const loadData = async () => {
  try {
    const apiMap = {
      hotel: hotelsAPI,
      restaurant: restaurantsAPI,
      event: eventsAPI,
    };
    const [itemRes, similarRes, reviewsRes] = await Promise.all([
      apiMap[type.value].detail(id.value),
      apiMap[type.value].similar(id.value),
      reviewsAPI.list({ [`${type.value}`]: id.value }),
    ]);
    item.value = itemRes.data;
    similar.value = similarRes.data?.slice(0, 4) || [];
    reviews.value = Array.isArray(reviewsRes.data)
      ? reviewsRes.data
      : reviewsRes.data?.results || [];
  } catch (e) {
    console.error(e);
  }
};

// Проверка доступности дат
const checkAvailability = async () => {
  if (!bookingForm.value.check_in || !bookingForm.value.check_out) return;
  try {
    const res = await bookingsAPI.checkAvailability({
      type: type.value,
      id: id.value,
      check_in: bookingForm.value.check_in,
      check_out: bookingForm.value.check_out,
    });
    availability.value = res.data;
  } catch (e) {
    console.error(e);
  }
};

// Бронирование
const handleBook = async () => {
  if (!authStore.isLoggedIn) {
    router.push("/login");
    return;
  }
  bookingLoading.value = true;
  bookingError.value = "";
  try {
    const payload = {
      booking_type: type.value,
      [`${type.value}`]: id.value,
      guests: bookingForm.value.guests,
      total_price: totalPrice.value || 0,
    };
    if (bookingForm.value.check_in)
      payload.check_in = bookingForm.value.check_in;
    if (bookingForm.value.check_out)
      payload.check_out = bookingForm.value.check_out;

    await bookingsAPI.create(payload);
    bookingSuccess.value = true;
    setTimeout(() => {
      bookingSuccess.value = false;
    }, 3000);
  } catch (e) {
    bookingError.value =
      e.response?.data?.detail || "Booking failed. Try again.";
  } finally {
    bookingLoading.value = false;
  }
};

// Отзыв
const submitReview = async () => {
  if (!newReview.value.rating) return;
  try {
    await reviewsAPI.create({
      booking_type: type.value,
      [`${type.value}`]: id.value,
      rating: newReview.value.rating,
      comment: newReview.value.comment,
    });
    newReview.value = { rating: 0, comment: "" };
    await loadData();
  } catch (e) {
    console.error(e);
  }
};

onMounted(loadData);
watch([type, id], loadData);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap");

/* HERO */
.detail-hero {
  position: relative;
  height: 420px;
  overflow: hidden;
}
.detail-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.detail-hero-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0e0e18, #1a1a26);
  display: flex;
  align-items: center;
  justify-content: center;
}
.detail-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(7, 7, 12, 1) 0%,
    rgba(7, 7, 12, 0.4) 50%,
    rgba(7, 7, 12, 0.1) 100%
  );
}
.detail-back-btn {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(7, 7, 12, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-family: "DM Sans", sans-serif;
  cursor: pointer;
  transition: all 0.2s;
}
.detail-back-btn:hover {
  background: rgba(201, 168, 76, 0.15);
  border-color: rgba(201, 168, 76, 0.3);
}
.detail-hero-info {
  position: absolute;
  bottom: 32px;
  left: 32px;
  right: 280px;
  z-index: 10;
}
.detail-type-badge {
  display: inline-block;
  background: rgba(201, 168, 76, 0.15);
  border: 1px solid rgba(201, 168, 76, 0.3);
  color: #c9a84c;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 6px;
  margin-bottom: 10px;
  font-family: "DM Sans", sans-serif;
}
.detail-hero-title {
  font-family: "Playfair Display", serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 900;
  color: #fff;
  margin-bottom: 10px;
  line-height: 1.1;
}
.detail-hero-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.detail-meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  font-family: "DM Sans", sans-serif;
}
.detail-price-badge {
  background: rgba(201, 168, 76, 0.9);
  color: #000;
  font-weight: 800;
  font-size: 0.85rem;
  padding: 4px 12px;
  border-radius: 8px;
  font-family: "DM Sans", sans-serif;
}
.detail-wishlist-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 10;
}

/* BODY */
.detail-body {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}
.detail-main {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.detail-section {
}
.detail-section-title {
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 14px;
}
.detail-desc {
  font-family: "DM Sans", sans-serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.8;
}

/* AMENITIES */
.amenities-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.amenity-tag {
  background: rgba(201, 168, 76, 0.08);
  border: 1px solid rgba(201, 168, 76, 0.15);
  color: rgba(255, 255, 255, 0.7);
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-family: "DM Sans", sans-serif;
}

/* TAGS */
.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.detail-tag {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.6);
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-family: "DM Sans", sans-serif;
}

/* REVIEWS */
.review-form {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 16px;
}
.review-stars-input {
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
}
.review-textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 10px 14px;
  color: #fff;
  font-size: 0.85rem;
  font-family: "DM Sans", sans-serif;
  outline: none;
  resize: none;
}
.review-submit-btn {
  margin-top: 10px;
  padding: 8px 20px;
  background: linear-gradient(135deg, #c9a84c, #e8c96d);
  color: #000;
  font-weight: 700;
  font-size: 0.8rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
}
.review-submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.empty-reviews {
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.85rem;
  font-family: "DM Sans", sans-serif;
  padding: 20px 0;
}
.review-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 10px;
}
.review-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.review-avatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(201, 168, 76, 0.15);
  color: #c9a84c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}
.review-username {
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  font-family: "DM Sans", sans-serif;
}
.review-stars {
  font-size: 0.75rem;
}
.review-date {
  margin-left: auto;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.25);
  font-family: "DM Sans", sans-serif;
}
.review-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  font-family: "DM Sans", sans-serif;
  line-height: 1.6;
}

/* BOOKING CARD */
.detail-sidebar {
}
.booking-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 20px;
  padding: 24px;
  position: sticky;
  top: 24px;
}
.booking-card-price {
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 900;
  color: #c9a84c;
  margin-bottom: 20px;
}
.booking-card-per {
  font-family: "DM Sans", sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 400;
}
.booking-field {
  margin-bottom: 14px;
}
.booking-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 6px;
  font-family: "DM Sans", sans-serif;
}
.booking-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 10px 12px;
  color: #fff;
  font-size: 0.85rem;
  font-family: "DM Sans", sans-serif;
  outline: none;
}
.booking-input:focus {
  border-color: rgba(201, 168, 76, 0.4);
}
.booking-event-date {
  color: #c9a84c;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: "DM Sans", sans-serif;
}

/* AVAILABILITY */
.avail-section {
}
.avail-result {
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.8rem;
  font-family: "DM Sans", sans-serif;
  margin-bottom: 14px;
  font-weight: 600;
}
.avail-ok {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.25);
  color: #86efac;
}
.avail-no {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #fca5a5;
}

/* GUESTS */
.guests-control {
  display: flex;
  align-items: center;
  gap: 16px;
}
.guests-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.guests-btn:hover {
  background: rgba(201, 168, 76, 0.15);
  border-color: rgba(201, 168, 76, 0.3);
}
.guests-num {
  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  min-width: 24px;
  text-align: center;
}

/* TOTAL */
.booking-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(201, 168, 76, 0.06);
  border: 1px solid rgba(201, 168, 76, 0.15);
  border-radius: 10px;
  padding: 12px 14px;
  margin: 14px 0;
}
.booking-total-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  font-family: "DM Sans", sans-serif;
}
.booking-total-price {
  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #c9a84c;
}

/* BOOK BUTTON */
.book-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #c9a84c, #e8c96d);
  color: #000;
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-family: "DM Sans", sans-serif;
  transition: opacity 0.2s;
}
.book-btn:hover:not(:disabled) {
  opacity: 0.9;
}
.book-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.booking-error {
  color: #fca5a5;
  font-size: 0.8rem;
  margin-top: 8px;
  font-family: "DM Sans", sans-serif;
  text-align: center;
}

/* SIMILAR */
.similar-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 60px;
}
.similar-header {
  margin-bottom: 24px;
}
.section-eyebrow {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #c9a84c;
  margin-bottom: 6px;
  font-family: "DM Sans", sans-serif;
}
.similar-title {
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 900;
  color: #fff;
}
.similar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.similar-card {
  background: #0d0d17;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s, border-color 0.3s;
  display: block;
}
.similar-card:hover {
  transform: translateY(-4px);
  border-color: rgba(201, 168, 76, 0.2);
}
.similar-card-img {
  height: 120px;
  overflow: hidden;
}
.similar-card-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0e0e18, #1a1a26);
}
.similar-card-body {
  padding: 14px;
}
.similar-card-name {
  font-family: "Playfair Display", serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #fff;
  margin-bottom: 4px;
}
.similar-card-city {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  font-family: "DM Sans", sans-serif;
  margin-bottom: 6px;
}
.similar-card-price {
  font-size: 0.85rem;
  font-weight: 700;
  color: #c9a84c;
  font-family: "DM Sans", sans-serif;
}

/* LOADING */
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(201, 168, 76, 0.2);
  border-top-color: #c9a84c;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .detail-body {
    grid-template-columns: 1fr;
  }
  .detail-hero-info {
    right: 24px;
  }
  .similar-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
