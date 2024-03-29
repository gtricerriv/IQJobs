import { defineStore } from 'pinia';
import axios from 'axios';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    usersList: [
      {
        _id: Date.now(),
        email: 'example@iqjobs1.com',
        profiles: [
          {
            _id: Date.now(),
            title: 'example',
            first_name: 'John',
            last_name: 'Doe',
            cover_letter: 'I am a programmer',
            skills: 'Java, Python',
            area: 'FrontEnd Developer',
            education: 'Bachelor Degree',
            experience: '5 years',
            projects: 'Project 1, Project 2',
            contact: '1234567890',
            isRecruiter: false,
            premium: false,
          },
          {
            _id: Date.now(),
            title: 'example',
            first_name: 'John',
            last_name: 'Doe',
            cover_letter: 'I am a backend programmer',
            skills: 'PHP, Node',
            area: 'Backend Developer',
            education: 'Bachelor Degree',
            experience: '1 years',
            projects: 'Project A, Project B',
            contact: '1234567890',
            isRecruiter: false,
            premium: false,
          },
        ],
      },
      {
        _id: Date.now() + 100,
        email: 'example@iqjobs2.com',
        profiles: [
          {
            _id: Date.now(),
            title: 'example',
            first_name: 'John2',
            last_name: 'Doe2',
            cover_letter: 'I am a programmer',
            skills: 'Java, Python',
            area: 'FrontEnd Developer',
            education: 'Bachelor Degree',
            experience: '5 years',
            projects: 'Project 1, Project 2',
            contact: '1234567890',
            isRecruiter: false,
            premium: false,
          },
          {
            _id: Date.now(),
            title: 'example',
            first_name: 'John2',
            last_name: 'Doe2',
            cover_letter: 'I am a backend programmer',
            skills: 'PHP, Node',
            area: 'Backend Developer',
            education: 'Bachelor Degree',
            experience: '1 years',
            projects: 'Project A, Project B',
            contact: '1234567890',
            isRecruiter: false,
            premium: false,
          },
        ],
      },
      {
        _id: Date.now() + 101,
        email: 'example@iqjobs3.com',
        profiles: [
          {
            _id: Date.now(),
            title: 'example',
            first_name: 'John3',
            last_name: 'Doe3',
            cover_letter: 'I am a programmer',
            skills: 'Java, Python',
            area: 'FrontEnd Developer',
            education: 'Bachelor Degree',
            experience: '5 years',
            projects: 'Project 1, Project 2',
            contact: '1234567890',
            isRecruiter: false,
            premium: false,
          },
          {
            _id: Date.now(),
            title: 'example',
            first_name: 'John3',
            last_name: 'Doe3',
            cover_letter: 'I am a backend programmer',
            skills: 'PHP, Node',
            area: 'Backend Developer',
            education: 'Bachelor Degree',
            experience: '1 years',
            projects: 'Project A, Project B',
            contact: '1234567890',
            isRecruiter: false,
            premium: false,
          },
        ],
      },
    ],
  }),

  getters: {},

  actions: {
    async fetchUsers() {
      try {
        // TODO: descomentar cuando se tenga el endpoint
        // const URL = ''
        // const { data } = await axios.get(URL);
        // this.usersList = data; // Almacena los datos del usuario en el state userData
      } catch (error) {
        console.error(error);
      }
    },
  },
});
