<template>
  <div class="max-w-2xl mx-auto h-screen flex flex-col bg-white border rounded-lg shadow-lg overflow-hidden">
    <!-- Chat messages -->
    <div ref="scrollTarget" class="flex-1 overflow-y-auto p-4 space-y-2">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="msg.username === username ? 'text-right' : 'text-left'"
      >
        <div
          :class="[
            'inline-block px-4 py-2 rounded-xl max-w-xs break-words',
            msg.username === username
              ? 'bg-green-500 text-white ml-auto'
              : 'bg-gray-200 text-gray-800 mr-auto'
          ]"
        >
          <span class="block text-xs text-gray-500 mb-1" v-if="msg.username !== username">{{ msg.username }}</span>
          {{ msg.content }}
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div class="p-4 border-t flex gap-2">
      <input
        v-model="message"
        @keyup.enter="sendMessage"
        type="text"
        placeholder="Ketik pesan..."
        class="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        @click="sendMessage"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
      >
        Kirim
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Pusher from 'pusher-js'

const messages = ref([])
const message = ref('')
const scrollTarget = ref(null)

const username = 'User' + Math.floor(Math.random() * 1000)

const sendMessage = async () => {
  if (!message.value.trim()) return

  await fetch('/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message.value, username }),
  })

  message.value = ''
}

const scrollToBottom = () => {
  nextTick(() => {
    scrollTarget.value.scrollTop = scrollTarget.value.scrollHeight
  })
}

onMounted(() => {
  const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
    cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  })

  pusher.connection.bind('connected', () => {
    console.log('✅ Connected to Pusher!')
  })

  const channel = pusher.subscribe('chatroom')
  channel.bind('new-message', function (data) {
    console.log('📥 Received from Pusher:', data)
    messages.value.push(data)
  })
})
</script>
