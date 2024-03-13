import { defineStore } from 'pinia';
import axios from 'axios';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profiles: [], // Variable de estado para almacenar la lista de perfiles
  }),

  actions: {
    async fetchProfiles() {
      try {
        const response = await axios.get('http://tu-servidor/api/profiles'); // Endpoint para obtener la lista de perfiles
        this.profiles = response.data; // Actualiza la lista de perfiles en el state
      } catch (error) {
        console.error(error);
      }
    },

    updateProfiles(newProfiles:any) {
      this.profiles = newProfiles; // Actualiza la lista de perfiles con el nuevo array
    }
  },

  getters: {
    getProfiles() {
      return this.profiles; // Getter para obtener el state 'profiles'
    }
  }
});
