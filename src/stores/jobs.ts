import { defineStore } from 'pinia';
import axios from 'axios';
import { sortPremiunFirst } from '../helpers/sortPremiunFirst';
export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobList: [], // Cambio de nombre de la variable de estado
    jobListFiltered: [],
    showJobFilter: false,
  }),
  getters: {
    getShowJobFilter(): boolean {
      return this.showJobFilter;
    },
  },
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
        this.setShowJobFilter(true);

        const baseUrl =
          process.env.NODE_ENV === 'production'
            ? 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/'
            : 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/';

        const params = new URLSearchParams();

        // Recorremos el objeto de params, si el valor es distinto de false lo agregamos
        // Ya que esto indica si se marco o no en el checkbox del buscador
        for (const param in queryParams) {
          if (queryParams[param]) {
            if (param == 'premiun') {
              params.append(param, 'true');
            } else if (param == 'body') {
              params.append(param, queryParams[param]);
            }
          }
        }

        const { data } = await axios.get(baseUrl, { params });

        this.jobListFiltered = sortPremiunFirst(data);
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los trabajos filtrados');
      }
    },

    async postCreateJob(body: {}) {
      try {
        // TODO: remover luego y agregar el endpoint adecuado
        // const baseUrl =
        //   process.env.NODE_ENV === 'production'
        //     ? 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/'
        //     : 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/';

        // const { data } = await axios.post(baseUrl, body);

        console.log('trabajo creado correctamente', body);
      } catch (error) {
        console.error(error);
        throw new Error('Error al ocrear un nuevo trabajo');
      }
    },

    setShowJobFilter(newData: boolean) {
      this.showJobFilter = newData;
    },

    resetJobListFiltered() {
      this.jobListFiltered = [];
    },
  },
});
