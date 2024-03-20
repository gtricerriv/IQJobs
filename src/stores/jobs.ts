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
            ? 'https://getjobswithuserroute-7mlffi3t2a-uc.a.run.app/'
            : 'https://getjobswithuserroute-7mlffi3t2a-uc.a.run.app/';
        const { data } = await axios.get(baseUrl, {
          params: { page, limit },
        });

        console.log('data', data);

        // TODO: revisar aca el sort

        console.log('antes del sort', data);

        this.jobList = data.sort(
          (a: any, b: any) => Number(b?.premiun) - Number(a?.premiun)
        );

        console.log('despues del sort', this.jobList);
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los trabajos');
      }
    },
  },
});
