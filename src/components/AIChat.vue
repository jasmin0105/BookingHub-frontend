<template>
  <div class="ai-chat-wrapper">
    <div v-if="isOpen" class="chat-box">
      <div class="chat-header">
        <span>BookingHub AI Assistant</span>
        <button @click="isOpen = false">×</button>
      </div>
      <div class="messages" ref="msgContainer">
        <div v-for="m in messages" :key="m.id" :class="['msg', m.role]">
          {{ m.text }}
        </div>
      </div>
      <div class="input-area">
        <input v-model="input" @keyup.enter="send" placeholder="How can I help you?" />
        <button @click="send">Send</button>
      </div>
    </div>
    <button @click="isOpen = !isOpen" class="toggle-btn">
      <span v-if="!isOpen">🤖 AI Help</span>
      <span v-else>Close</span>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import axios from 'axios';

const isOpen = ref(false);
const input = ref('');
const messages = ref([{ id: 1, role: 'ai', text: 'Welcome to Kyrgyzstan! I can find hotels, tours, or events for you. What is your plan?' }]);
const msgContainer = ref(null);

const send = async () => {
  if (!input.value.trim()) return;
  const userText = input.value;
  messages.value.push({ id: Date.now(), role: 'user', text: userText });
  input.value = '';

  try {
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You are a travel assistant for BookingHub platform in Kyrgyzstan. Help users find hotels and tours." }, { role: "user", content: userText }]
    }, {
      headers: { 'Authorization': 'Bearer YOUR_OPENAI_API_KEY' }
    });
    messages.value.push({ id: Date.now(), role: 'ai', text: res.data.choices[0].message.content });
    await nextTick();
    msgContainer.value.scrollTop = msgContainer.value.scrollHeight;
  } catch (e) {
    messages.value.push({ id: Date.now(), role: 'ai', text: 'Error connecting to AI. Check API key.' });
  }
};
</script>

<style scoped>
.ai-chat-wrapper { position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: sans-serif; }
.chat-box { width: 320px; height: 450px; background: white; border-radius: 12px; box-shadow: 0 5px 25px rgba(0,0,0,0.2); display: flex; flex-direction: column; overflow: hidden; margin-bottom: 10px; }
.chat-header { background: #1a73e8; color: white; padding: 12px; display: flex; justify-content: space-between; align-items: center; }
.messages { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; background: #f8f9fa; }
.msg { padding: 8px 12px; border-radius: 8px; max-width: 80%; font-size: 14px; }
.user { align-self: flex-end; background: #1a73e8; color: white; }
.ai { align-self: flex-start; background: #e8eaed; color: #3c4043; }
.input-area { padding: 10px; border-top: 1px solid #eee; display: flex; gap: 5px; }
.input-area input { flex: 1; border: 1px solid #ddd; border-radius: 4px; padding: 5px; }
.toggle-btn { background: #1a73e8; color: white; border: none; padding: 10px 20px; border-radius: 50px; cursor: pointer; font-weight: bold; }
</style>
