import { defineStore } from 'pinia';
import axios from 'axios';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    usersList: [],
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
