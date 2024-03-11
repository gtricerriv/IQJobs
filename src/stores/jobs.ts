import { defineStore } from 'pinia';
import axios from 'axios';

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobList: [], // Cambio de nombre de la variable de estado
  }),

  actions: {
    async fetchJobList(page: any, limit: any) {
      // Cambio de nombre de la función de acción
      try {
        const baseUrl =
          process.env.NODE_ENV === 'production'
            ? 'https://getjobsroute-7mlffi3t2a-uc.a.run.app'
            : 'https://getjobsroute-7mlffi3t2a-uc.a.run.app';
        const response = await axios.get(baseUrl, {
          params: { page, limit },
        });
        this.jobList = response.data; // Actualización del nombre de la variable de estado
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los trabajos');
      }
    },
  },
});
