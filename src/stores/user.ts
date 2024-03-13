import { defineStore } from 'pinia';
import { useProfileStore } from './profile'
import axios from 'axios';

export const useUserStore = defineStore('counter', {
  state: () => ({
    userData: null // Agregar un state para almacenar los datos del usuario
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2;
    }
  },

  actions: {
    async fetchUserData(userId:string) {
      try {
        const response = await axios.get(`https://getuserbyauth0route-7mlffi3t2a-uc.a.run.app?id=${userId}`);
        this.userData = response.data; // Almacena los datos del usuario en el state userData

        // Accede al store de profile y actualiza los datos del usuario
        const profileStore = useProfileStore();
        profileStore.updateProfiles(response.data.user.profile);
      } catch (error) {
        console.error(error);
      }
    },

    increment () {
      this.counter++;
    }
  }
});
