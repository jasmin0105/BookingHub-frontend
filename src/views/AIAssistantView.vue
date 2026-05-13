<template>
  <div class="min-h-screen bg-[#0A0A0F] pt-20 pb-10">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-3">AI Travel Assistant</h1>
        <p class="text-gray-400">Напишите что хотите — AI спланирует всё за вас</p>
      </div>
      <div class="bg-[#0D0D17] rounded-2xl border border-white/5 overflow-hidden">
        <div ref="messagesContainer" class="h-[500px] overflow-y-auto p-6 space-y-4">
          <div class="flex gap-3">
            <div class="w-9 h-9 rounded-xl bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center flex-shrink-0">
              <span class="text-[#C9A84C] text-sm font-bold">AI</span>
            </div>
            <div class="bg-[#13131F] rounded-2xl px-4 py-3 max-w-lg">
              <p class="text-white text-sm">Привет! Помогу спланировать путешествие по Кыргызстану!</p>
              <p class="text-[#C9A84C] text-xs mt-1">Пример: Хочу выходные на Иссык-Куле бюджет 200 долларов</p>
            </div>
          </div>
          <div v-for="(msg, i) in messages" :key="i">
            <div v-if="msg.role === 'user'" class="flex justify-end">
              <div class="bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.2)] rounded-2xl px-4 py-3 max-w-lg">
                <p class="text-white text-sm">{{ msg.content }}</p>
              </div>
            </div>
            <div v-else class="flex gap-3">
              <div class="w-9 h-9 rounded-xl bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center flex-shrink-0">
                <span class="text-[#C9A84C] text-sm font-bold">AI</span>
              </div>
              <div class="bg-[#13131F] rounded-2xl px-4 py-3 max-w-lg">
                <p class="text-white text-sm whitespace-pre-wrap">{{ msg.content }}</p>
              </div>
            </div>
          </div>
          <div v-if="loading" class="flex gap-3">
            <div class="w-9 h-9 rounded-xl bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center flex-shrink-0">
              <span class="text-[#C9A84C] text-sm font-bold">AI</span>
            </div>
            <div class="bg-[#13131F] rounded-2xl px-4 py-3">
              <div class="flex gap-1">
                <div class="w-2 h-2 bg-[#C9A84C] rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-[#C9A84C] rounded-full animate-bounce" style="animation-delay:150ms"></div>
                <div class="w-2 h-2 bg-[#C9A84C] rounded-full animate-bounce" style="animation-delay:300ms"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-white/5 p-4">
          <div class="flex gap-3">
            <input v-model="input" @keyup.enter="sendMessage" :disabled="loading" placeholder="Напишите на русском или кыргызском..." class="flex-1 bg-[#13131F] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[rgba(201,168,76,0.4)] transition-all" />
            <button @click="sendMessage" :disabled="loading" class="px-5 py-3 bg-[#C9A84C] disabled:opacity-50 text-black font-bold rounded-xl text-sm">
              {{ loading ? '...' : 'Отправить' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
const input = ref('')
const messages = ref([])
const loading = ref(false)
const messagesContainer = ref(null)
const sys = 'Ты AI Travel Assistant BookingHub Кыргызстан. ОТЕЛИ: Grand Bishkek 120, Hyatt 180, Jannat 95, Issyk-Kul Resort 85, Silk Road 60 за ночь. ТУРЫ: Иссык-Куль 3дня 150, Ала-Арча 1день 45, Song-Kol 2дня 130, Karakol Ski 3дня 180, Burana 1день 35. РЕСТОРАНЫ: Navat, Supara, Cyclone, Furusato. Отвечай на языке пользователя. Предлагай конкретные планы с ценами.'
const scroll = async () => {
  await nextTick()
  if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
}
const sendMessage = async () => {
  const msg = input.value.trim()
  if (!msg || loading.value) return
  input.value = ''
  messages.value.push({ role: 'user', content: msg })
  loading.value = true
  await scroll()
  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (import.meta.env.VITE_OPENROUTER_API_KEY || ''),
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'BookingHub'
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-super-120b-a12b:free',
        messages: [
          { role: 'system', content: sys },
          ...messages.value.slice(0, -1).map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: msg }
        ]
      })
    })
    const d = await r.json()
    console.log('API response:', JSON.stringify(d))
    if (d.choices && d.choices[0]) {
      messages.value.push({ role: 'assistant', content: d.choices[0].message.content })
    } else {
      messages.value.push({ role: 'assistant', content: 'Ошибка: ' + JSON.stringify(d) })
    }
  } catch (e) {
    console.log('Error:', e)
    messages.value.push({ role: 'assistant', content: 'Ошибка: ' + e.message })
  } finally {
    loading.value = false
    await scroll()
  }
}
</script>