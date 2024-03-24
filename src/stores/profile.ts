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

    async postCreateProfile(body: {}) {
      try {
        // TODO: remover luego y agregar el endpoint adecuado
        // const baseUrl =
        //   process.env.NODE_ENV === 'production'
        //     ? 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/'
        //     : 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/';

        // const { data } = await axios.post(baseUrl, body);

        await axios.get('https://getjobsroute-7mlffi3t2a-uc.a.run.app/');

        console.log('Perfil creado correctamente', body);
      } catch (error) {
        console.error(error);
        throw new Error('Error al ocrear un nuevo trabajo');
      }
    },

    updateProfiles(newProfiles: any) {
      this.profiles = newProfiles; // Actualiza la lista de perfiles con el nuevo array
    },
  },

  getters: {
    // getProfiles() {
    //   return this.profiles || null; // Getter para obtener el state 'profiles'
    // },
  },
});
