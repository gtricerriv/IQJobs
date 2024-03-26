import { defineStore } from 'pinia';
import axios from 'axios';
import { sortPremiunFirst } from '../helpers/sortPremiunFirst';
export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobList: [], // Cambio de nombre de la variable de estado
    jobListFiltered: [],
    newJobs: [],
    notifications: [],
    notificationsDummy: [
      {
        _id: Date.now(),
        title: 'Desarrollador PYTHON',
        type: 'job',
      },
      {
        _id: Date.now(),
        title: 'Desarrollador JAVA',
        type: 'job',
      },
      {
        _id: Date.now(),
        title: 'New message from:  Desarrollador JAVA',
        type: 'chat',
      },
    ],
    allJobs: [],
    showJobFilter: false,
    hasNotifications: false,
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
          if (queryParams[param] == true) {
            if (param == 'premiun') {
              params.append(param, 'true');
            } else {
              params.append(param, queryParams['body']);
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
    async getAllJobs() {
      try {
        console.log('obteniendo todos los trabajos');

        const baseUrl =
          process.env.NODE_ENV === 'production'
            ? 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/'
            : 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/';

        const { data } = await axios.get(baseUrl, {
          params: { page: 1, limit: 999 },
        });

        this.allJobs = data;
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
        throw new Error('Error al crear un nuevo trabajo');
      }
    },
    async postCreateJobFromCsvData(body: {}) {
      try {
        // TODO: remover luego y agregar el endpoint adecuado
        // const baseUrl =
        //   process.env.NODE_ENV === 'production'
        //     ? 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/'
        //     : 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/';

        // const { data } = await axios.post(baseUrl, body);

        console.log('trabajo creado correctamente con csv', body);
      } catch (error) {
        console.error(error);
        throw new Error('Error al crear un nuevo trabajo con csv');
      }
    },
    setShowJobFilter(newData: boolean) {
      this.showJobFilter = newData;
    },
    resetJobListFiltered() {
      this.jobListFiltered = [];
    },
    checkHasNotifications() {
      setInterval(async () => {
        try {
          // Si no hay trabajos, no hay notificaciones
          if (this.allJobs.length == 0) {
            this.hasNotifications = false;
            return;
          }

          const baseUrl =
            process.env.NODE_ENV === 'production'
              ? 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/'
              : 'https://getjobsroute-7mlffi3t2a-uc.a.run.app/';

          const { data } = await axios.get(baseUrl, {
            params: { page: 1, limit: 9999 },
          });

          if (data.length > this.allJobs.length) {
            this.hasNotifications = true;

            const newJobs = data.filter((job: any) => {
              return !this.allJobs.some((oldJob: any) => oldJob._id == job._id);
            });

            newJobs.map((job: any) => {
              const notification = {
                _id: Date.now(),
                title: job.title,
                type: 'job',
              };
              this.notifications = [notification, ...this.notifications];
            });
          }
        } catch (error) {
          console.error(error);
          throw new Error('Error al obtener los trabajos');
        }
      }, 1000 * 60 * 5); // 5 minutos
    },
  },
});
