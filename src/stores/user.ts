import { defineStore } from 'pinia';
import { useProfileStore } from './profile';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: null, // Almacena los datos del usuario
    currentRole: 'recruiter', // recruiter o applicant
    premium: false, // TODO: pa despues
    currentProfile: {},
    isAdmin: false,
  }),

  getters: {
    getCurrentRole(): boolean {
      return this.currentRole === 'recruiter' ? true : false;
    },

    getCurrentProfile(): object {
      return this.currentProfile;
    },
  },

  actions: {
    isAdminEmail(email: string) {
      const pattern = /@iqjobs.com$/;
      return pattern.test(email);
    },

    fetchUserData(userId: string) {
      // Simula una consulta a la API con datos de ejemplo
      const mockUserData = {
          nickname: 'Giancarlo',
          email: 'giancarlo.tricerri@example.com',
          profile: {
            name: 'Giancarlo Tricerri',
            profession: 'Desarrollador de Software, Diseño Gráfico y Análisis de Datos',
            bio: 'Giancarlo Tricerri es un experto en desarrollo de software con experiencia en diseño gráfico y análisis de datos. Su trabajo abarca una amplia gama de habilidades técnicas y creativas.',
            skills: ['Desarrollo de Software', 'Diseño Gráfico', 'Análisis de Datos'],
            experience: [
              {
                title: 'Desarrollador de Software',
                company: 'Tech Solutions',
                duration: '3 años',
              },
              {
                title: 'Diseñador Gráfico',
                company: 'Creative Agency',
                duration: '2 años',
              },
              {
                title: 'Analista de Datos',
                company: 'Data Insights',
                duration: '1 año',
              },
            ],
          },
      };

      this.userData = mockUserData; // Almacena los datos del usuario en el state userData

      // Accede al store de profile y actualiza los datos del usuario
      const profileStore = useProfileStore();
      profileStore.updateProfiles(mockUserData.profile);

      // Verificamos si es admin
      this.isAdmin = this.isAdminEmail(mockUserData.email);
    },

    setRole(role: boolean) {
      this.currentRole = role ? 'recruiter' : 'applicant';
    },

    setCurrentProfile(profile: object) {
      this.currentProfile = profile;
    },

    isCurrentProfileSelected() {
      return Object.keys(this.currentProfile).length > 0;
    },

    postCreateProfile(body: {}) {
      // Simula una operación de creación de perfil
      console.log('Perfil creado correctamente', body);
    },

    setExampleProfile() {
      this.currentProfile = {
        name: 'Giancarlo Tricerri',
        profession: 'Desarrollador de Software, Diseño Gráfico y Análisis de Datos',
        email: 'giancarlo.tricerri@example.com',
        bio: 'Giancarlo Tricerri es un experto en desarrollo de software con experiencia en diseño gráfico y análisis de datos. Su trabajo abarca una amplia gama de habilidades técnicas y creativas.',
        skills: ['Desarrollo de Software', 'Diseño Gráfico', 'Análisis de Datos'],
        experience: [
          {
            title: 'Desarrollador de Software',
            company: 'Tech Solutions',
            duration: '3 años',
          },
          {
            title: 'Diseñador Gráfico',
            company: 'Creative Agency',
            duration: '2 años',
          },
          {
            title: 'Analista de Datos',
            company: 'Data Insights',
            duration: '1 año',
          },
        ],
      };
    },
  },
});
 