import { defineStore } from 'pinia';
import axios from 'axios';
import { sortPremiunFirst } from '../helpers/sortPremiunFirst';
export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobList: [], // Cambio de nombre de la variable de estado
    jobListFiltered: [],
    showJobFilter: false,
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

        this.jobList = sortPremiunFirst(data);
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los trabajos');
      }
    },

    async searchJobs(queryParams: {}) {
      try {
        const baseUrl =
          process.env.NODE_ENV === 'production'
            ? 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/'
            : 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/';

        const params = new URLSearchParams();

        for (const param in queryParams) {
          params.append(param, queryParams[param]);
        }
        console.log(params.toString());

        // const { data } = await axios.get(baseUrl, {
        //   params,
        // });

        // this.jobList = sortPremiunFirst(data);
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los trabajos');
      }
    },
  },
});
