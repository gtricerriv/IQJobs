import { defineStore } from 'pinia';
import axios from 'axios';
const authId = '0002';
export const useChatsStore = defineStore('chat', {
  state: () => ({
    currentChatId: '',
    chats: [
      {
        _id: 1,
        job_id: 'xt001',
        job_title: 'UIX designer',
        profile: 'System developer',
        messages: [
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
        ],
      },
      {
        _id: 2,
        job_title: 'Java developer',
        job_id: 'xt002',
        profile: 'Data entry',
        messages: [
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
            message: 'Hello Java developer',
            date: '2022-01-01',
          },
          {
            _id: 2,
            sender: {
              name: 'Marcos Juxh',
              _id: authId,
            },
            recipient: {
              name: 'John Doe',
              _id: '0001',
            },
            message: 'Yes im interested in be a Java developer',
            date: '2022-01-01',
          },
        ],
      },
      {
        _id: 3,
        job_id: 'xt003',
        job_title: 'Data analysis',
        profile: 'Data analysis',
        messages: [
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
            message: 'Hello Data analysis',
            date: '2022-01-01',
          },
          {
            _id: 2,
            sender: {
              name: 'Marcos Juxh',
              _id: authId,
            },
            recipient: {
              name: 'John Doe',
              _id: '0001',
            },
            message: 'Yes im interested in be a Data analysis',
            date: '2022-01-01',
          },
        ],
      },
      {
        _id: 4,
        job_id: 'xt005',
        job_title: 'PHP Fullstack developer',
        profile: 'PHP developer',
        messages: [
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
            message: 'Hello PHP Fullstack developer',
            date: '2022-01-01',
          },
          {
            _id: 2,
            sender: {
              name: 'Marcos Juxh',
              _id: authId,
            },
            recipient: {
              name: 'John Doe',
              _id: '0001',
            },
            message: 'Yes im interested in be a PHP Fullstack developer',
            date: '2022-01-01',
          },
        ],
      },
    ],
    curretChatMessages: [],
  }),
  getters: {},
  actions: {
    async sendMessage(message: string) {
      try {
        const body = {
          chat_id: this.currentChatId,
          message: 'Yes im interested in be a PHP Fullstack developer',
        };

        // TODO: remover luego y agregar el endpoint adecuado
        // const baseUrl =
        //   process.env.NODE_ENV === 'production'
        //     ? 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/'
        //     : 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/';

        // const { data } = await axios.post(baseUrl, body);

        console.log('Mensaje enviado correctamente', body);

        this.curretChatMessages.push({
          _id: Date.now(),
          sender: {
            name: 'Marcos Juxh',
            _id: authId,
          },
          recipient: {
            name: 'John Doe',
            _id: '0001',
          },
          message: message,
          date: '2022-01-01',
        });
      } catch (error) {
        console.error(error);
        throw new Error('Error al ocrear un nuevo trabajo');
      }
    },
  },
});
