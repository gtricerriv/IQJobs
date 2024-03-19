import { defineStore } from 'pinia';
import { useProfileStore } from './profile';
import axios from 'axios';

export const useUserStore = defineStore('counter', {
  state: () => ({
    userData: null, // Agregar un state para almacenar los datos del usuario
    currentRole: 'recruiter', // recruiter o applicant
    premiun: false, // TODO: pa despues
  }),

  getters: {
    getCurrentRole(): boolean {
      return this.currentRole === 'recruiter' ? true : false;
    },
  },

  actions: {
    async fetchUserData(userId: string) {
      try {
        // TODO: remover luego
        const response = await axios.get(
          `https://getuserbyauth0route-7mlffi3t2a-uc.a.run.app?id=${userId}`
        );
        this.userData = response.data; // Almacena los datos del usuario en el state userData

        // Accede al store de profile y actualiza los datos del usuario
        const profileStore = useProfileStore();
        profileStore.updateProfiles(response.data.user.profile);
      } catch (error) {
        console.error(error);
      }
    },
    setRole(role: boolean) {
      if (role) {
        this.currentRole = 'recruiter';
      } else {
        this.currentRole = 'applicant';
      }
    },
  },
});
