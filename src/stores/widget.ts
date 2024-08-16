import { defineStore } from 'pinia';
import { sortPremiunFirst } from '../helpers/sortPremiunFirst';

export const useWidgetStore = defineStore({
  id: 'widget',
  state: () => ({
    widgetData: {
      description: '',
      position: '',
      provider: '',
      title: '',
    },
    widgetAplicants: [], // Lista de candidatos aplicantes
    selectedApplicant: {}, // Información del candidato seleccionado
    showAplicantDialog: false, // Estado para mostrar el diálogo de candidato
    showRightSidebar: false, // Estado para mostrar la barra lateral derecha
    widgetProfiles: [], // Lista de perfiles asociados al widget
    showAdminProfiles: false, // Estado para mostrar los perfiles de administrador
    applicantDetails: {} // Información detallada de cada candidato
  }),
  getters: {
    getWidgetAplicants() {
      return sortPremiunFirst(this.widgetAplicants);
    },
    getSelectedAplicant() {
      return this.selectedApplicant;
    },
    getShowAplicantDialog() {
      return this.showAplicantDialog;
    },
    getApplicantDetails() {
      return this.applicantDetails;
    },
  },
  actions: {
    cleanWidgetData() {
      this.widgetData = {
        description: '',
        position: '',
        provider: '',
        title: '',
      };
      this.widgetAplicants = [];
      this.widgetProfiles = [];
      this.selectedApplicant = {};
      this.showAplicantDialog = false;
      this.setShowAdminProfiles(false);
    },
    setShowRightSidebar(newStatus: boolean) {
      this.showRightSidebar = newStatus;
    },
    setShowAdminProfiles(status: any) {
      this.showAdminProfiles = status;
    },
    updateWidgetData(newData: any) {
      this.showRightSidebar = true;
      this.widgetData = { ...this.widgetData, ...newData };
    },
    updateWidgetAplicants(newData: any) {
      this.showRightSidebar = true;
      this.widgetAplicants = newData;
    },
    setApplicantDetails(details: any) {
      this.selectedApplicant = details; // Actualizar los detalles del candidato
      this.applicantDetails = details; // Asegurarse de que los detalles también estén disponibles
      this.showAplicantDialog = true; // Mostrar el diálogo
    },
    setShowAplicantDialog(newData: boolean) {
      this.showAplicantDialog = newData;
    },
    showAdminProfiles(newData: []) {
      this.setShowRightSidebar(true);
      this.setShowAdminProfiles(true);
      this.widgetProfiles = newData;
    },
    fetchApplicants() {
      this.widgetAplicants = [
        {
          id: '1',
          first_name: 'Alice',
          last_name: 'Johnson',
          title: 'Frontend Developer',
          skills: 'JavaScript, React, CSS',
          premium: true,
          contact: 'alice.johnson@example.com',
          cover_letter: 'Passionate frontend developer...',
          area: 'Development',
          education: 'BS in Computer Science',
          experience: '5 years',
          projects: 'Various frontend projects',
        },
        {
          id: '2',
          first_name: 'Bob',
          last_name: 'Smith',
          title: 'Backend Developer',
          skills: 'Node.js, Express, MongoDB',
          premium: false,
          contact: 'bob.smith@example.com',
          cover_letter: 'Experienced backend developer...',
          area: 'Development',
          education: 'BS in Software Engineering',
          experience: '4 years',
          projects: 'Backend systems for e-commerce',
        },
        // Agregar más candidatos con información completa
      ];
    },
    addApplicant(applicant: any) {
      this.widgetAplicants.push(applicant);
    },
    updateApplicant(applicantId: string, updatedData: any) {
      const index = this.widgetAplicants.findIndex(app => app.id === applicantId);
      if (index !== -1) {
        this.widgetAplicants[index] = { ...this.widgetAplicants[index], ...updatedData };
      }
    },
    removeApplicant(applicantId: string) {
      this.widgetAplicants = this.widgetAplicants.filter(app => app.id !== applicantId);
    }
  },
});
