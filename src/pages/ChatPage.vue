<template>
  <div class="q-pt-md" id="chat">
    <div class="row no-wrap full-height" id="chat-container">
      <div class="col-12 col-md-8">
        <q-card class="full-height">
          <q-card-section class="q-pa-none full-height column no-wrap">
            <q-scroll-area class="col" style="min-height: 35vw;">
              <q-chat-message class="q-pa-sm" v-for="message in chatsStore.curretChatMessages" :key="message.id"
                :text="[message.message]" :sent="message.sender._id === authId" />
            </q-scroll-area>

            <q-toolbar class="bg-grey-3 text-black row">
              <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white"
                v-model="messageField" placeholder="Type a message" v-on:keyup.enter="handleSendMessage"
                :readonly="chatsStore.currentChatId.length == 0" />
              <q-btn round flat icon="send" @click="handleSendMessage" />
            </q-toolbar>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4 q-pl-md">
        <q-list bordered separator id="chats-list">
          <h5 class="text-center">All Chats</h5>
          <q-item v-for="chat in chatsStore.chats" :key="chat._id" clickable v-ripple @click="handleSelectedChat(chat)"
            :class="chatsStore.currentChatId == chat._id ? 'bg-primary text-white' : ''">
            <q-item-section>
              <q-item-label>{{ chat.job.title }}</q-item-label>
              <q-item-label caption :class="chatsStore.currentChatId == chat._id ? 'text-white' : ''">{{
                chat.profile.title
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatsStore } from '../stores/chat';
import { ref } from 'vue';

const authId = '0002';
const chatsStore = useChatsStore();
const messageField = ref('')
const handleSelectedChat = (chat: any) => {
  chatsStore.curretChatMessages = chat.messages;
  chatsStore.currentChatId = chat._id;
}


const handleSendMessage = () => {
  if (messageField.value.length > 0) {
    chatsStore.sendMessage(messageField.value);

    messageField.value = '';
  }
}

</script>
