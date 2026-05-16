<template>
  <div class="min-h-screen bg-[#0A0A0F] pt-20 pb-10">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)] mb-4">
          <span class="text-[#C9A84C] text-sm font-bold">🧭 LOCAL GUIDES</span>
        </div>
        <h1 class="text-5xl font-bold text-white mb-4">Местные гиды Кыргызстана</h1>
        <p class="text-gray-400 text-xl max-w-2xl mx-auto">Профессиональные гиды которые знают каждую тропу, каждую легенду и каждый вкус национальной кухни</p>
      </div>

      <div v-if="loading" class="text-center py-20">
        <div class="w-12 h-12 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="guide in guides" :key="guide.id" class="bg-[#0D0D17] rounded-2xl border border-white/5 overflow-hidden hover:border-[rgba(201,168,76,0.3)] transition-all group">
          <div class="relative h-48 overflow-hidden">
            <img :src="guide.photo" :alt="guide.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0D0D17] to-transparent"></div>
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 bg-[rgba(201,168,76,0.9)] text-black text-xs font-bold rounded-full">⭐ {{ guide.rating }}</span>
            </div>
            <div class="absolute bottom-4 left-4">
              <span class="text-2xl font-bold text-[#C9A84C]">${{ guide.price_per_day }}</span>
              <span class="text-gray-400 text-xs">/день</span>
            </div>
          </div>

          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-1">{{ guide.name }}</h3>
            <div class="flex items-center gap-2 mb-3">
              <span class="text-[#C9A84C] text-xs">📍 {{ guide.location }}</span>
              <span class="text-gray-500 text-xs">• {{ guide.experience_years }} лет опыта</span>
            </div>
            <p class="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">{{ guide.bio }}</p>

            <div class="mb-4">
              <p class="text-gray-500 text-xs mb-2">Языки:</p>
              <p class="text-gray-300 text-sm">{{ guide.languages }}</p>
            </div>

            <div class="mb-6">
              <span class="px-3 py-1 bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] text-[#C9A84C] text-xs rounded-full">{{ guide.specialization }}</span>
            </div>

            <button @click="contactGuide(guide)" class="w-full py-3 bg-[#C9A84C] hover:bg-[#d4b665] text-black font-bold rounded-xl transition-all">
              Нанять гида
            </button>
          </div>
        </div>
      </div>

      <div v-if="selectedGuide" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
        <div class="bg-[#0D0D17] rounded-2xl border border-white/10 p-8 max-w-md w-full">
          <div class="flex items-center gap-4 mb-6">
            <img :src="selectedGuide.photo" class="w-16 h-16 rounded-full object-cover" />
            <div>
              <h3 class="text-xl font-bold text-white">{{ selectedGuide.name }}</h3>
              <p class="text-[#C9A84C]">${{ selectedGuide.price_per_day }} / день</p>
            </div>
          </div>

          <div class="space-y-4 mb-6">
            <div>
              <label class="text-gray-400 text-sm mb-2 block">Дата начала</label>
              <input v-model="bookingDate" type="date" class="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[rgba(201,168,76,0.4)]" />
            </div>
            <div>
              <label class="text-gray-400 text-sm mb-2 block">Количество дней</label>
              <input v-model="bookingDays" type="number" min="1" max="30" class="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[rgba(201,168,76,0.4)]" />
            </div>
          </div>

          <div class="bg-[#13131F] rounded-xl p-4 mb-6">
            <div class="flex justify-between text-white font-bold">
              <span>Итого</span>
              <span class="text-[#C9A84C]">${{ selectedGuide.price_per_day * bookingDays }}</span>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="selectedGuide = null" class="flex-1 py-3 border border-white/10 text-white rounded-xl hover:border-white/30 transition-all">Отмена</button>
            <button @click="confirmBooking" class="flex-1 py-3 bg-[#C9A84C] text-black font-bold rounded-xl hover:bg-[#d4b665] transition-all">Подтвердить</button>
          </div>
        </div>
      </div>

      <div v-if="success" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div class="bg-[#0D0D17] rounded-2xl border border-[rgba(201,168,76,0.3)] p-8 text-center max-w-sm">
          <div class="text-6xl mb-4">🎉</div>
          <h3 class="text-2xl font-bold text-white mb-2">Гид нанят!</h3>
          <p class="text-gray-400 mb-6">Ваш гид свяжется с вами в ближайшее время. Готовьтесь к незабываемому путешествию!</p>
          <button @click="success = false" class="px-8 py-3 bg-[#C9A84C] text-black font-bold rounded-xl">Отлично!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const api = axios.create({ baseURL: "https://bookinghub-a69i.onrender.com/api" })
const guides = ref([])
const loading = ref(true)
const selectedGuide = ref(null)
const bookingDate = ref("")
const bookingDays = ref(1)
const success = ref(false)

onMounted(async () => {
  try {
    const res = await api.get("/guides/")
    guides.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const contactGuide = (guide) => {
  selectedGuide.value = guide
  bookingDate.value = ""
  bookingDays.value = 1
}

const confirmBooking = () => {
  selectedGuide.value = null
  success.value = true
}
</script>