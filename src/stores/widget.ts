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
    widgetAplicants: [],
    selectedApplicant: {},
    showAplicantDialog: false,
    showRightSidebar: false,
    widgetProfiles: [],
    showAdminProfiles: false,
  }),
  getters: {
    getWidgetAplicants(): any {
      return sortPremiunFirst(this.widgetAplicants);
    },
    getSelectedAplicant(): any {
      return this.selectedApplicant;
    },
    getShowAplicantDialog(): boolean {
      return this.showAplicantDialog;
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
    setSelectedAplicant(newData: any) {
      this.selectedApplicant = newData;
      this.setShowAplicantDialog(true);
    },
    setShowAplicantDialog(newData: boolean) {
      this.showAplicantDialog = newData;
    },
    showAdminProfiles(newData: []) {
      this.setShowRightSidebar(true);
      this.setShowAdminProfiles(true);
      this.widgetProfiles = newData;
    },
  },
});
