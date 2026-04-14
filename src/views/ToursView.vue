<template>
  <div class="tours-page">
    <div class="page-header">
      <div class="eyebrow">DISCOVER</div>
      <h1 class="page-title">Tours & Excursions</h1>
      <p class="page-sub">Unforgettable experiences across Kyrgyzstan</p>
    </div>

    <div class="filters-bar">
      <input v-model="search" class="search-input" placeholder="Search tours..." />
      <select v-model="difficulty" class="filter-select">
        <option value="">All Difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <select v-model="sortBy" class="filter-select">
        <option value="">Sort by</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
        <option value="duration">Shortest First</option>
      </select>
    </div>

    <div class="tours-count">{{ filtered.length }} tours found</div>

    <div class="tours-grid">
      <div v-for="tour in filtered" :key="tour.id" class="tour-card" @click="$router.push(`/tours/${tour.id}`)">
        <div class="card-image">
          <img v-if="tour.image_url" :src="tour.image_url" :alt="tour.name" />
          <div v-else class="card-placeholder">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            </svg>
          </div>
          <span :class="['diff-badge', `diff-${tour.difficulty}`]">{{ tour.difficulty }}</span>
          <span class="rating-badge">★ {{ tour.rating }}</span>
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span class="meta-item">📍 {{ tour.city }}</span>
            <span class="meta-item">⏱ {{ tour.duration }} {{ tour.duration === 1 ? 'day' : 'days' }}</span>
            <span class="meta-item">👥 Max {{ tour.max_people }}</span>
          </div>
          <h3 class="card-title">{{ tour.name }}</h3>
          <p class="card-desc">{{ tour.description }}</p>
          <div v-if="tour.includes" class="includes">
            <span class="includes-label">Includes:</span> {{ tour.includes }}
          </div>
          <div class="card-footer">
            <div class="price">${{ tour.price }}<span>/person</span></div>
            <button class="view-btn">View Details →</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../api'

const tours      = ref([])
const search     = ref('')
const difficulty = ref('')
const sortBy     = ref('')

onMounted(async () => {
  const res = await api.get('/tours/')
  tours.value = res.data
})

const filtered = computed(() => {
  let list = [...tours.value]
  if (search.value)     list = list.filter(t => t.name.toLowerCase().includes(search.value.toLowerCase()) || t.city.toLowerCase().includes(search.value.toLowerCase()))
  if (difficulty.value) list = list.filter(t => t.difficulty === difficulty.value)
  if (sortBy.value === 'price_asc')  list.sort((a,b) => a.price - b.price)
  if (sortBy.value === 'price_desc') list.sort((a,b) => b.price - a.price)
  if (sortBy.value === 'rating')     list.sort((a,b) => b.rating - a.rating)
  if (sortBy.value === 'duration')   list.sort((a,b) => a.duration - b.duration)
  return list
})
</script>

<style scoped>
.tours-page { min-height:100vh; background:#07070C; padding-bottom:60px; }
.page-header { padding:48px 40px 32px; background:linear-gradient(180deg,rgba(201,168,76,0.08) 0%,transparent 100%); border-bottom:1px solid rgba(255,255,255,0.06); }
.eyebrow { font-size:10px; font-weight:700; letter-spacing:0.25em; text-transform:uppercase; color:#C9A84C; margin-bottom:8px; }
.page-title { font-size:2.8rem; font-weight:900; color:#fff; margin-bottom:8px; }
.page-sub { font-size:15px; color:rgba(255,255,255,0.4); }
.filters-bar { display:flex; gap:12px; padding:24px 40px; flex-wrap:wrap; }
.search-input { flex:1; min-width:220px; padding:11px 16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:10px; color:#fff; font-size:13px; outline:none; }
.search-input::placeholder { color:rgba(255,255,255,0.25); }
.filter-select { padding:11px 16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:10px; color:#fff; font-size:13px; outline:none; cursor:pointer; }
.tours-count { padding:0 40px 16px; font-size:13px; color:rgba(255,255,255,0.3); }
.tours-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:20px; padding:0 40px; }
.tour-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:16px; overflow:hidden; transition:transform .2s,border-color .2s; cursor:pointer; }
.tour-card:hover { transform:translateY(-4px); border-color:rgba(201,168,76,0.3); }
.card-image { position:relative; height:220px; background:#0D0D17; overflow:hidden; }
.card-image img { width:100%; height:100%; object-fit:cover; transition:transform .3s; }
.tour-card:hover .card-image img { transform:scale(1.05); }
.card-placeholder { width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.15); }
.diff-badge { position:absolute; top:12px; left:12px; padding:4px 10px; border-radius:20px; font-size:10px; font-weight:700; text-transform:capitalize; }
.diff-easy { background:rgba(34,197,94,0.2); color:#22C55E; border:1px solid rgba(34,197,94,0.3); }
.diff-medium { background:rgba(234,179,8,0.2); color:#EAB308; border:1px solid rgba(234,179,8,0.3); }
.diff-hard { background:rgba(239,68,68,0.2); color:#EF4444; border:1px solid rgba(239,68,68,0.3); }
.rating-badge { position:absolute; top:12px; right:12px; padding:4px 10px; background:rgba(201,168,76,0.15); border:1px solid rgba(201,168,76,0.3); border-radius:20px; font-size:11px; font-weight:700; color:#C9A84C; }
.card-body { padding:18px; }
.card-meta { display:flex; gap:12px; margin-bottom:10px; flex-wrap:wrap; }
.meta-item { font-size:11px; color:rgba(255,255,255,0.35); }
.card-title { font-size:1.15rem; font-weight:700; color:#fff; margin-bottom:8px; }
.card-desc { font-size:12px; color:rgba(255,255,255,0.4); line-height:1.6; margin-bottom:10px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.includes { font-size:11px; color:rgba(255,255,255,0.3); margin-bottom:14px; line-height:1.5; }
.includes-label { color:#C9A84C; font-weight:600; }
.card-footer { display:flex; align-items:center; justify-content:space-between; }
.price { font-size:1.3rem; font-weight:700; color:#C9A84C; }
.price span { font-size:11px; color:rgba(255,255,255,0.3); font-weight:400; }
.view-btn { padding:8px 18px; background:linear-gradient(135deg,#C9A84C,#E8C96D); color:#000; font-weight:700; font-size:12px; border-radius:8px; border:none; cursor:pointer; }
</style>
