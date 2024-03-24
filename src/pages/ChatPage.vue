<template>
  <div class="q-pt-md" id="chat">
    <div class="row no-wrap full-height" id="chat-container">
      <div class="col-12 col-md-8">
        <q-card class="full-height">
          <q-card-section class="q-pa-none full-height column no-wrap">
            <q-scroll-area class="col">
              <q-chat-message class="q-pa-sm" v-for="message in chatMessages" :key="message.id"
                :text="[message.message]" :sent="message.sender._id === authId" />
            </q-scroll-area>

            <q-toolbar class="bg-grey-3 text-black row">
              <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message"
                placeholder="Type a message" />
              <q-btn round flat icon="send" />
            </q-toolbar>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4 q-pl-md">
        <q-list bordered separator id="chats-list">
          <h5 class="text-center">All Chats</h5>
          <q-item v-for="chat in arrayChats" :key="chat" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ chat.job_title }}</q-item-label>
              <q-item-label caption>{{ chat.profile }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const authId = '0002';

const arrayChats = [
  {
    _id: 1,
    job_title: 'UIX designer',
    profile: 'System developer',
  },
  {
    _id: 2,
    job_title: 'Java developer',
    profile: 'Data entry',
  },
  {
    _id: 3,
    job_title: 'Data analysis',
    profile: 'Data analysis',
  },
  {
    _id: 4,
    job_title: 'PHP Fullstack developer',
    profile: 'PHP developer',
  },
  {
    _id: 5,
    job_title: 'Java developer',
    profile: 'Java developer',
  },
  {
    _id: 6,
    job_title: 'Django Developer',
    profile: 'Python developer',
  },
  {
    _id: 7,
    job_title: 'Tracking things',
    profile: 'Tracking developer',
  },
  {
    _id: 8,
    job_title: 'Assistant',
    profile: 'Project manager',
  },
  {
    _id: 9,
    job_title: 'Figma Designer',
    profile: 'UI/UX designer',
  },
]

const chatMessages = [
  {
    _id: 1,
    sender: {
      name: 'John Doe',
      _id: '0001',
    },
    recipient: {
      name: 'Marcos Juxh',
      _id: authId,
    },
    message: 'Hello',
    date: '2022-01-01',
  },
  {
    _id: 2,
    sender: {
      name: 'John Doe',
      _id: '0001',
    },
    recipient: {
      name: 'Marcos Juxh',
      _id: authId,
    },
    message: 'How are you?',
    date: '2022-01-01',
  },
  {
    _id: 3,
    sender: {
      name: 'Marcos Juxh',
      _id: authId,
    },
    recipient: {
      name: 'John Doe',
      _id: '0001',
    },
    message: 'I am good. What about you?',
    date: '2022-01-01',
  },
  {
    _id: 4,
    sender: {
      name: 'John Doe',
      _id: '0001',
    },
    recipient: {
      name: 'Marcos Juxh',
      _id: authId,
    },
    message: 'Im fine, testing this app',
    date: '2022-01-01',
  },
  {
    _id: 3,
    sender: {
      name: 'Marcos Juxh',
      _id: authId,
    },
    recipient: {
      name: 'John Doe',
      _id: '0001',
    },
    message: 'Wonderful!!',
    date: '2022-01-01',
  },
  {
    _id: 3,
    sender: {
      name: 'Marcos Juxh',
      _id: authId,
    },
    recipient: {
      name: 'John Doe',
      _id: '0001',
    },
    message: 'Wonderful!!',
    date: '2022-01-01',
  },
  {
    _id: 3,
    sender: {
      name: 'Marcos Juxh',
      _id: authId,
    },
    recipient: {
      name: 'John Doe',
      _id: '0001',
    },
    message: 'Wonderful!!',
    date: '2022-01-01',
  },
  {
    _id: 3,
    sender: {
      name: 'Marcos Juxh',
      _id: authId,
    },
    recipient: {
      name: 'John Doe',
      _id: '0001',
    },
    message: 'Wonderful!!',
    date: '2022-01-01',
  },
  {
    _id: 3,
    sender: {
      name: 'Marcos Juxh',
      _id: authId,
    },
    recipient: {
      name: 'John Doe',
      _id: '0001',
    },
    message: 'Wonderful!!',
    date: '2022-01-01',
  },
  {
    _id: 3,
    sender: {
      name: 'Marcos Juxh',
      _id: authId,
    },
    recipient: {
      name: 'John Doe',
      _id: '0001',
    },
    message: 'Wonderful!!',
    date: '2022-01-01',
  },
  {
    _id: 3,
    sender: {
      name: 'Marcos Juxh',
      _id: authId,
    },
    recipient: {
      name: 'John Doe',
      _id: '0001',
    },
    message: 'Wonderful!!',
    date: '2022-01-01',
  },
]

</script>
