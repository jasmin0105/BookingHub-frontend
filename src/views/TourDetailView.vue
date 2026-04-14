<template>
  <div class="tour-detail" v-if="tour">
    <!-- HERO -->
    <div class="hero" :style="tour.image_url ? `background-image:url(${tour.image_url})` : ''">
      <div class="hero-overlay">
        <button class="back-btn" @click="$router.back()">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          Back to Tours
        </button>
        <div class="hero-content">
          <span :class="['diff-badge', `diff-${tour.difficulty}`]">{{ tour.difficulty }}</span>
          <h1>{{ tour.name }}</h1>
          <div class="hero-meta">
            <span class="meta-pill">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              {{ tour.city }} → {{ tour.destination }}
            </span>
            <span class="meta-pill">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              {{ tour.duration }} {{ tour.duration === 1 ? 'day' : 'days' }}
            </span>
            <span class="meta-pill">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Max {{ tour.max_people }} people
            </span>
            <span class="meta-pill gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              {{ tour.rating }} rating
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- QUICK STATS -->
    <div class="quick-stats">
      <div class="stat">
        <svg width="22" height="22" fill="none" stroke="#C9A84C" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        <div><div class="stat-val">{{ tour.duration }} {{ tour.duration === 1 ? 'Day' : 'Days' }}</div><div class="stat-label">Duration</div></div>
      </div>
      <div class="stat">
        <svg width="22" height="22" fill="none" stroke="#C9A84C" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        <div><div class="stat-val">Max {{ tour.max_people }}</div><div class="stat-label">Group Size</div></div>
      </div>
      <div class="stat">
        <svg width="22" height="22" fill="none" stroke="#C9A84C" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        <div><div class="stat-val" style="text-transform:capitalize">{{ tour.difficulty }}</div><div class="stat-label">Difficulty</div></div>
      </div>
      <div class="stat">
        <svg width="22" height="22" fill="none" stroke="#C9A84C" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        <div><div class="stat-val">{{ tour.city }}</div><div class="stat-label">Starting Point</div></div>
      </div>
      <div class="stat">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#C9A84C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <div><div class="stat-val">{{ tour.rating }} / 5</div><div class="stat-label">Rating</div></div>
      </div>
    </div>

    <div class="content-grid">
      <!-- LEFT -->
      <div class="left">

        <!-- ABOUT -->
        <section class="section">
          <h2>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            About This Tour
          </h2>
          <p>{{ tour.description }}</p>
          <p v-if="tour.additional_info" style="margin-top:12px">{{ tour.additional_info }}</p>
        </section>

        <!-- WHY VISIT -->
        <section class="section" v-if="tour.highlights">
          <h2>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/></svg>
            Why Visit
          </h2>
          <div class="bullet-list">
            <div v-for="item in tour.highlights.split('|')" :key="item" class="bullet-item green">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
              <span>{{ item.trim() }}</span>
            </div>
          </div>
        </section>

        <!-- WHAT'S INCLUDED -->
        <section class="section" v-if="tour.includes">
          <h2>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
            What Is Included
          </h2>
          <div class="two-col">
            <div v-for="item in tour.includes.split(',')" :key="item" class="bullet-item green">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
              <span>{{ item.trim() }}</span>
            </div>
          </div>
        </section>

        <!-- NOT INCLUDED -->
        <section class="section" v-if="tour.not_included">
          <h2>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            Not Included
          </h2>
          <div class="two-col">
            <div v-for="item in tour.not_included.split('|')" :key="item" class="bullet-item red">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
              <span>{{ item.trim() }}</span>
            </div>
          </div>
        </section>

        <!-- RESTRICTIONS -->
        <section class="section" v-if="tour.restrictions">
          <h2>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Restrictions & Requirements
          </h2>
          <div class="bullet-list">
            <div v-for="item in tour.restrictions.split('|')" :key="item" class="bullet-item orange">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <span>{{ item.trim() }}</span>
            </div>
          </div>
        </section>

      </div>

      <!-- RIGHT — BOOKING -->
      <div class="right">
        <div class="booking-card">
          <div class="price-block">
            <div class="price">${{ tour.price }}</div>
            <div class="price-sub">per person</div>
          </div>

          <div class="form-group">
            <label>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Select Date
            </label>
            <input type="date" v-model="selectedDate" class="form-input" :min="today" />
          </div>

          <div class="form-group">
            <label>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Number of People
            </label>
            <div class="counter">
              <button @click="people > 1 && people--">−</button>
              <span>{{ people }}</span>
              <button @click="people < tour.max_people && people++">+</button>
            </div>
          </div>

          <div class="total-block">
            <span>Total Price</span>
            <span class="total-price">${{ (tour.price * people).toFixed(2) }}</span>
          </div>

          <button class="book-btn" @click="bookTour" :disabled="!selectedDate || booking">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            {{ booking ? 'Booking...' : 'Book Now' }}
          </button>

          <div v-if="success" class="success-msg">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            Booking confirmed! Check your email.
          </div>
          <div v-if="error" class="error-msg">{{ error }}</div>

          <div class="card-guarantees">
            <div class="guarantee">
              <svg width="14" height="14" fill="none" stroke="#22C55E" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              Free cancellation up to 24h before
            </div>
            <div class="guarantee">
              <svg width="14" height="14" fill="none" stroke="#22C55E" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              Email confirmation sent instantly
            </div>
            <div class="guarantee">
              <svg width="14" height="14" fill="none" stroke="#22C55E" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              Secure payment via Mbank / Elcart
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    Loading tour...
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api'
import { useAuthStore } from '../stores/auth'

