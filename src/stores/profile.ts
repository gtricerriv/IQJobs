import { defineStore } from 'pinia';
import axios from 'axios';

// Definir un tipo para los perfiles si estás usando TypeScript
interface Profile {
  title: string;
  first_name: string;
  last_name: string;
  cover_letter: string;
  skills: string;
  area: string;
  education: string;
  experience: string;
  projects: string;
  contact: string;
  isRecruiter: boolean;
  premium: boolean;
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profiles: [] as Profile[], // Inicializa profiles como un array de Profile
  }),

  actions: {
    // Simula la obtención de perfiles de una API
    fetchProfiles() {
      // Datos de ejemplo para perfiles
      const mockProfiles: Profile[] = [
        {
          title: 'Desarrollador Frontend',
          first_name: 'Giancarlo',
          last_name: 'Tricerri',
          cover_letter: 'Apasionado por el desarrollo web con experiencia en React y diseño gráfico.',
          skills: 'JavaScript, React, CSS, HTML',
          area: 'Tecnología',
          education: 'Licenciatura en Informática',
          experience: '3 años en desarrollo frontend',
          projects: 'Desarrollo de aplicaciones web para startups',
          contact: 'giancarlo.tricerri@example.com',
          isRecruiter: false,
          premium: false,
        },
        {
          title: 'Diseñador Gráfico',
          first_name: 'Ana',
          last_name: 'Méndez',
          cover_letter: 'Creativa con un enfoque en diseño gráfico y UX/UI.',
          skills: 'Photoshop, Illustrator, Diseño UX/UI',
          area: 'Diseño',
          education: 'Licenciatura en Diseño Gráfico',
          experience: '5 años en diseño gráfico',
          projects: 'Creación de identidad visual para empresas',
          contact: 'ana.mendez@example.com',
          isRecruiter: false,
          premium: true,
        },
        {
          title: 'Analista de Datos',
          first_name: 'Giancarlo',
          last_name: 'Tricerri',
          cover_letter: 'Creativa con un enfoque en diseño gráfico y UX/UI.',
          skills: 'Photoshop, Illustrator, Diseño UX/UI',
          area: 'data analyst',
          education: 'Licenciatura en Diseño Gráfico',
          experience: '5 años en diseño gráfico',
          projects: 'Creación de identidad visual para empresas',
          contact: 'ana.mendez@example.com',
          isRecruiter: false,
          premium: true,
        },
      ];

      this.profiles = mockProfiles; // Actualiza la lista de perfiles en el state
    },

    postCreateProfile(body: Profile) {
      try {
        // Simula la creación de un nuevo perfil
        console.log('Perfil creado correctamente', body);

        // Añade el nuevo perfil a la lista de perfiles
        //this.profiles.push(body);
        return this.profiles;
      } catch (error) {
        console.error(error);
        throw new Error('Error al crear un nuevo perfil');
      }
    },

    updateProfiles(newProfiles: Profile[]) {
      this.profiles = newProfiles; // Actualiza la lista de perfiles con el nuevo array
    },
  },

  getters: {
    // Obtiene todos los perfiles
    getProfiles(): Profile[] {
      return this.profiles || [];
    },
  },
});
