import { defineStore } from 'pinia';
import axios from 'axios';
const authId = '0002';
export const useChatsStore = defineStore('chat', {
  state: () => ({
    currentChatId: '',
    currentChat: {},
    chats: [
      {
        _id: 1,
        job: {
          _id: '65eb67c89813f55ead7df912',
          title: 'Content Writer',
          description:
            '<h2>Content Writer</h2><p><strong>Job Summary:</strong> The Content Wr…',
        },
        profile: {
          _id: '65ef1e9a9a7913a08f216858',
          title: 'Mr.',
          first_name: 'Erick',
          last_name: 'Gonzalez',
          cover_letter:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          skills: 'JavaScript, HTML, CSS',
          area: 'Web Development',
          education: "Bachelor's Degree in Computer Science",
          experience: '5 years of experience in software development',
          projects: 'Developed a web application for a startup company',
          contact: 'erickg@gmail.com',
          premium: true,
          IsRecruiter: true,
        },
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
        job: {
          _id: '65eb69989813f55ead7df926',
          title: 'Sales Manager',
          description:
            'The Sales Manager will lead the sales team and develop sales strategies to achieve revenue goals.',
        },
        profile: {
          _id: '65ef1e9a9a7913a08f216858',
          title: 'Mr.',
          first_name: 'John',
          last_name: 'Doe',
          cover_letter:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          skills: 'Python, Django, SQL',
          area: 'Software Engineering',
          education: "Master's Degree in Computer Science",
          experience: '7 years of experience in backend development',
          projects: 'Led a team to develop a large-scale web application',
          contact: 'johndoe@example.com',
        },
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
        job: {
          _id: '65eb69989813f55ead7df922',
          title: 'Financial Analyst',
          description:
            'The Financial Analyst will analyze financial data and provide insights to support strategic decision-making.',
        },
        profile: {
          _id: '65f0d5de64b8a7f9ac5a0489',
          title: 'Ms.',
          first_name: 'Alice',
          last_name: 'Smith',
          cover_letter:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          skills: 'React, Redux, Node.js',
          area: 'Full Stack Development',
          education: "Bachelor's Degree in Information Technology",
          experience: '4 years of experience in web development',
          projects: 'Built an e-commerce platform from scratch',
          contact: 'alice.smith@example.com',
        },
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
    ],
    curretChatMessages: [],
  }),
  getters: {},
  actions: {
    async sendMessage(message: string) {
      try {
        this.currentChat = this.chats.find(
          (chat) => chat._id === this.currentChatId
        );
        const body = {
          chat_id: this.currentChatId,
          message: 'Yes im interested in be a PHP Fullstack developer',
          sender_id:
            'el auth user, lo obtienes del backend mediante el token auth',
          recipient: {
            name: `${this.currentChat.profile.first_name} ${this.currentChat.profile.last_name}`,
            _id: 'relleno', // lo obtienes en el backend, en el populate del perfil -> aplicant
          },
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
    async createChat(body: {}) {
      try {
        // crear el nuevo chat
        console.log('Creando nuevo chat...', body);
        // const URL = 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/';
        // const { data: chat } = await axios.post(URL, body);
        // // ingresar el chat a la lista de chats
        // this.chats.unshift(chat);
        // // setear el nuevo chat como el actual
        // this.curretChatMessages = chat.messages;
        // this.currentChatId = chat._id;
      } catch (error) {
        console.error(error);
      }
    },
    chatExists(profileId: string, jobId: string) {
      console.log('profile', profileId);
      console.log('jobId', jobId);

      const existingChat = this.chats.find(
        (chat) => chat.job._id === jobId && chat.profile._id === profileId
      );

      if (existingChat) {
        return {
          chat_id: existingChat._id,
          chat_exist: true,
        };
      } else {
        return {
          chat_id: '',
          chat_exist: false,
        };
      }
    },
  },
});