const route   = useRoute()
const auth    = useAuthStore()
const tour    = ref(null)
const people  = ref(1)
const selectedDate = ref('')
const booking = ref(false)
const success = ref(false)
const error   = ref('')

const today = computed(() => new Date().toISOString().split('T')[0])

onMounted(async () => {
  const res = await api.get(`/tours/${route.params.id}/`)
  tour.value = res.data
})

async function bookTour() {
  if (!auth.isAuthenticated) { error.value = 'Please login to book a tour.'; return }
  booking.value = true; error.value = ''
  try {
    await api.post('/bookings/', {
      booking_type: 'event',
      check_in: selectedDate.value,
      check_out: selectedDate.value,
      guests: people.value,
      total_price: (tour.value.price * people.value).toFixed(2),
    })
    success.value = true
  } catch (e) {
    error.value = 'Booking failed. Please try again.'
  } finally {
    booking.value = false
  }
}
</script>

<style scoped>
.tour-detail { min-height:100vh; background:#07070C; }
.hero { min-height:520px; background-size:cover; background-position:center; background-color:#0D0D17; position:relative; }
.hero-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(7,7,12,0.98) 25%,rgba(7,7,12,0.3) 100%); display:flex; flex-direction:column; justify-content:space-between; padding:28px 48px 48px; }
.back-btn { display:flex; align-items:center; gap:6px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); color:#fff; padding:9px 18px; border-radius:10px; cursor:pointer; font-size:13px; width:fit-content; transition:background .2s; }
.back-btn:hover { background:rgba(255,255,255,0.14); }
.hero-content h1 { font-size:3rem; font-weight:900; color:#fff; margin:14px 0 20px; line-height:1.1; }
.hero-meta { display:flex; gap:10px; flex-wrap:wrap; }
.meta-pill { display:flex; align-items:center; gap:6px; padding:6px 14px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); border-radius:20px; font-size:12px; color:rgba(255,255,255,0.7); }
.meta-pill.gold { background:rgba(201,168,76,0.15); border-color:rgba(201,168,76,0.3); color:#C9A84C; }
.diff-badge { padding:5px 14px; border-radius:20px; font-size:11px; font-weight:700; text-transform:capitalize; width:fit-content; }
.diff-easy { background:rgba(34,197,94,0.2); color:#22C55E; border:1px solid rgba(34,197,94,0.4); }
.diff-medium { background:rgba(234,179,8,0.2); color:#EAB308; border:1px solid rgba(234,179,8,0.4); }
.diff-hard { background:rgba(239,68,68,0.2); color:#EF4444; border:1px solid rgba(239,68,68,0.4); }
.quick-stats { display:flex; gap:0; border-bottom:1px solid rgba(255,255,255,0.06); overflow-x:auto; }
.stat { display:flex; align-items:center; gap:14px; padding:20px 32px; border-right:1px solid rgba(255,255,255,0.06); flex-shrink:0; }
.stat-val { font-size:15px; font-weight:700; color:#fff; }
.stat-label { font-size:10px; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.1em; margin-top:2px; }
.content-grid { display:grid; grid-template-columns:1fr 400px; gap:40px; padding:48px; max-width:1300px; margin:0 auto; }
.section { margin-bottom:40px; }
.section h2 { display:flex; align-items:center; gap:10px; font-size:1.2rem; font-weight:700; color:#fff; margin-bottom:20px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.06); }
.section p { color:rgba(255,255,255,0.5); line-height:1.85; font-size:14px; }
.bullet-list { display:flex; flex-direction:column; gap:12px; }
.two-col { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.bullet-item { display:flex; align-items:flex-start; gap:10px; font-size:13px; line-height:1.5; }
.bullet-item.green { color:rgba(255,255,255,0.65); }
.bullet-item.green svg { color:#22C55E; flex-shrink:0; margin-top:2px; }
.bullet-item.red { color:rgba(255,255,255,0.5); }
.bullet-item.red svg { color:#EF4444; flex-shrink:0; margin-top:2px; }
.bullet-item.orange { color:rgba(255,255,255,0.55); }
.bullet-item.orange svg { color:#F97316; flex-shrink:0; margin-top:2px; }
.booking-card { background:#0D0D17; border:1px solid rgba(201,168,76,0.2); border-radius:24px; padding:32px; position:sticky; top:24px; }
.price-block { margin-bottom:24px; padding-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.06); }
.price { font-size:2.6rem; font-weight:900; color:#C9A84C; line-height:1; }
.price-sub { font-size:12px; color:rgba(255,255,255,0.3); margin-top:4px; }
.form-group { margin-bottom:18px; }
.form-group label { display:flex; align-items:center; gap:6px; font-size:11px; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:10px; }
.form-input { width:100%; padding:12px 14px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:10px; color:#fff; font-size:13px; outline:none; box-sizing:border-box; }
.form-input:focus { border-color:rgba(201,168,76,0.4); }
.counter { display:flex; align-items:center; gap:16px; }
.counter button { width:38px; height:38px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:10px; color:#fff; font-size:20px; cursor:pointer; transition:background .2s; }
.counter button:hover { background:rgba(255,255,255,0.12); }
.counter span { font-size:20px; font-weight:700; color:#fff; min-width:28px; text-align:center; }
.total-block { display:flex; justify-content:space-between; align-items:center; padding:16px 0; border-top:1px solid rgba(255,255,255,0.06); border-bottom:1px solid rgba(255,255,255,0.06); margin:16px 0 20px; }
.total-block span { font-size:13px; color:rgba(255,255,255,0.4); }
.total-price { font-size:1.8rem; font-weight:900; color:#C9A84C; }
.book-btn { width:100%; padding:16px; background:linear-gradient(135deg,#C9A84C,#E8C96D); color:#000; font-weight:700; font-size:14px; border-radius:14px; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:16px; transition:opacity .2s; }
.book-btn:hover { opacity:0.9; }
.book-btn:disabled { opacity:0.4; cursor:not-allowed; }
.success-msg { display:flex; align-items:center; gap:8px; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.25); color:#22C55E; padding:12px 16px; border-radius:10px; font-size:13px; margin-bottom:16px; }
.error-msg { background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25); color:#EF4444; padding:12px 16px; border-radius:10px; font-size:13px; margin-bottom:16px; }
.card-guarantees { display:flex; flex-direction:column; gap:10px; padding-top:16px; border-top:1px solid rgba(255,255,255,0.06); }
.guarantee { display:flex; align-items:center; gap:8px; font-size:12px; color:rgba(255,255,255,0.35); }
.loading { min-height:100vh; background:#07070C; display:flex; align-items:center; justify-content:center; gap:12px; color:rgba(255,255,255,0.3); font-size:16px; }
@media (max-width:1000px) { .content-grid { grid-template-columns:1fr; padding:24px; } .hero-content h1 { font-size:2rem; } .two-col { grid-template-columns:1fr; } }
</style>
