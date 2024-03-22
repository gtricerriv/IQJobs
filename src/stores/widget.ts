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
    setShowRightSidebar(newStatus: boolean) {
      this.showRightSidebar = newStatus;
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
  },
});
