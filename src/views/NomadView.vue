<template>
  <div class="min-h-screen bg-[#0A0A0F] pt-20 pb-10">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.08)] mb-4">
          <span class="text-[#C9A84C] text-sm font-bold">🏕️ NOMAD EXPERIENCE</span>
        </div>
        <h1 class="text-5xl font-bold text-white mb-4">Стань настоящим кочевником</h1>
        <p class="text-gray-400 text-xl max-w-2xl mx-auto">Уникальные пакеты для иностранных туристов — юрта, национальная еда, конная прогулка и горные приключения в одном клике</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-20">
        <div class="w-12 h-12 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>

      <!-- Packages Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="pkg in packages" :key="pkg.id" class="bg-[#0D0D17] rounded-2xl border border-white/5 overflow-hidden hover:border-[rgba(201,168,76,0.3)] transition-all group">
          <!-- Image -->
          <div class="relative h-56 overflow-hidden">
            <img :src="pkg.image" :alt="pkg.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0D0D17] to-transparent"></div>
            <div class="absolute top-4 left-4 flex gap-2">
              <span class="px-3 py-1 bg-[rgba(201,168,76,0.9)] text-black text-xs font-bold rounded-full">{{ pkg.duration_days }} дней</span>
              <span class="px-3 py-1 bg-black/60 text-white text-xs rounded-full">{{ pkg.difficulty }}</span>
            </div>
            <div class="absolute bottom-4 right-4">
              <span class="text-3xl font-bold text-[#C9A84C]">${{ pkg.price }}</span>
              <span class="text-gray-400 text-sm">/чел</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2">{{ pkg.name }}</h3>
            <p class="text-gray-400 text-sm mb-4 leading-relaxed">{{ pkg.description }}</p>

            <!-- Location -->
            <div class="flex items-center gap-2 mb-4">
              <span class="text-[#C9A84C]">📍</span>
              <span class="text-gray-300 text-sm">{{ pkg.location }}</span>
              <span class="text-gray-500 text-sm ml-auto">до {{ pkg.max_people }} чел</span>
            </div>

            <!-- Includes -->
            <div class="flex gap-3 mb-6">
              <span v-if="pkg.includes_yurt" class="px-3 py-1 bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] text-[#C9A84C] text-xs rounded-full">🏕️ Юрта</span>
              <span v-if="pkg.includes_food" class="px-3 py-1 bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] text-[#C9A84C] text-xs rounded-full">🍖 Еда</span>
              <span v-if="pkg.includes_horse" class="px-3 py-1 bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] text-[#C9A84C] text-xs rounded-full">🐴 Лошадь</span>
              <span v-if="pkg.includes_guide" class="px-3 py-1 bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] text-[#C9A84C] text-xs rounded-full">🧭 Гид</span>
            </div>

            <!-- Highlights -->
            <div class="mb-6">
              <p class="text-gray-500 text-xs mb-2">Включено:</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="h in pkg.highlights.split(',')" :key="h" class="text-gray-400 text-xs">✓ {{ h.trim() }}</span>
              </div>
            </div>

            <!-- Book Button -->
            <button @click="openBooking(pkg)" class="w-full py-3 bg-[#C9A84C] hover:bg-[#d4b665] text-black font-bold rounded-xl transition-all">
              Забронировать пакет
            </button>
          </div>
        </div>
      </div>

      <!-- Booking Modal -->
      <div v-if="selectedPackage" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
        <div class="bg-[#0D0D17] rounded-2xl border border-white/10 p-8 max-w-md w-full">
          <h3 class="text-2xl font-bold text-white mb-2">{{ selectedPackage.name }}</h3>
          <p class="text-[#C9A84C] text-xl font-bold mb-6">${{ selectedPackage.price }} / человек</p>

          <div class="space-y-4 mb-6">
            <div>
              <label class="text-gray-400 text-sm mb-2 block">Дата начала</label>
              <input v-model="bookingDate" type="date" class="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[rgba(201,168,76,0.4)]" />
            </div>
            <div>
              <label class="text-gray-400 text-sm mb-2 block">Количество людей</label>
              <input v-model="bookingPeople" type="number" min="1" :max="selectedPackage.max_people" class="w-full bg-[#13131F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[rgba(201,168,76,0.4)]" />
            </div>
          </div>

          <div class="bg-[#13131F] rounded-xl p-4 mb-6">
            <div class="flex justify-between text-gray-400 text-sm mb-2">
              <span>${{ selectedPackage.price }} x {{ bookingPeople }} чел</span>
              <span>${{ selectedPackage.price * bookingPeople }}</span>
            </div>
            <div class="flex justify-between text-white font-bold">
              <span>Итого</span>
              <span class="text-[#C9A84C]">${{ selectedPackage.price * bookingPeople }}</span>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="selectedPackage = null" class="flex-1 py-3 border border-white/10 text-white rounded-xl hover:border-white/30 transition-all">Отмена</button>
            <button @click="confirmBooking" class="flex-1 py-3 bg-[#C9A84C] text-black font-bold rounded-xl hover:bg-[#d4b665] transition-all">Подтвердить</button>
          </div>
        </div>
      </div>

      <!-- Success -->
      <div v-if="success" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div class="bg-[#0D0D17] rounded-2xl border border-[rgba(201,168,76,0.3)] p-8 text-center max-w-sm">
          <div class="text-6xl mb-4">🎉</div>
          <h3 class="text-2xl font-bold text-white mb-2">Забронировано!</h3>
          <p class="text-gray-400 mb-6">Ваш Nomad Experience подтверждён. Приготовьтесь к незабываемому приключению!</p>
          <button @click="success = false" class="px-8 py-3 bg-[#C9A84C] text-black font-bold rounded-xl">Отлично!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
const api = axios.create({ baseURL: "http://localhost:8001/api" })

const packages = ref([])
const loading = ref(true)
const selectedPackage = ref(null)
const bookingDate = ref("")
const bookingPeople = ref(1)
const success = ref(false)

onMounted(async () => {
  try {
    const res = await api.get("/nomad/packages/")
    packages.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

const openBooking = (pkg) => {
  selectedPackage.value = pkg
  bookingPeople.value = 1
  bookingDate.value = ""
}

const confirmBooking = async () => {
  try {
    await api.post("/nomad/bookings/", {
      package: selectedPackage.value.id,
      date: bookingDate.value,
      people: bookingPeople.value
    })
    selectedPackage.value = null
    success.value = true
  } catch (e) {
    alert("Пожалуйста войдите в аккаунт чтобы забронировать")
  }
}
</script>