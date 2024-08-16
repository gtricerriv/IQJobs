<template>
    <q-dialog v-model="showChat" persistent position="bottom-left" auto-close="10000">
      <q-card style="min-width: 350px; max-width: 400px">
        <q-card-section>
          <q-chat-message
            :text="['Have you seen Quasar?']"
            sent
            text-color="white"
            bg-color="primary"
          >
            <template v-slot:name>me</template>
            <template v-slot:stamp>7 minutes ago</template>
            <template v-slot:avatar>
              <img
                class="q-message-avatar q-message-avatar--sent"
                src="https://cdn.quasar.dev/img/avatar4.jpg"
              >
            </template>
          </q-chat-message>
  
          <q-chat-message
            v-for="(msg, index) in messages"
            :key="index"
            :text="msg.text"
            :sent="msg.sent"
            :bg-color="msg.sent ? 'primary' : 'amber'"
          >
            <template v-slot:name>{{ msg.name }}</template>
            <template v-slot:avatar>
              <img
                class="q-message-avatar"
                :src="msg.avatar"
              >
            </template>
          </q-chat-message>
  
          <q-input
            v-model="newMessage"
            label="Type a message"
            @keyup.enter="sendMessage"
            autofocus
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const showChat = ref(true);
  const newMessage = ref('');
  const messages = ref([
    {
      text: 'Already building an app with it...',
      name: 'Mary',
      avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
      sent: false,
    },
  ]);
  
  const sendMessage = () => {
    if (newMessage.value.trim() !== '') {
      messages.value.push({
        text: newMessage.value,
        name: 'me',
        avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
        sent: true,
      });
      newMessage.value = '';
      // Simulate an auto-response
      setTimeout(() => {
        messages.value.push({
          text: 'Thank you for your message!',
          name: 'Bot',
          avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
          sent: false,
        });
      }, 1000);
    }
  };
  </script>
  
  <style scoped>
  .q-dialog {
    z-index: 9999; /* Asegúrate de que el z-index es alto */
  }
  
  .chat-popup-card {
    min-width: 350px;
    max-width: 400px;
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 1rem;
  }
  </style>